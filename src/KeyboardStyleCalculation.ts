import { KeyMapItem } from './Config'

export function bgColor(style: string, highlightLevel: number): string {
    switch (highlightLevel) {
        case 1:
            style += ' bg-purple-500'
            break
        case 2:
            style += ' bg-pink-300'
            break
        case 3:
            style += ' bg-purple-200'
            break
        case 4:
            style += ' bg-purple-100'
            break
        case 5:
            style += ' bg-blue-300'
            break
        case 0:
            break
        default:
            break
    }
    return style
}

export function bgColorMultiple(style: string, highlightLevels: number[], isKeyFilter: boolean = false): string {
    if (highlightLevels.length === 0) {
        return style;
    }
    
    // Use the highest priority level (lowest number, but treat 0 as no highlight)
    const validLevels = highlightLevels.filter(level => level > 0);
    if (validLevels.length === 0) {
        return style;
    }
    
    const primaryLevel = Math.min(...validLevels);
    
    // Key filter mode gets special styling
    if (isKeyFilter) {
        switch (primaryLevel) {
            case 1:
                style += ' bg-gradient-to-r from-emerald-400 to-emerald-300'
                break
            case 2:
                style += ' bg-gradient-to-r from-teal-300 to-teal-200'
                break
            case 3:
                style += ' bg-gradient-to-r from-cyan-300 to-cyan-200'
                break
            case 4:
                style += ' bg-gradient-to-r from-sky-300 to-sky-200'
                break
            case 5:
                style += ' bg-gradient-to-r from-indigo-300 to-indigo-200'
                break
        }
        // Add special border for key filter mode
        style += ' border-2 border-emerald-500'
        return style;
    }
    
    // Add gradient effect for multiple highlights
    if (highlightLevels.length > 1) {
        switch (primaryLevel) {
            case 1:
                style += ' bg-gradient-to-r from-purple-500 to-purple-400'
                break
            case 2:
                style += ' bg-gradient-to-r from-pink-300 to-pink-200'
                break
            case 3:
                style += ' bg-gradient-to-r from-purple-200 to-purple-100'
                break
            case 4:
                style += ' bg-gradient-to-r from-purple-100 to-purple-50'
                break
            case 5:
                style += ' bg-gradient-to-r from-blue-300 to-blue-200'
                break
        }
        // Add border to indicate multiple highlights
        style += ' border-2 border-yellow-400'
    } else {
        return bgColor(style, primaryLevel);
    }
    
    return style;
}

export function genHighlightLevelMap(
    highlightedItem: KeyMapItem
): Map<string, number> {
    const highlighMapping = new Map<string, number>()

    if (highlightedItem.keybinding) {
        highlightedItem.keybinding.forEach((keybinding, index) => {
            highlighMapping.set(keybinding.keycode.toLowerCase(), index + 1)
            keybinding.modifiers?.forEach((it) =>
                highlighMapping.set(it.toLowerCase(), 5)
            )
        })
    }

    return highlighMapping
}

export function genMultipleHighlightLevelMap(
    highlightedItems: KeyMapItem[]
): Map<string, number[]> {
    const highlightMapping = new Map<string, number[]>()

    highlightedItems.forEach((item) => {
        if (item.keybinding) {
            item.keybinding.forEach((keybinding, index) => {
                const keycode = keybinding.keycode.toLowerCase();
                const level = index + 1;
                
                if (highlightMapping.has(keycode)) {
                    highlightMapping.get(keycode)!.push(level);
                } else {
                    highlightMapping.set(keycode, [level]);
                }
                
                keybinding.modifiers?.forEach((modifier) => {
                    const modifierKey = modifier.toLowerCase();
                    if (highlightMapping.has(modifierKey)) {
                        highlightMapping.get(modifierKey)!.push(5);
                    } else {
                        highlightMapping.set(modifierKey, [5]);
                    }
                })
            })
        }
    })

    return highlightMapping
}

export function genKeyFilterHighlightLevelMap(
    filteredItems: KeyMapItem[]
): Map<string, number[]> {
    const highlightMapping = new Map<string, number[]>()

    filteredItems.forEach((item) => {
        if (item.keybinding) {
            item.keybinding.forEach((keybinding, index) => {
                const keycode = keybinding.keycode.toLowerCase();
                const level = index + 1;
                
                if (highlightMapping.has(keycode)) {
                    highlightMapping.get(keycode)!.push(level);
                } else {
                    highlightMapping.set(keycode, [level]);
                }
                
                keybinding.modifiers?.forEach((modifier) => {
                    const modifierKey = modifier.toLowerCase();
                    if (highlightMapping.has(modifierKey)) {
                        highlightMapping.get(modifierKey)!.push(5);
                    } else {
                        highlightMapping.set(modifierKey, [5]);
                    }
                })
            })
        }
    })

    return highlightMapping
}

export function getHighlightLevel(
    highlightLevelMap: Map<string, number>,
    keycode: string
) {
    return highlightLevelMap.get(keycode.toLowerCase()) || 0
}

export function getMultipleHighlightLevels(
    highlightLevelMap: Map<string, number[]>,
    keycode: string
): number[] {
    return highlightLevelMap.get(keycode.toLowerCase()) || [];
}
