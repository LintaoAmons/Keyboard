import React, { useState, useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { keyMapItemToString, parseKeyMapItemFromString } from '../utils/parsingUtils';
import { Modifier } from '../Config';

interface KeybindingEditorProps {
    itemIndex: number;
    keybindingString: string;
    onSave: (newKeybinding: string) => void;
    onCancel: () => void;
}

type InputMode = 'raw' | 'builder';

const KeybindingEditor: React.FC<KeybindingEditorProps> = ({ 
    itemIndex, 
    keybindingString, 
    onSave, 
    onCancel 
}) => {
    const [editValue, setEditValue] = useState(keybindingString);
    const [isValid, setIsValid] = useState(true);
    const [previewItem, setPreviewItem] = useState(parseKeyMapItemFromString(keybindingString));
    const [inputMode, setInputMode] = useState<InputMode>('builder');
    
    // Builder mode state
    const [builderKeys, setBuilderKeys] = useState<string[]>(['']);
    const [builderModifiers, setBuilderModifiers] = useState<Modifier[][]>([[]]);
    const [builderDescription, setBuilderDescription] = useState('');
    const [builderConditions, setBuilderConditions] = useState('');
    const [builderAchieveBy, setBuilderAchieveBy] = useState('');

    // Initialize builder state from keybinding string
    React.useEffect(() => {
        if (keybindingString) {
            try {
                const parsed = parseKeyMapItemFromString(keybindingString);
                setBuilderKeys(parsed.keybinding.map(kb => kb.keycode));
                setBuilderModifiers(parsed.keybinding.map(kb => kb.modifiers || []));
                setBuilderDescription(parsed.description || '');
                setBuilderConditions(parsed.conditions ? parsed.conditions.join(', ') : '');
                setBuilderAchieveBy(parsed.achieveBy || '');
            } catch (error) {
                // Keep default empty state if parsing fails
            }
        }
    }, [keybindingString]);

    const handleChange = (value: string) => {
        setEditValue(value);
        
        try {
            const parsedItem = parseKeyMapItemFromString(value);
            setPreviewItem(parsedItem);
            setIsValid(true);
        } catch (error) {
            setIsValid(false);
        }
    };

    const buildKeybindingString = () => {
        let keyString = '';
        
        for (let i = 0; i < builderKeys.length; i++) {
            const key = builderKeys[i];
            const modifiers = builderModifiers[i] || [];
            
            if (!key) continue;
            
            if (i > 0) keyString += ',';
            
            if (modifiers.length > 0) {
                const modifierStr = modifiers.map(m => {
                    switch (m) {
                        case Modifier.CTRL: return 'C';
                        case Modifier.CMD: return 'M';
                        case Modifier.SHIFT: return 'S';
                        case Modifier.ALT: return 'A';
                        case Modifier.HYPER: return 'H';
                        case Modifier.TAB: return 'T';
                        default: return m;
                    }
                }).join('-');
                keyString += `<${modifierStr}-${key}>`;
            } else {
                keyString += key;
            }
        }
        
        let fullString = keyString;
        if (builderDescription) {
            fullString += `|${builderDescription}`;
        }
        if (builderConditions) {
            fullString += `|${builderConditions}`;
        }
        if (builderAchieveBy) {
            fullString += `|${builderAchieveBy}`;
        }
        
        return fullString;
    };

    const updateBuilderPreview = () => {
        const builtString = buildKeybindingString();
        try {
            const parsedItem = parseKeyMapItemFromString(builtString);
            setPreviewItem(parsedItem);
            setIsValid(true);
        } catch (error) {
            setIsValid(false);
        }
    };

    React.useEffect(() => {
        if (inputMode === 'builder') {
            updateBuilderPreview();
        }
    }, [builderKeys, builderModifiers, builderDescription, builderConditions, builderAchieveBy, inputMode]);

    const switchToBuilder = () => {
        setInputMode('builder');
        updateBuilderPreview();
    };

    const switchToRaw = () => {
        setInputMode('raw');
        const builtString = buildKeybindingString();
        setEditValue(builtString);
        handleChange(builtString);
    };

    const addKeySequence = () => {
        setBuilderKeys([...builderKeys, '']);
        setBuilderModifiers([...builderModifiers, []]);
    };

    const removeKeySequence = (index: number) => {
        if (builderKeys.length > 1) {
            setBuilderKeys(builderKeys.filter((_, i) => i !== index));
            setBuilderModifiers(builderModifiers.filter((_, i) => i !== index));
        }
    };

    const updateBuilderKey = (index: number, key: string) => {
        const newKeys = [...builderKeys];
        newKeys[index] = key;
        setBuilderKeys(newKeys);
    };

    const updateBuilderModifier = (index: number, modifier: Modifier, checked: boolean) => {
        const newModifiers = [...builderModifiers];
        if (checked) {
            newModifiers[index] = [...(newModifiers[index] || []), modifier];
        } else {
            newModifiers[index] = (newModifiers[index] || []).filter(m => m !== modifier);
        }
        setBuilderModifiers(newModifiers);
    };

    const handleSave = () => {
        const valueToSave = inputMode === 'raw' ? editValue : buildKeybindingString();
        if (isValid && valueToSave.trim()) {
            onSave(valueToSave);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onCancel();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Edit Keybinding</h3>
                
                {/* Mode Toggle */}
                <div className="mb-4">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={switchToRaw}
                            className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                                inputMode === 'raw'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Raw String
                        </button>
                        <button
                            onClick={switchToBuilder}
                            className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                                inputMode === 'builder'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Builder
                        </button>
                    </div>
                </div>
                
                <div className="space-y-4">
                    {/* Raw String Mode */}
                    {inputMode === 'raw' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Keybinding String
                            </label>
                            <textarea
                                value={editValue}
                                onChange={(e) => handleChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                                    isValid ? 'border-gray-300' : 'border-red-300 bg-red-50'
                                }`}
                                rows={3}
                                placeholder="e.g., <C-f>|Find text|normal-mode|vim"
                            />
                            {!isValid && (
                                <p className="mt-1 text-sm text-red-600">
                                    Invalid keybinding format. Please check the syntax.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Builder Mode */}
                    {inputMode === 'builder' && (
                        <div className="space-y-4">
                            {/* Key Sequences */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Key Sequences
                                    </label>
                                    <button
                                        onClick={addKeySequence}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        + Add Key
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {builderKeys.map((key, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={key}
                                                    onChange={(e) => updateBuilderKey(index, e.target.value)}
                                                    placeholder="Key (e.g., f, Enter, space)"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                />
                                            </div>
                                            <div className="flex gap-1">
                                                {Object.values(Modifier).map((modifier) => (
                                                    <label key={modifier} className="flex items-center text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={(builderModifiers[index] || []).includes(modifier)}
                                                            onChange={(e) => updateBuilderModifier(index, modifier, e.target.checked)}
                                                            className="mr-1"
                                                        />
                                                        {modifier}
                                                    </label>
                                                ))}
                                            </div>
                                            {builderKeys.length > 1 && (
                                                <button
                                                    onClick={() => removeKeySequence(index)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={builderDescription}
                                    onChange={(e) => setBuilderDescription(e.target.value)}
                                    placeholder="Brief description of the keybinding"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            {/* Conditions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Conditions
                                </label>
                                <input
                                    type="text"
                                    value={builderConditions}
                                    onChange={(e) => setBuilderConditions(e.target.value)}
                                    placeholder="Conditions (comma-separated, e.g., normal-mode, visual-mode)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            {/* Achieve By */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Achieve By
                                </label>
                                <input
                                    type="text"
                                    value={builderAchieveBy}
                                    onChange={(e) => setBuilderAchieveBy(e.target.value)}
                                    placeholder="Application or context (e.g., vim, emacs)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>
                    )}
                    
                    {isValid && previewItem && (
                        <div className="bg-gray-50 rounded-md p-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                            <div className="space-y-1 text-sm">
                                <div>
                                    <span className="font-medium">Keybinding:</span>{' '}
                                    {previewItem.keybinding?.map((key, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 px-2 py-1 rounded border border-blue-300 mx-1"
                                        >
                                            {key.keycode}
                                            {key.modifiers && key.modifiers.length > 0 && (
                                                <span className="text-blue-600"> + {key.modifiers.join(' + ')}</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                                {previewItem.description && (
                                    <div>
                                        <span className="font-medium">Description:</span> {previewItem.description}
                                    </div>
                                )}
                                {previewItem.conditions && previewItem.conditions.length > 0 && (
                                    <div>
                                        <span className="font-medium">Conditions:</span> {previewItem.conditions.join(', ')}
                                    </div>
                                )}
                                {previewItem.achieveBy && (
                                    <div>
                                        <span className="font-medium">Achieve By:</span> {previewItem.achieveBy}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    <div className="bg-blue-50 rounded-md p-3">
                        <h4 className="text-sm font-medium text-blue-700 mb-2">Format Help</h4>
                        <div className="text-sm text-blue-600 space-y-1">
                            <div><code>&lt;C-f&gt;</code> - Ctrl+F</div>
                            <div><code>&lt;M-x&gt;</code> - Cmd+X (Mac) / Alt+X (Windows/Linux)</div>
                            <div><code>&lt;S-a&gt;</code> - Shift+A</div>
                            <div><code>a,b,c</code> - Sequence: A then B then C</div>
                            <div><code>key|description|conditions|achieveBy</code> - Full format</div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!isValid || (inputMode === 'raw' ? !editValue.trim() : !buildKeybindingString().trim())}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Save
                    </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                    Tip: Press Ctrl+Enter to save, Esc to cancel
                </div>
            </div>
        </div>
    );
};

export default KeybindingEditor;
