import { Config, KeyboardKey, KeyMapItem, KeyStroke, Modifier } from "./Config";
import { keyMapItemToString, parseKeyMapItemFromString, parseKeyStroke, toKeyboardLayout } from "./configParser";

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

describe('keyMapItemToString', () => {
    test.each([
        // Test case 1
        [{
            keybinding: [
                { keycode: "," },
                { keycode: "f" },
                { keycode: "m", modifiers: [Modifier.HYPER] }
            ],
            description: ""
        }, "\\,,f,<H-m>"],

        // Test case 2
        [{
            keybinding: [
                { keycode: "f" },
                { keycode: "," },
                { keycode: "m", modifiers: [Modifier.HYPER] }
            ],
            description: ""
        }, "f,\\,,<H-m>"],

        // Test case 3
        [{
            keybinding: [
                { keycode: "space", modifiers: [Modifier.CTRL, Modifier.SHIFT] },
                { keycode: "f" },
                { keycode: "m", modifiers: [Modifier.HYPER] }
            ],
            description: "mydes",
            achieveBy: "achieveBy"
        }, "<C-S-space>,f,<H-m>|mydes|achieveBy"],

        // Test case 4
        [{
            keybinding: [
                { keycode: "d", modifiers: [Modifier.CTRL, Modifier.ALT] },
                { keycode: "x" }
            ],
            description: ""
        }, "<C-A-d>,x"],

        // Test case 5
        [{
            keybinding: [
                { keycode: "f", modifiers: [Modifier.CMD] },
                { keycode: "space", modifiers: [Modifier.ALT] },
                { keycode: "b" }
            ],
            description: ""
        }, "<M-f>,<A-space>,b"],

        // Test case 6
        [{
            keybinding: [
                { keycode: "z" },
                { keycode: "k", modifiers: [Modifier.CTRL, Modifier.SHIFT, Modifier.CMD] },
                { keycode: "a", modifiers: [Modifier.HYPER] }
            ],
            description: ""
        }, "z,<C-S-M-k>,<H-a>"]
        // Add more test cases as needed
    ])('converts KeyMapItem to string correctly', (input, expected) => {
        expect(keyMapItemToString(input)).toBe(expected);
    });
});

describe('parseKeyMapItemFromString', () => {

    describe('parse escaped comma', () => {
        test('parses string "\\,,f,<m-H>" to KeyMapItem correctly', () => {
            const input = "\\,,f,<m-H>";
            console.log(input)
            const expected = {
                keybinding: [
                    { keycode: "," },
                    { keycode: "f" },
                    { keycode: "m", modifiers: ["HYPER"] }
                ],
                description: ""
            };
            expect(parseKeyMapItemFromString(input)).toEqual(expected);
        });

        test('parses string "f,\\,,<m-H>" to KeyMapItem correctly', () => {
            const input = "f,\\,,<m-H>";
            const expected = {
                keybinding: [
                    { keycode: "f" },
                    { keycode: "," },
                    { keycode: "m", modifiers: ["HYPER"] }
                ],
                description: ""
            };
            expect(parseKeyMapItemFromString(input)).toEqual(expected);
        });
    })

    it('parses string "<space-C-S>,f,<m-H>|mydes|achieveBy" to KeyMapItem correctly', () => {
        const input = "<space-C-S>,f,<m-H>|mydes|achieveBy";
        const expected = {
            keybinding: [
                { keycode: "space", modifiers: ["CTRL", "SHIFT"] },
                { keycode: "f" },
                { keycode: "m", modifiers: ["HYPER"] }
            ],
            description: "mydes",
            achieveBy: "achieveBy"
        };
        expect(parseKeyMapItemFromString(input)).toEqual(expected);
    });


    test('parses string "<C-A-d>,x" to KeyMapItem correctly', () => {
        const input = "<C-A-d>,x";
        const expected: KeyMapItem = {
            keybinding: [
                { keycode: "d", modifiers: [Modifier.CTRL, Modifier.ALT] },
                { keycode: "x" }
            ],
            description: ""
        };
        expect(parseKeyMapItemFromString(input)).toEqual(expected);
    });

    test('parses string "<M-f>,<A-space>,b" to KeyMapItem correctly', () => {
        const input = "<M-f>,<A-space>,b";
        const expected: KeyMapItem = {
            keybinding: [
                { keycode: "f", modifiers: [Modifier.CMD] },
                { keycode: "space", modifiers: [Modifier.ALT] },
                { keycode: "b" }
            ],
            description: ""
        };
        expect(parseKeyMapItemFromString(input)).toEqual(expected);
    });

    test('parses string "z,<C-S-M-k>,<H-A>" to KeyMapItem correctly', () => {
        const input = "z,<C-S-M-k>,<H-a>";
        const expected: KeyMapItem = {
            keybinding: [
                { keycode: "z" },
                { keycode: "k", modifiers: [Modifier.CTRL, Modifier.SHIFT, Modifier.CMD] },
                { keycode: "a", modifiers: [Modifier.HYPER] }
            ],
            description: ""
        };
        expect(parseKeyMapItemFromString(input)).toEqual(expected);
    });
})

describe("parseKeyStroke", () => {
    test("parse `<C-S-M-k>`", () => {
        const input = "<C-S-M-k>"
        const expected: KeyStroke = {
            keycode: "k",
            modifiers: [Modifier.CTRL, Modifier.SHIFT, Modifier.CMD]
        }

        const result = parseKeyStroke(input)

        const expectedModifiersSet = new Set(expected.modifiers);
        const resultModifiersSet = new Set(result.modifiers);

        expect(result.keycode).toEqual(expected.keycode);
        expect(resultModifiersSet).toEqual(expectedModifiersSet);
    })

    test("parse `k`", () => {
        const input = "k"
        const expected: KeyStroke = {
            keycode: "k",
        }

        expect(parseKeyStroke(input)).toEqual(expected)
    })

    test("parse `<H-a>`", () => {
        const input = "<H-a>"
        const expected: KeyStroke = {
            keycode: "a",
            modifiers: [Modifier.HYPER]
        }

        expect(parseKeyStroke(input)).toEqual(expected)
    })
})

