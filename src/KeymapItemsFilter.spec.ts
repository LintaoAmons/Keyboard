import { KeyMapItem, ScenarioJson } from './Config'
import { filterKeymapItems } from './KeymapItemsFilter'

const scenario: ScenarioJson = {
    name: 'test',
    keymapItems: [
        "i|Toggle between 'list' and 'tree' views|normal-mode,file_panel",
        'f|Flatten empty subdirectories in tree listing style|normal-mode,file_panel',
        '<S-r>|Update stats and entries in the file list|normal-mode,file_panel',
        'space,e|Bring focus to the file panel|insert-mode',
    ],
}

describe('filterKeymapItems', () => {
    it('test', () => {
        const result = filterKeymapItems(scenario, 'space')
        expect(result[0]).toEqual({
            keybinding: [
                { keycode: 'space', modifiers: undefined },
                { keycode: 'e', modifiers: undefined },
            ],
            description: 'Bring focus to the file panel',
            conditions: ['insert-mode'],
            achieveBy: '',
        } as KeyMapItem)
    })
})
