import { KeyMapItem, KeyStroke, Modifier } from '../Config';

export const findKeybindingsContainingKey = (
    keymapItems: KeyMapItem[],
    targetKey: string
): KeyMapItem[] => {
    const normalizedTargetKey = targetKey.toLowerCase();
    
    return keymapItems.filter(item => {
        if (!item.keybinding) return false;
        
        return item.keybinding.some(keystroke => {
            // Check if the key matches the keycode
            if (keystroke.keycode.toLowerCase() === normalizedTargetKey) {
                return true;
            }
            
            // Check if the key matches any modifier
            if (keystroke.modifiers) {
                return keystroke.modifiers.some(modifier => 
                    modifier.toLowerCase() === normalizedTargetKey
                );
            }
            
            return false;
        });
    });
};

export const normalizeKeyForSearch = (key: string): string => {
    // Handle special key mappings
    const keyMappings: Record<string, string> = {
        'space': ' ',
        'enter': 'return',
        'backspace': 'bs',
        'escape': 'esc',
        'delete': 'del',
        'tab': 'tab',
    };
    
    const normalizedKey = key.toLowerCase();
    return keyMappings[normalizedKey] || normalizedKey;
};

export const isKeyInKeybinding = (keybinding: KeyStroke[], targetKey: string): boolean => {
    const normalizedTargetKey = normalizeKeyForSearch(targetKey);
    
    return keybinding.some(keystroke => {
        // Check keycode
        if (normalizeKeyForSearch(keystroke.keycode) === normalizedTargetKey) {
            return true;
        }
        
        // Check modifiers
        if (keystroke.modifiers) {
            return keystroke.modifiers.some(modifier => 
                modifier.toLowerCase() === normalizedTargetKey
            );
        }
        
        return false;
    });
};

export const getKeyDescription = (key: string): string => {
    const keyDescriptions: Record<string, string> = {
        'cmd': 'Command',
        'ctrl': 'Control',
        'alt': 'Alt/Option',
        'shift': 'Shift',
        'hyper': 'Hyper',
        'tab': 'Tab',
        'space': 'Space',
        'enter': 'Enter',
        'backspace': 'Backspace',
        'escape': 'Escape',
        'delete': 'Delete',
    };
    
    return keyDescriptions[key.toLowerCase()] || key.toUpperCase();
};