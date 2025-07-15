import { useContext } from 'react'
import { ConfigContext } from './contexts/ConfigContext'
import { getActiveKeyboardConfigFromJson, getActiveSenarioJson, KeyMapItem } from './Config'
import { parseKeyMapItemFromString } from './utils/parsingUtils'
import { findKeybindingsContainingKey } from './utils/keybindingUtils'
import { 
    genHighlightLevelMap, 
    getHighlightLevel, 
    genMultipleHighlightLevelMap, 
    getMultipleHighlightLevels,
    genKeyFilterHighlightLevelMap 
} from './KeyboardStyleCalculation'
import Key from './components/Key'


export default function Keyboard(): JSX.Element {
    const { 
        config, 
        highlightedItem, 
        highlightedItems, 
        multiSelectMode,
        keyClickMode,
        clickedKey,
        activeScenarioName,
        editMode
    } = useContext(ConfigContext)

    // Get filtered keybindings when in key click mode
    const getFilteredKeybindings = () => {
        if (!keyClickMode || !clickedKey) return [];
        
        const scenario = getActiveSenarioJson([config], config.name, activeScenarioName);
        const allKeybindings = scenario.keymapItems.map(item => {
            try {
                return parseKeyMapItemFromString(item);
            } catch {
                return null;
            }
        }).filter(Boolean) as KeyMapItem[];
        
        return findKeybindingsContainingKey(allKeybindings, clickedKey);
    };

    const filteredKeybindings = getFilteredKeybindings();

    // Determine which highlighting mode to use (priority order: key filter > multi-select > single select)
    const highlightLevelMap = (() => {
        // Key filter mode has highest priority
        if (keyClickMode && clickedKey && filteredKeybindings.length > 0) {
            return genKeyFilterHighlightLevelMap(filteredKeybindings);
        } 
        // Multi-select mode has second priority
        else if (multiSelectMode && highlightedItems.length > 0) {
            return genMultipleHighlightLevelMap(highlightedItems);
        } 
        // Single select mode is default
        else {
            return genHighlightLevelMap(highlightedItem);
        }
    })();

    const isKeyFilterMode = keyClickMode && clickedKey && filteredKeybindings.length > 0;
    const isMultiSelectMode = !isKeyFilterMode && multiSelectMode && highlightedItems.length > 0;

    return (
        <div className={`flex-col relative ${keyClickMode ? 'keyboard-click-mode' : ''} ${editMode ? 'keyboard-edit-mode' : ''}`}>
            {keyClickMode && (
                <div className={`absolute -top-6 left-0 right-0 rounded px-3 py-1 text-sm text-center z-10 ${
                    isKeyFilterMode 
                        ? 'bg-emerald-100 border border-emerald-300 text-emerald-700' 
                        : 'bg-green-100 border border-green-300 text-green-700'
                }`}>
                    {isKeyFilterMode 
                        ? `🎯 Filtering by '${clickedKey}' - ${filteredKeybindings.length} keybindings found`
                        : '🖱️ Key Click Mode: Click any key to filter keybindings'
                    }
                </div>
            )}
            {editMode && (
                <div className="absolute -top-6 left-0 right-0 rounded px-3 py-1 text-sm text-center z-10 bg-orange-100 border border-orange-300 text-orange-700">
                    ✏️ Edit Mode: Click any key to add a new keybinding
                </div>
            )}
            {getActiveKeyboardConfigFromJson(
                [config],
                config.name
            ).keyboardLayout.layout.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex my-1 w-full">
                    {row.map((keyData, keyIndex) => (
                        <Key
                            key={`key-${keyIndex}`}
                            keyData={keyData}
                            highlightLevel={!isKeyFilterMode && !isMultiSelectMode
                                ? getHighlightLevel(
                                    highlightLevelMap as Map<string, number>,
                                    keyData.keycode
                                )
                                : 0
                            }
                            highlightLevels={isKeyFilterMode || isMultiSelectMode
                                ? getMultipleHighlightLevels(
                                    highlightLevelMap as Map<string, number[]>,
                                    keyData.keycode
                                )
                                : []
                            }
                            isKeyFilterMode={isKeyFilterMode}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
