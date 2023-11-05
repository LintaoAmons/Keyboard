import { KeyMapItem } from "./Config";

export function bgColor(style: string, highlightLevel: number): string {
    switch (highlightLevel) {
        case 1:
            style += " bg-fuchsia-100";
            break;
        case 2:
            style += " bg-fuchsia-300";
            break;
        case 3:
            style += " bg-yellow-500";
            break;
        case 4:
            style += " bg-red-500";
            break;
        case 0:
            break;
        default:
            break;
    }
    return style;
}

export function genHighlightLevelMap(highlightedItem: KeyMapItem): Map<string, number> {
    const highlighMapping = new Map<string, number>()

    if (highlightedItem.keybinding) {
        highlightedItem.keybinding.forEach((keybinding, index) => {
            highlighMapping.set(keybinding.keycode.toLowerCase(), index+1)
            keybinding.modifiers?.forEach(it => highlighMapping.set(it.toLowerCase(), index+1))
        })
    }

    return highlighMapping
}

export function getHighlightLevel(highlightLevelMap: Map<string, number>, keycode: string) {
    return highlightLevelMap.get(keycode.toLowerCase()) || 0
}
