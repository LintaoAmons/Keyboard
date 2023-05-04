import { FC, useState } from 'react';
import { KeyMapItem, Modifier } from '../CoreTypes';

export interface KeybindingModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (keybinding: KeyMapItem) => void;
}

const KeybindingModal: FC<KeybindingModalProps> = ({ isVisible, onClose, onSave }) => {
    const [keycode, setKeycode] = useState('');
    const [modifiers, setModifiers] = useState<Modifier[]>([]);
    const [description, setDescription] = useState('');
    const [achieveBy, setAchieveBy] = useState('');

    const handleSave = () => {
        onSave({
            keycode,
            modifiers,
            description,
            achieveBy,
        });
    };

    const handleModifierChange = (modifier: Modifier) => {
        setModifiers((prevModifiers) => {
            if (prevModifiers.includes(modifier)) {
                return prevModifiers.filter((m) => m !== modifier);
            }
            return [...prevModifiers, modifier];
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4">Add Keybinding</h2>
                <label htmlFor="keycode" className="block mb-2">
                    Keycode:
                    <input
                        type="text"
                        id="keycode"
                        value={keycode}
                        onChange={(e) => setKeycode(e.target.value)}
                        className="block w-full mt-1 border rounded-md p-2"
                    />
                </label>
                <fieldset className="mb-4">
                    <legend className="block mb-2">Modifiers:</legend>
                    <div className="modifiers flex flex-wrap">
                        {Object.values(Modifier).map((modifier) => (
                            <label
                                key={modifier}
                                htmlFor={`${modifier}-checkbox`}
                                className="inline-flex items-center mr-4 mb-2">
                                <input
                                    type="checkbox"
                                    id={`${modifier}-checkbox`}
                                    checked={modifiers.includes(modifier)}
                                    onChange={() => handleModifierChange(modifier)}
                                    className="mr-2"
                                />
                                {modifier}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <label htmlFor="description" className="block mb-2">
                    Description:
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full mt-1 border rounded-md p-2"
                    />
                </label>
                <label htmlFor="achieveBy" className="block mb-4">
                    Achieved By:
                    <input
                        type="text"
                        id="achieveBy"
                        value={achieveBy}
                        onChange={(e) => setAchieveBy(e.target.value)}
                        className="block w-full mt-1 border rounded-md p-2"
                    />
                </label>
                <button
                    onClick={handleSave}
                    className="bg-black text-white rounded-md px-4 py-2 mr-2">
                    Save
                </button>
                <button onClick={onClose} className="bg-gray-300 text-black rounded-md px-4 py-2">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export { KeybindingModal };
