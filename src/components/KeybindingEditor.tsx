import React, { useState, useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { keyMapItemToString, parseKeyMapItemFromString } from '../utils/parsingUtils';

interface KeybindingEditorProps {
    itemIndex: number;
    keybindingString: string;
    onSave: (newKeybinding: string) => void;
    onCancel: () => void;
}

const KeybindingEditor: React.FC<KeybindingEditorProps> = ({ 
    itemIndex, 
    keybindingString, 
    onSave, 
    onCancel 
}) => {
    const [editValue, setEditValue] = useState(keybindingString);
    const [isValid, setIsValid] = useState(true);
    const [previewItem, setPreviewItem] = useState(parseKeyMapItemFromString(keybindingString));

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

    const handleSave = () => {
        if (isValid && editValue.trim()) {
            onSave(editValue);
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
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Edit Keybinding</h3>
                
                <div className="space-y-4">
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
                        disabled={!isValid || !editValue.trim()}
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