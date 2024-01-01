import { KeyboardKey, toKeyboardLayout } from "./configParser";

describe('toKeyboardLayout', () => {
    test('should correctly parse a simple layout', () => {
        const layoutString = [
            ['a', 'b', 'c'],
            ['d', 'e,f', 'g']
        ];
        const layout = toKeyboardLayout(layoutString);

        expect(layout.length).toBe(2);
        expect(layout[0][0]).toEqual(new KeyboardKey('a', 2));
        expect(layout[1][1]).toEqual(new KeyboardKey('e', 2, new Map([["f", true]])));
    });

    test('should parse key-value pairs and boolean flags', () => {
        const layoutString = [
            ['a', 'b,isSpecial', 'c,color=red'],
            ['d', 'e,size=large,bold', 'g']
        ];
        const layout = toKeyboardLayout(layoutString);

        expect(layout[0][1].tags.get('isSpecial')).toBe(true);
        expect(layout[0][2].tags.get('color')).toBe('red');
        expect(layout[1][1].tags.get('size')).toBe('large');
        expect(layout[1][1].tags.get('bold')).toBe(true);
    });

    // Additional tests for edge cases and more complex scenarios can be added here
});
