import { KeyboardKey, toKeyboardLayout } from "./Keyboard";

describe('toKeyboardLayout', () => {
  it('should parse layout strings correctly', () => {
    const layoutStrings = [
      ['a', 'b,3', 'c'],
      ['d', 'e,4', 'f']
    ];
    
    const result = toKeyboardLayout(layoutStrings);

    const expected = [
      [new KeyboardKey('a', 2, []), new KeyboardKey('b', 3, []), new KeyboardKey('c', 2, [])],
      [new KeyboardKey('d', 2, []), new KeyboardKey('e', 4, []), new KeyboardKey('f', 2, [])]
    ];

    expect(result).toEqual(expected);
  });
});
