import React, { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { getKeyDescription } from '../utils/keybindingUtils';

const KeyClickControls: React.FC = () => {
    const { 
        keyClickMode, 
        setKeyClickMode, 
        clickedKey, 
        setClickedKey 
    } = useContext(ConfigContext);

    const toggleKeyClickMode = () => {
        setKeyClickMode(!keyClickMode);
        if (keyClickMode) {
            // Switching off key click mode, clear clicked key
            setClickedKey(null);
        }
    };

    const clearKeyFilter = () => {
        setClickedKey(null);
    };

    return (
        <div className="fixed top-28 right-4 z-50 flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleKeyClickMode}
                    className={`px-3 py-1 rounded text-sm border transition-all duration-200 shadow-md hover:shadow-lg ${
                        keyClickMode 
                            ? 'bg-green-500 text-white border-green-500 hover:bg-green-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    title={keyClickMode ? 'Disable key click mode' : 'Enable key click mode'}
                >
                    {keyClickMode ? 'Key Click ON' : 'Key Click OFF'}
                </button>
                
                {keyClickMode && clickedKey && (
                    <button
                        onClick={clearKeyFilter}
                        className="px-3 py-1 rounded text-sm border border-orange-300 text-orange-700 bg-white hover:bg-orange-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                        title="Clear key filter"
                    >
                        Clear
                    </button>
                )}
            </div>
            
            {keyClickMode && (
                <div className="bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 shadow-md max-w-xs">
                    {clickedKey 
                        ? `Filtering by: ${getKeyDescription(clickedKey)}` 
                        : 'Click any key on the keyboard to filter keybindings'
                    }
                </div>
            )}
        </div>
    );
};

export default KeyClickControls;
