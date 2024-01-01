export interface KeyboardLayout {
  name: string;
  layout: KeyboardKey[][];
}

export class KeyboardKey {
    keycode: string;
    size: number;
    tags: Map<string, string | boolean>;

    constructor(keycode: string = '', size: number = 2, tags: Map<string, string | boolean> = new Map()) {
        this.keycode = keycode;
        this.size = size;
        this.tags = tags;
    }
}

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

export interface KeyboardLayout {
    name: string;
    layout: KeyboardKey[][];
}
