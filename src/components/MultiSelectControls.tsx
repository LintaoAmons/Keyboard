import React, { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { getActiveSenarioJson, KeyMapItem } from '../Config';
import { parseKeyMapItemFromString } from '../utils/parsingUtils';

const MultiSelectControls: React.FC = () => {
    const { 
        config,
        activeScenarioName,
        multiSelectMode, 
        setMultiSelectMode, 
        highlightedItems, 
        setHighlightedItems 
    } = useContext(ConfigContext);

    const toggleMultiSelectMode = () => {
        setMultiSelectMode(!multiSelectMode);
        if (multiSelectMode) {
            // Switching to single select mode, clear multiple selections
            setHighlightedItems([]);
        }
    };

    const clearAllSelections = () => {
        setHighlightedItems([]);
    };

    const selectAllKeybindings = () => {
        if (!multiSelectMode) return;
        
        const scenario = getActiveSenarioJson([config], config.name, activeScenarioName);
        const allItems = scenario.keymapItems
            .map(item => {
                try {
                    return parseKeyMapItemFromString(item);
                } catch {
                    return null;
                }
            })
            .filter(item => item !== null) as KeyMapItem[];
        
        setHighlightedItems(allItems);
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <button
                onClick={toggleMultiSelectMode}
                className={`px-3 py-1 rounded text-sm border transition-all duration-200 shadow-md hover:shadow-lg ${
                    multiSelectMode 
                        ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                title={multiSelectMode ? 'Disable multi-select mode' : 'Enable multi-select mode'}
            >
                {multiSelectMode ? 'Multi ON' : 'Multi OFF'}
            </button>
            
            {multiSelectMode && (
                <div className="flex items-center gap-2">
                    {highlightedItems.length > 0 ? (
                        <>
                            <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded border border-gray-300 shadow-sm">
                                {highlightedItems.length} selected
                            </span>
                            <button
                                onClick={clearAllSelections}
                                className="px-3 py-1 rounded text-sm border border-red-300 text-red-700 bg-white hover:bg-red-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                                title="Clear all selections"
                            >
                                Clear
                            </button>
                            {highlightedItems.length < getActiveSenarioJson([config], config.name, activeScenarioName).keymapItems.length && (
                                <button
                                    onClick={selectAllKeybindings}
                                    className="px-3 py-1 rounded text-sm border border-green-300 text-green-700 bg-white hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                                    title="Select all keybindings"
                                >
                                    All
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={selectAllKeybindings}
                            className="px-3 py-1 rounded text-sm border border-green-300 text-green-700 bg-white hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="Select all keybindings"
                        >
                            All
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelectControls;