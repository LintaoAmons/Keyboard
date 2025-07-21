import { KeyMapItem } from './Config'

export interface FlameIntensity {
    intensity: number; // 0-1 range
    frequency: number; // actual frequency count
}

export function calculateKeyFrequencies(items: KeyMapItem[]): Map<string, number> {
    const frequencies = new Map<string, number>()
    
    items.forEach(item => {
        if (item.keybinding) {
            item.keybinding.forEach(keybinding => {
                // Count the main key
                const keycode = keybinding.keycode.toLowerCase()
                frequencies.set(keycode, (frequencies.get(keycode) || 0) + 1)
                
                // Count modifiers
                keybinding.modifiers?.forEach(modifier => {
                    const modifierKey = modifier.toLowerCase()
                    frequencies.set(modifierKey, (frequencies.get(modifierKey) || 0) + 1)
                })
            })
        }
    })
    
    return frequencies
}

export function calculateFlameIntensities(items: KeyMapItem[]): Map<string, FlameIntensity> {
    const frequencies = calculateKeyFrequencies(items)
    const maxFrequency = Math.max(...frequencies.values(), 1) // Ensure at least 1 to prevent division by zero
    
    const intensities = new Map<string, FlameIntensity>()
    
    frequencies.forEach((frequency, keycode) => {
        const intensity = frequency / maxFrequency
        intensities.set(keycode, { intensity, frequency })
    })
    
    return intensities
}

export function getFlameColor(intensity: number): string {
    // Convert intensity (0-1) to flame colors
    // Low intensity: white/gray
    // Medium intensity: yellow/orange
    // High intensity: red
    
    if (intensity <= 0) return 'bg-gray-100'
    if (intensity <= 0.1) return 'bg-gray-200'
    if (intensity <= 0.2) return 'bg-yellow-100'
    if (intensity <= 0.3) return 'bg-yellow-200'
    if (intensity <= 0.4) return 'bg-yellow-300'
    if (intensity <= 0.5) return 'bg-amber-300'
    if (intensity <= 0.6) return 'bg-orange-300'
    if (intensity <= 0.7) return 'bg-orange-400'
    if (intensity <= 0.8) return 'bg-red-400'
    if (intensity <= 0.9) return 'bg-red-500'
    return 'bg-red-600'
}

export function applyFlameColor(style: string, intensity: number): string {
    const flameColor = getFlameColor(intensity)
    return `${style} ${flameColor}`
}

// Generate a flame intensity map for keyboard keys
export function genFlameIntensityMap(items: KeyMapItem[]): Map<string, FlameIntensity> {
    return calculateFlameIntensities(items)
}