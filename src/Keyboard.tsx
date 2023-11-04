const KeyboardSizeUnit = 1.5

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
export interface KeyboardLayout {
  name: string;
  layout: KeyboardKey[][];
}

interface KeyProps {
  keyData: KeyboardKey;
}

const Key: React.FC<KeyProps> = ({ keyData }) => {
  const { keycode, size, tags } = keyData;

  const width = `${KeyboardSizeUnit * size}rem`;

  const style = `flex items-center justify-center mx-1 h-12 bg-white border border-black w-[${width}]`

  return <div className={style}>{keycode}</div>;
}


const lintaosKeyboard: KeyboardLayout = {
  name: 'Lintaos keyboard',
  layout: toKeyboardLayout(
    [
      ['esc', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '=', 'backspace,4'],
      ['tab,3', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|,3'],
      ['caps,4', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter,5'],
      ['shift,5', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift,5'],
      ['', '', 'alt', 'cmd', 'space,14', 'cmd', 'alt'],
    ]
  ),
}

export default function Keyboard(): JSX.Element {
  const layout = lintaosKeyboard.layout

  return (
    <>
      {layout.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex">
          {row.map((keyData, keyIndex) => (
            <Key key={`key-${keyIndex}`} keyData={keyData} />
          ))}
        </div>
      ))}
    </>
  )
}
