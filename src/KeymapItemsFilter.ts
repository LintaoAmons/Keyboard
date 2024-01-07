import { KeyMapItem, ScenarioJson } from "./Config";
import Fuse from 'fuse.js';
import { parseKeyMapItemFromString } from "./configParser";

export function filterKeymapItems(scenario: ScenarioJson, pattern: string): KeyMapItem[] {
    if (pattern === "") return scenario.keymapItems.map(i => parseKeyMapItemFromString(i))

    const fuse = new Fuse(scenario.keymapItems)
    const result = fuse.search(pattern)
    return result.map(r => {
        return parseKeyMapItemFromString(r.item)
    })
}
