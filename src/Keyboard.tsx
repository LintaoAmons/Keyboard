
export const KeyboardSizeUnit = 1

export function normalSizeKey(keycode: string): KeyboardKey {
  return new KeyboardKey(keycode, 2, [])
}

export function key(keycode: string = '', size: number = 2, tags: string[] = []): KeyboardKey {
  return new KeyboardKey(keycode, size, tags)
}

export function toKeyboardLayout(layoutString: string[][]): KeyboardKey[][] {
  // Step 1
  return layoutString.map(row => {
    return row.map(key => {
      let keycode = '';
      let size = 2;

      // Step 2
      if (key.includes(',')) {
        const parts = key.split(',');
        keycode = parts[0];
        size = Number(parts[1]);
      } else {
        // Step 3
        keycode = key;
      }

      // Step 4
      return new KeyboardKey(keycode, size, []);
    });
  });
}

export class KeyboardKey {
  keycode: string;
  size: number;
  tags: string[];

  constructor(keycode: string = '', size: number = 2, tags: string[] = []) {
    this.keycode = keycode;
    this.size = size;
    this.tags = tags;
  }
}

export interface KeyboardLayout {
  name: string;
  layout: KeyboardKey[][];
}

export default function Keyboard(): JSX.Element {
  return (<>Keyboard</>)
}
