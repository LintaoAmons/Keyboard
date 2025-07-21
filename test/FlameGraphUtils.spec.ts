import { describe, test, expect } from 'vitest'
import { calculateKeyFrequencies, calculateFlameIntensities, getFlameColor } from '../src/FlameGraphUtils'
import { KeyMapItem } from '../src/Config'

describe('FlameGraphUtils', () => {
    describe('calculateKeyFrequencies', () => {
        test('should calculate frequencies correctly', () => {
            const items: KeyMapItem[] = [
                {
                    keybinding: [
                        { keycode: 'a', modifiers: ['ctrl'] },
                        { keycode: 'b' }
                    ]
                },
                {
                    keybinding: [
                        { keycode: 'a' },
                        { keycode: 'c', modifiers: ['ctrl', 'shift'] }
                    ]
                }
            ]

            const frequencies = calculateKeyFrequencies(items)
            expect(frequencies.get('a')).toBe(2)
            expect(frequencies.get('b')).toBe(1)
            expect(frequencies.get('c')).toBe(1)
            expect(frequencies.get('ctrl')).toBe(2)
            expect(frequencies.get('shift')).toBe(1)
        })

        test('should return empty map for empty items', () => {
            const frequencies = calculateKeyFrequencies([])
            expect(frequencies.size).toBe(0)
        })

        test('should handle case sensitivity', () => {
            const items: KeyMapItem[] = [
                {
                    keybinding: [{ keycode: 'A' }]
                },
                {
                    keybinding: [{ keycode: 'a' }]
                }
            ]

            const frequencies = calculateKeyFrequencies(items)
            expect(frequencies.get('a')).toBe(2)
            expect(frequencies.get('A')).toBeUndefined()
        })
    })

    describe('calculateFlameIntensities', () => {
        test('should calculate intensities correctly', () => {
            const items: KeyMapItem[] = [
                {
                    keybinding: [
                        { keycode: 'a' },
                        { keycode: 'b' }
                    ]
                },
                {
                    keybinding: [
                        { keycode: 'a' },
                        { keycode: 'a' }
                    ]
                }
            ]

            const intensities = calculateFlameIntensities(items)
            
            expect(intensities.get('a')?.frequency).toBe(3)
            expect(intensities.get('b')?.frequency).toBe(1)
            expect(intensities.get('a')?.intensity).toBe(1) // max intensity
            expect(intensities.get('b')?.intensity).toBeCloseTo(0.33, 2) 
        })

        test('should return 0 intensity for unused keys', () => {
            const items: KeyMapItem[] = [
                {
                    keybinding: [{ keycode: 'x' }]
                }
            ]

            const intensities = calculateFlameIntensities(items)
            expect(intensities.get('y')?.intensity).toBeUndefined()
        })
    })

    describe('getFlameColor', () => {
        test('should return appropriate colors for intensity levels', () => {
            expect(getFlameColor(0)).toBe('bg-gray-100')
            expect(getFlameColor(0.1)).toBe('bg-gray-200')
            expect(getFlameColor(0.3)).toBe('bg-yellow-200')
            expect(getFlameColor(0.7)).toBe('bg-orange-400')
            expect(getFlameColor(1.0)).toBe('bg-red-600')
        })

        test('should return correct color at boundary values', () => {
            expect(getFlameColor(0.2)).toBe('bg-yellow-100')
            expect(getFlameColor(0.5)).toBe('bg-amber-300')
            expect(getFlameColor(0.9)).toBe('bg-red-500')
        })
    })
})