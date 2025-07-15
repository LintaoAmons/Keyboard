import React, { useContext, useRef } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

const EditModeControls: React.FC = () => {
    const { 
        editMode, 
        setEditMode, 
        hasUnsavedChanges, 
        saveConfig, 
        loadConfig, 
        resetConfig,
        exportConfig,
        importConfig 
    } = useContext(ConfigContext);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleEditMode = () => {
        if (editMode && hasUnsavedChanges) {
            const confirmed = window.confirm('You have unsaved changes. Do you want to save them before exiting edit mode?');
            if (confirmed) {
                saveConfig();
            }
        }
        setEditMode(!editMode);
    };

    const handleSave = () => {
        saveConfig();
        alert('Configuration saved successfully!');
    };

    const handleReset = () => {
        const confirmed = window.confirm('This will reset the configuration to default. Are you sure?');
        if (confirmed) {
            resetConfig();
            alert('Configuration reset to default!');
        }
    };

    const handleExport = () => {
        const configData = exportConfig();
        const blob = new Blob([configData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `keyboard-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const success = importConfig(content);
                    if (success) {
                        alert('Configuration imported successfully!');
                    } else {
                        alert('Failed to import configuration. Please check the file format.');
                    }
                } catch (error) {
                    alert('Failed to import configuration. Invalid file format.');
                }
            };
            reader.readAsText(file);
        }
        // Reset the input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 items-end">
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleEditMode}
                    className={`px-3 py-1 rounded text-sm border transition-all duration-200 shadow-md hover:shadow-lg ${
                        editMode 
                            ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    title={editMode ? 'Exit edit mode' : 'Enter edit mode'}
                >
                    {editMode ? 'Edit ON' : 'Edit OFF'}
                </button>
                
                {editMode && (
                    <>
                        <button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges}
                            className={`px-3 py-1 rounded text-sm border transition-all duration-200 shadow-md hover:shadow-lg ${
                                hasUnsavedChanges 
                                    ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                                    : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                            }`}
                            title="Save changes"
                        >
                            Save
                        </button>
                        
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleExport}
                                className="px-3 py-1 rounded text-sm border border-green-300 text-green-700 bg-white hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                                title="Export configuration"
                            >
                                Export
                            </button>
                            
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 rounded text-sm border border-purple-300 text-purple-700 bg-white hover:bg-purple-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                                title="Import configuration"
                            >
                                Import
                            </button>
                            
                            <button
                                onClick={handleReset}
                                className="px-3 py-1 rounded text-sm border border-red-300 text-red-700 bg-white hover:bg-red-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                                title="Reset to default"
                            >
                                Reset
                            </button>
                        </div>
                    </>
                )}
            </div>
            
            {editMode && hasUnsavedChanges && (
                <div className="bg-yellow-100 border border-yellow-300 rounded px-3 py-1 text-sm text-yellow-700 shadow-md">
                    ⚠️ You have unsaved changes
                </div>
            )}
            
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
            />
        </div>
    );
};

export default EditModeControls;