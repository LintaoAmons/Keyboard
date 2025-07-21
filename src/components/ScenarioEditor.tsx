import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

interface ScenarioEditorProps {
    mode: 'add' | 'edit' | 'duplicate';
    scenarioName?: string;
    onSave: (scenarioName: string) => void;
    onCancel: () => void;
}

const ScenarioEditor: React.FC<ScenarioEditorProps> = ({ 
    mode, 
    scenarioName = '', 
    onSave, 
    onCancel 
}) => {
    const { config } = useContext(ConfigContext);
    const [name, setName] = useState(mode === 'duplicate' ? `${scenarioName} (Copy)` : scenarioName);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        validateName(name);
    }, [name]);

    const validateName = (inputName: string) => {
        const trimmedName = inputName.trim();
        
        if (!trimmedName) {
            setErrorMessage('Scenario name cannot be empty');
            setIsValid(false);
            return;
        }

        if (trimmedName.length < 2) {
            setErrorMessage('Scenario name must be at least 2 characters long');
            setIsValid(false);
            return;
        }

        if (trimmedName.length > 50) {
            setErrorMessage('Scenario name cannot exceed 50 characters');
            setIsValid(false);
            return;
        }

        // Check for invalid characters
        const invalidChars = /[<>:"\\|?*]/;
        if (invalidChars.test(trimmedName)) {
            setErrorMessage('Scenario name contains invalid characters');
            setIsValid(false);
            return;
        }

        // Check if name already exists (except when editing the same scenario)
        const nameExists = config.scenarios.some(s => 
            s.name === trimmedName && (mode === 'add' || mode === 'duplicate' || s.name !== scenarioName)
        );
        if (nameExists) {
            setErrorMessage('A scenario with this name already exists');
            setIsValid(false);
            return;
        }

        setErrorMessage('');
        setIsValid(true);
    };

    const handleSave = () => {
        if (isValid && name.trim()) {
            onSave(name.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && isValid) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onCancel();
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'add': return 'Add New Scenario';
            case 'edit': return 'Edit Scenario';
            case 'duplicate': return 'Duplicate Scenario';
            default: return 'Scenario Editor';
        }
    };

    const getDescription = () => {
        switch (mode) {
            case 'add': return 'Create a new scenario to organize your keybindings';
            case 'edit': return 'Change the name of this scenario';
            case 'duplicate': return 'Create a copy of this scenario with all its keybindings';
            default: return '';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-2">{getTitle()}</h3>
                <p className="text-sm text-gray-600 mb-4">{getDescription()}</p>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Scenario Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isValid ? 'border-gray-300' : 'border-red-300 bg-red-50'
                            }`}
                            placeholder="Enter scenario name..."
                            autoFocus
                        />
                        {!isValid && errorMessage && (
                            <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
                        )}
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
                        disabled={!isValid}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {mode === 'add' ? 'Create' : mode === 'duplicate' ? 'Duplicate' : 'Save'}
                    </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                    Tip: Press Enter to save, Esc to cancel
                </div>
            </div>
        </div>
    );
};

export default ScenarioEditor;
