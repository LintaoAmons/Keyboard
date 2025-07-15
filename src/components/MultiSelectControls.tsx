import React, { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

const MultiSelectControls: React.FC = () => {
    const { 
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
            
            {multiSelectMode && highlightedItems.length > 0 && (
                <div className="flex items-center gap-2">
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
                </div>
            )}
        </div>
    );
};

export default MultiSelectControls;