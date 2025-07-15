import { parseJsonConfig } from './configParser'

export enum Modifier {
    CMD = 'CMD',
    CTRL = 'CTRL',
    SHIFT = 'SHIFT',
    ALT = 'ALT',
    TAB = 'TAB',
    HYPER = 'HYPER',
}

export function isModifier(keycode: string): boolean {
    return Object.values(Modifier)
        .map((v) => v.toLowerCase())
        .includes(keycode.toLowerCase() as string)
}

// Re-export from utils for backward compatibility
export {
    getActiveKeyboardConfigJson,
    getActiveKeyboardConfig,
    getActiveKeyboardConfigFromJson,
    getActiveScenario as getActiveSenario,
    getActiveScenarioJson as getActiveSenarioJson,
    getActiveScenarioFromJson as getActiveSenarioFromJson
} from './utils/configUtils'

export interface KeyboardLayout {
    name: string
    layout: KeyboardKey[][]
}

export interface KeyboardLayoutJson {
    name: string
    layout: string[][]
}

export class KeyboardKey {
    keycode: string
    size: number
    tags: Map<string, string | boolean>

    constructor(
        keycode: string = '',
        size: number = 2,
        tags: Map<string, string | boolean> = new Map()
    ) {
        this.keycode = keycode
        this.size = size
        this.tags = tags
    }
}

export interface KeyboardConfig {
    name: string
    version?: string
    keyboardLayout: KeyboardLayout
    scenarios: Scenario[]
}

export interface KeyboardConfigJson {
    name: string
    version?: string
    // TODO: can't convert config to string representation yet
    keyboardLayout?: KeyboardLayoutJson
    scenarios: ScenarioJson[]
}

export interface Scenario {
    name: string
    KeymapItems: KeyMapItem[]
}

export interface ScenarioJson {
    name: string
    keymapItems: string[]
}

export interface KeyMapItem {
    keybinding: KeyStroke[]
    description?: string
    conditions?: string[]
    achieveBy?: string
}

export interface KeyStroke {
    keycode: string
    modifiers?: Modifier[]
}
