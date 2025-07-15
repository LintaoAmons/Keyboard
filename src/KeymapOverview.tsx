import { useContext, useState, useEffect, useMemo } from 'react'
import { TERipple } from 'tw-elements-react'
import { Edit, Trash2 } from 'lucide-react'
import { ConfigContext } from './contexts/ConfigContext'
import {
    getActiveSenarioJson,
    KeyMapItem,
} from './Config'
import { filterKeymapItems } from './KeymapItemsFilter'
import { findKeybindingsContainingKey, getKeyDescription } from './utils/keybindingUtils'
import KeybindingEditor from './components/KeybindingEditor'

export default function KeymapOverview(): JSX.Element {
    const {
        config,
        activeScenarioName,
        setHighlightedItem,
        highlightedItems,
        setHighlightedItems,
        multiSelectMode,
        setMultiSelectMode,
        clickedKey,
        setClickedKey,
        keyClickMode,
        setKeyClickMode,
        editMode,
        setEditMode,
        addKeybinding,
        updateKeybinding,
        deleteKeybinding,
        keyClickNewKeybinding,
        setKeyClickNewKeybinding,
    } = useContext(ConfigContext)
    const [filterContent, setFilterContent] = useState('')
    const [keyFilteredItems, setKeyFilteredItems] = useState<KeyMapItem[]>([])
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [showAddDialog, setShowAddDialog] = useState(false)

    const handleClick = (item: KeyMapItem, event: React.MouseEvent) => {
        if (editMode) {
            // In edit mode, don't change highlighting
            return;
        }
        
        if (multiSelectMode) {
            // In multi-select mode, toggle the item
            if (event.ctrlKey || event.metaKey) {
                // Ctrl/Cmd + click: add/remove from selection
                const isSelected = highlightedItems.some(existingItem => 
                    JSON.stringify(existingItem) === JSON.stringify(item)
                );
                
                if (isSelected) {
                    setHighlightedItems(prev => 
                        prev.filter(existingItem => 
                            JSON.stringify(existingItem) !== JSON.stringify(item)
                        )
                    );
                } else {
                    setHighlightedItems(prev => [...prev, item]);
                }
            } else {
                // Regular click in multi-select mode: replace selection
                setHighlightedItems([item]);
            }
        } else {
            // Single select mode
            setHighlightedItem(() => item)
        }
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterContent(() => e.target.value)
    }

    // Get base keymap items - memoized to prevent infinite re-renders
    const baseKeymapItems = useMemo(() => {
        return filterKeymapItems(
            getActiveSenarioJson(
                [config],
                config.name,
                activeScenarioName
            ),
            filterContent
        )
    }, [config, activeScenarioName, filterContent])

    // Effect to filter by clicked key
    useEffect(() => {
        if (clickedKey && keyClickMode) {
            const filteredByKey = findKeybindingsContainingKey(baseKeymapItems, clickedKey);
            setKeyFilteredItems(filteredByKey);
        } else {
            setKeyFilteredItems([]);
        }
    }, [clickedKey, keyClickMode, baseKeymapItems]);

    // Determine which items to display
    const keymapItems = keyClickMode && clickedKey ? keyFilteredItems : baseKeymapItems;

    const toggleMultiSelectMode = () => {
        setMultiSelectMode(!multiSelectMode);
        if (multiSelectMode) {
            // Switching to single select mode, clear multiple selections
            setHighlightedItems([]);
        }
    };

    const toggleKeyClickMode = () => {
        setKeyClickMode(!keyClickMode);
        if (keyClickMode) {
            // Switching off key click mode, clear clicked key
            setClickedKey(null);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            // Switching off edit mode, clear any editing states
            setEditingIndex(null);
            setShowAddDialog(false);
            setKeyClickNewKeybinding(null);
        } else {
            // Switching on edit mode, clear highlights and selections
            setHighlightedItems([]);
            // Reset to the first item instead of creating a new empty object
            if (keymapItems.length > 0) {
                setHighlightedItem(keymapItems[0]);
            }
            setMultiSelectMode(false);
            setKeyClickMode(false);
            setClickedKey(null);
        }
    };

    const clearAllSelections = () => {
        setHighlightedItems([]);
    };

    const clearKeyFilter = () => {
        setClickedKey(null);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
    };

    const handleSaveEdit = (newKeybinding: string) => {
        if (editingIndex !== null) {
            updateKeybinding(editingIndex, newKeybinding);
        }
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
    };

    const handleDelete = (index: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this keybinding?');
        if (confirmed) {
            deleteKeybinding(index);
        }
    };

    const handleAddNew = () => {
        setShowAddDialog(true);
    };

    const handleSaveNew = (newKeybinding: string) => {
        addKeybinding(newKeybinding);
        setShowAddDialog(false);
    };

    const handleCancelNew = () => {
        setShowAddDialog(false);
    };

    const handleSaveKeyClick = (newKeybinding: string) => {
        addKeybinding(newKeybinding);
        setKeyClickNewKeybinding(null);
    };

    const handleCancelKeyClick = () => {
        setKeyClickNewKeybinding(null);
    };

    // Get the original keybinding string for editing
    const getOriginalKeybindingString = (index: number): string => {
        const scenario = getActiveSenarioJson([config], config.name, activeScenarioName);
        return scenario.keymapItems[index] || '';
    };

    const isItemSelected = (item: KeyMapItem): boolean => {
        if (multiSelectMode) {
            return highlightedItems.some(existingItem => 
                JSON.stringify(existingItem) === JSON.stringify(item)
            );
        }
        return false;
    };

    return (
        <div className="flex flex-col w-full max-w-full px-20">
            <div className="mb-4 flex items-center mt-6">
                <label
                    className="block text-gray-700 text-sm font-bold ml-6 mr-3"
                    htmlFor="filter"
                >
                    FuzzyFinder:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleFilterChange}
                    id="filter"
                    value={filterContent}
                    type="text"
                />
            </div>
            <div className="mb-4 space-y-3 ml-6 mr-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleMultiSelectMode}
                            disabled={editMode}
                            className={`px-4 py-2 rounded border transition-colors duration-200 ${
                                multiSelectMode 
                                    ? 'bg-blue-500 text-white border-blue-500' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            } ${editMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {multiSelectMode ? 'Multi-Select ON' : 'Multi-Select OFF'}
                        </button>
                        <button
                            onClick={toggleKeyClickMode}
                            disabled={editMode}
                            className={`px-4 py-2 rounded border transition-colors duration-200 ${
                                keyClickMode 
                                    ? 'bg-green-500 text-white border-green-500' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            } ${editMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {keyClickMode ? 'Key Click ON' : 'Key Click OFF'}
                        </button>
                        <button
                            onClick={toggleEditMode}
                            className={`px-4 py-2 rounded border transition-colors duration-200 ${
                                editMode 
                                    ? 'bg-orange-500 text-white border-orange-500' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {editMode ? 'Edit ON' : 'Edit OFF'}
                        </button>
                        {!editMode && multiSelectMode && (
                            <button
                                onClick={clearAllSelections}
                                className="px-4 py-2 rounded border border-red-300 text-red-700 hover:bg-red-50 transition-colors duration-200"
                            >
                                Clear All ({highlightedItems.length})
                            </button>
                        )}
                        {!editMode && keyClickMode && clickedKey && (
                            <button
                                onClick={clearKeyFilter}
                                className="px-4 py-2 rounded border border-orange-300 text-orange-700 hover:bg-orange-50 transition-colors duration-200"
                            >
                                Clear Key Filter
                            </button>
                        )}
                        {editMode && (
                            <button
                                onClick={handleAddNew}
                                className="px-4 py-2 rounded border border-green-300 text-green-700 bg-white hover:bg-green-50 transition-colors duration-200"
                            >
                                ➕ Add New Keybinding
                            </button>
                        )}
                    </div>
                    {!editMode && multiSelectMode && (
                        <div className="text-sm text-gray-600">
                            {highlightedItems.length} item(s) selected. Use Ctrl/Cmd + Click to toggle selection.
                        </div>
                    )}
                    {editMode && (
                        <div className="text-sm text-orange-600">
                            📝 Edit Mode: Click Edit to modify keybindings
                        </div>
                    )}
                </div>
                {!editMode && keyClickMode && (
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                            {clickedKey 
                                ? `Showing keybindings containing '${getKeyDescription(clickedKey)}' (${keymapItems.length} found)` 
                                : 'Click on any key in the keyboard to filter keybindings'
                            }
                        </div>
                    </div>
                )}
            </div>
            <div className="table-scroll overflow-x-auto">
            <div className="w-full">
            <table className="w-full table-fixed text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th scope="col" className={`px-6 py-4 ${editMode ? 'w-1/5' : 'w-1/4'}`}>
                            Keybinding
                        </th>
                        <th scope="col" className={`px-6 py-4 ${editMode ? 'w-2/5' : 'w-1/2'}`}>
                            Description
                        </th>
                        <th scope="col" className={`px-6 py-4 ${editMode ? 'w-1/6' : 'w-1/6'}`}>
                            Conditions
                        </th>
                        <th scope="col" className={`px-6 py-4 ${editMode ? 'w-1/6' : 'w-1/4'}`}>
                            AchieveBy
                        </th>
                        {editMode && (
                            <th scope="col" className="px-6 py-4 w-1/12">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {keymapItems.map((item, index) => (
                        <tr
                            key={index}
                            onClick={(e) => handleClick(item, e)}
                            className={`border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer ${
                                isItemSelected(item) ? 'bg-blue-100 dark:bg-blue-900' : ''
                            }`}
                        >
                            <td className={`px-6 py-4 font-medium ${editMode ? 'w-1/5' : 'w-1/4'}`}>
                                <div className="flex flex-wrap gap-1">
                                    {item.keybinding
                                        ? item.keybinding.map((key, index) => (
                                              <span
                                                  className="bg-gray-100 px-2 py-1 rounded border border-gray-600 text-black text-xs"
                                                  key={index}
                                              >
                                                  {key.keycode +
                                                      (key.modifiers &&
                                                      key.modifiers.length > 0
                                                          ? ' | ' +
                                                            key.modifiers.join(', ')
                                                          : '')}
                                              </span>
                                          ))
                                        : ''}
                                </div>
                            </td>
                            <td className={`px-6 py-4 break-words ${editMode ? 'w-2/5' : 'w-1/2'}`}>
                                {item.description}
                            </td>
                            <td className={`px-6 py-4 ${editMode ? 'w-1/6' : 'w-1/6'}`}>
                                <div className="flex flex-col gap-1">
                                    {item.conditions
                                        ? item.conditions
                                              .filter((it) => it !== '')
                                              .map((condi, index) => (
                                                  <span
                                                      className="bg-gray-100 px-2 py-1 rounded border border-gray-600 text-black text-xs break-words"
                                                      key={index}
                                                  >
                                                      {condi}
                                                  </span>
                                              ))
                                        : ''}
                                </div>
                            </td>
                            <td className={`px-6 py-4 break-words ${editMode ? 'w-1/6' : 'w-1/4'}`}>
                                {item.achieveBy}
                            </td>
                            {editMode && (
                                <td className="border-x-2 text-center w-1/12">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            type="button"
                                            className="inline-block rounded border-2 border-blue-500 px-2 py-1 text-xs font-medium text-blue-500 transition duration-150 ease-in-out hover:bg-blue-500 hover:text-white"
                                            onClick={() => handleEdit(index)}
                                            title="Edit keybinding"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-block rounded border-2 border-red-500 px-2 py-1 text-xs font-medium text-red-500 transition duration-150 ease-in-out hover:bg-red-500 hover:text-white"
                                            onClick={() => handleDelete(index)}
                                            title="Delete keybinding"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            
            {editingIndex !== null && (
                <KeybindingEditor
                    itemIndex={editingIndex}
                    keybindingString={getOriginalKeybindingString(editingIndex)}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
            
            {showAddDialog && (
                <KeybindingEditor
                    itemIndex={-1}
                    keybindingString=""
                    onSave={handleSaveNew}
                    onCancel={handleCancelNew}
                />
            )}
            
            {keyClickNewKeybinding && (
                <KeybindingEditor
                    itemIndex={-1}
                    keybindingString={keyClickNewKeybinding}
                    onSave={handleSaveKeyClick}
                    onCancel={handleCancelKeyClick}
                />
            )}
        </div>
    )
}
