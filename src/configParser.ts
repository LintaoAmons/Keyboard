import { KeyboardConfig, KeyboardKey } from "./Config";

export function toKeyboardLayout(layoutString: string[][]): KeyboardKey[][] {
    return layoutString.map(row => {
        return row.map(key => {
            let keycode = '';
            let size = 2;
            let tags = new Map<string, string | boolean>();

            if (key === ',') {
                return new KeyboardKey(",");
            }

            const parts = key.split(',');
            if (parts.length > 0) {
                keycode = parts[0];

                for (let i = 1; i < parts.length; i++) {
                    if (parts[i].includes('=')) {
                        // Key-value pair
                        const tagParts = parts[i].split('=');
                        tags.set(tagParts[0], tagParts[1]);
                    } else if (i === 1 && !isNaN(Number(parts[i]))) {
                        // Size is always the second part, if it's a number
                        size = Number(parts[i]);
                    } else {
                        tags.set(parts[i], true);
                    }
                }
            }

            return new KeyboardKey(keycode, size, tags);
        });
    });
}

const defaultKeyboardLayout =
    JSON.parse(`{"keyboardLayout": {
    "name": "Lintaos keyboard",
    "layout": [
      ["esc", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "=", "backspace,grow"],
      ["tab,3", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|,grow"],
      ["ctrl,4", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter,grow"],
      ["shift,5", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift,grow"],
      ["", "", "alt", "cmd", "space,14", "hyper", "alt"]
    ]
}}
`)

export function parseJsonConfig(raw: any): KeyboardConfig {
    var layout
    if (raw.keyboardLayout && raw.keyboardLayout.layout) {
        layout = {
            name: raw.keyboardLayout.name,
            layout: toKeyboardLayout(raw.keyboardLayout.layout)
        }
    } else {
        layout = {
            name: defaultKeyboardLayout.name,
            layout: toKeyboardLayout(defaultKeyboardLayout.layout)
        }
    }

    return {
        name: raw.name,
        version: raw.version,
        keyboardLayout: layout,
        scenarios: raw.scenarios
    }
}
