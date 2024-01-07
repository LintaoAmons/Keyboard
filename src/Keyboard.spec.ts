import { KeyboardKey, KeyMapItem, KeyStroke, Modifier } from './Config'
import { toKeyboardLayout } from './configParser'
import {
    bgColor,
    genHighlightLevelMap,
    getHighlightLevel,
} from './KeyboardStyleCalculation'

describe('toKeyboardLayout', () => {
    it('should parse layout strings correctly', () => {
        const layoutStrings = [
            ['a', 'b,3', 'c'],
            ['d', 'e,4', 'f'],
        ]

        const result = toKeyboardLayout(layoutStrings)

        const expected = [
            [
                new KeyboardKey('a', 2),
                new KeyboardKey('b', 3),
                new KeyboardKey('c', 2),
            ],
            [
                new KeyboardKey('d', 2),
                new KeyboardKey('e', 4),
                new KeyboardKey('f', 2),
            ],
        ]

        expect(result).toEqual(expected)
    })
})

describe('bgColor function', () => {
    it('should append bg-fuchsia-300 for highlightLevel 2', () => {
        const style = bgColor('text-white', 2)
        expect(style).toBe('text-white bg-pink-300')
    })

    it('should append bg-yellow-500 for highlightLevel 3', () => {
        const style = bgColor('text-black', 3)
        expect(style).toBe('text-black bg-purple-200')
    })

    it('should append bg-red-500 for highlightLevel 4', () => {
        const style = bgColor('text-blue', 4)
        expect(style).toBe('text-blue bg-purple-100')
    })

    it('should append bg-blue-300 for highlightLevel 5 for modifiers', () => {
        const style = bgColor('text-blue', 5)
        expect(style).toBe('text-blue bg-blue-300')
    })

    it('should not append anything for highlightLevels other than 1, 2, 3, 4 or 4', () => {
        const style = bgColor('text-green', 6)
        expect(style).toBe('text-green')
    })
})

describe('getHighlightLevel', () => {
    it('should return correct highlight mapping for a given KeyMapItem and keycode', () => {
        const keycode = 'A'
        const modifiers = [Modifier.CMD, Modifier.SHIFT]
        const keybinding: KeyStroke[] = [
            { keycode, modifiers },
            { keycode: 'b' },
        ]
        const highlightedItem: KeyMapItem = {
            keybinding,
            description: 'Test KeyMapItem',
        }

        const expectedHighlighMapping = new Map([
            ['a', 1],
            ['cmd', 5],
            ['shift', 5],
            ['b', 2],
        ])

        const result = genHighlightLevelMap(highlightedItem)

        expect(result).toEqual(expectedHighlighMapping)
    })
})

describe('getHighlightLevel', () => {
    it('returns the correct highlight level for a known keycode', () => {
        const highlightLevelMap = new Map<string, number>()
        highlightLevelMap.set('a', 1)
        highlightLevelMap.set('b', 2)
        const highlightLevel = getHighlightLevel(highlightLevelMap, 'A')
        expect(highlightLevel).toEqual(1)
    })

    it('returns 9 for an unknown keycode', () => {
        const highlightLevelMap = new Map<string, number>()
        highlightLevelMap.set('a', 1)
        highlightLevelMap.set('b', 2)
        const highlightLevel = getHighlightLevel(highlightLevelMap, 'C')
        expect(highlightLevel).toEqual(0)
    })

    it('handles case insensitivity correctly', () => {
        const highlightLevelMap = new Map<string, number>()
        highlightLevelMap.set('a', 1)
        const highlightLevel = getHighlightLevel(highlightLevelMap, 'A')
        expect(highlightLevel).toEqual(1)
    })
})
