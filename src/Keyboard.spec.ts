import { KeyboardKey, toKeyboardLayout } from "./Keyboard";
import { bgColor } from "./KeyboardStyleCalculation";

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

describe('bgColor function', () => {
    it('should append bg-fuchsia-300 for highlightLevel 1', () => {
        const style = bgColor("text-white", 1);
        expect(style).toBe("text-white bg-fuchsia-300");
    });

    it('should append bg-yellow-500 for highlightLevel 2', () => {
        const style = bgColor("text-black", 2);
        expect(style).toBe("text-black bg-yellow-500");
    });

    it('should append bg-red-500 for highlightLevel 3', () => {
        const style = bgColor("text-blue", 3);
        expect(style).toBe("text-blue bg-red-500");
    });

    it('should not append anything for highlightLevels other than 1, 2, or 3', () => {
        const style = bgColor("text-green", 0);
        expect(style).toBe("text-green");
    });
});
