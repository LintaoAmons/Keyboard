export const KEYBOARD_SIZE_UNIT = 1.5;

export const STYLES = {
    MODIFIER_BORDER: 'border-blue-500 border-2 border-dashed',
    REGULAR_BORDER: 'border-black border',
    BASE_KEY_STYLE: 'flex items-center justify-center mx-1 h-12 ',
} as const;

export const SPECIAL_CHARACTERS = {
    COMMA_PLACEHOLDER: '♞',
    ESCAPED_COMMA: '\\,',
    COMMA: ',',
} as const;

export const MODIFIER_MAP = {
    'CMD': 'M',
    'CTRL': 'C', 
    'SHIFT': 'S',
    'ALT': 'A',
    'TAB': 'T',
    'HYPER': 'H',
} as const;

export const DEFAULT_KEYBOARD_LAYOUT = {
    name: "Lintaos keyboard",
    layout: [
        ["esc", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "=", "backspace,grow"],
        ["tab,3", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|,grow"],
        ["ctrl,4", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter,grow"],
        ["shift,5", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift,grow"],
        ["", "", "alt", "cmd", "space,14", "hyper", "alt"]
    ]
} as const;