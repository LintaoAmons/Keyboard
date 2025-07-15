import React, { CSSProperties, useContext } from 'react';
import { isModifier, KeyboardKey } from '../Config';
import { bgColor, bgColorMultiple } from '../KeyboardStyleCalculation';
import { KEYBOARD_SIZE_UNIT, STYLES } from '../constants';
import { ConfigContext } from '../contexts/ConfigContext';

interface KeyProps {
    keyData: KeyboardKey;
    highlightLevel: number;
    highlightLevels?: number[];
    isKeyFilterMode?: boolean;
}

const Key: React.FC<KeyProps> = ({ keyData, highlightLevel, highlightLevels = [], isKeyFilterMode = false }) => {
    const { keycode, size, tags } = keyData;
    const { setClickedKey, keyClickMode, clickedKey, editMode, setKeyClickNewKeybinding } = useContext(ConfigContext);

    const getKeyStyle = (): CSSProperties => {
        const baseStyle: CSSProperties = {
            width: `${KEYBOARD_SIZE_UNIT * size}rem`,
        };

        if (tags.get('grow') === true) {
            return { ...baseStyle, flexGrow: 1 };
        }

        return baseStyle;
    };

    const handleKeyClick = () => {
        if (keyClickMode && keycode) {
            setClickedKey(keycode);
        } else if (editMode && keycode) {
            // In edit mode, clicking a key triggers the new keybinding dialog
            const newKeybinding = `${keycode}|New keybinding for ${keycode}`;
            setKeyClickNewKeybinding(newKeybinding);
        }
    };

    const getKeyClassName = (): string => {
        let className = STYLES.BASE_KEY_STYLE;

        // Add cursor pointer if key click mode or edit mode is enabled and key is not empty
        if ((keyClickMode || editMode) && keycode) {
            className += 'cursor-pointer hover:bg-gray-100 ';
        }

        // Add special styling for clicked key in key click mode
        if (keyClickMode && clickedKey === keycode) {
            className += 'ring-2 ring-blue-500 ring-offset-2 ';
        }

        // Add special styling for edit mode
        if (editMode && keycode) {
            className += 'ring-2 ring-orange-400 ring-offset-1 hover:ring-orange-500 ';
        }

        if (isModifier(keycode)) {
            className += STYLES.MODIFIER_BORDER;
        } else {
            className += STYLES.REGULAR_BORDER;
        }

        // Use multiple highlight levels if available, otherwise use single highlight
        if (highlightLevels && highlightLevels.length > 0) {
            return bgColorMultiple(className, highlightLevels, isKeyFilterMode);
        } else {
            return bgColor(className, highlightLevel);
        }
    };

    if (keycode === '') {
        return <div style={getKeyStyle()}>{keycode}</div>;
    }

    return (
        <div 
            className={getKeyClassName()} 
            style={getKeyStyle()}
            onClick={handleKeyClick}
            title={
                keyClickMode && keycode 
                    ? `Click to find all keybindings containing '${keycode}'`
                    : editMode && keycode 
                        ? `Click to add new keybinding for '${keycode}'`
                        : undefined
            }
        >
            {keycode}
        </div>
    );
};

export default Key;
