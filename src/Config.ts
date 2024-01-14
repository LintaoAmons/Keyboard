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

export function getActiveKeyboardConfigJson(
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string
): KeyboardConfigJson {
    const activeConfig = configs.find(
        (config) => config.name === activeKeyboardConfigName
    )
    if (activeConfig === undefined) {
        return configs[0]
    }
    return activeConfig
}

export function getActiveKeyboardConfig(
    configs: KeyboardConfig[],
    activeKeyboardConfigName: string
): KeyboardConfig {
    const activeConfig = configs.find(
        (config) => config.name === activeKeyboardConfigName
    )
    if (activeConfig === undefined) {
        return configs[0]
    }
    return activeConfig
}

export function getActiveKeyboardConfigFromJson(
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string
): KeyboardConfig {
    const activeConfig = configs.find(
        (config) => config.name === activeKeyboardConfigName
    )
    if (activeConfig === undefined) {
        return parseJsonConfig(configs[0])
    }
    return parseJsonConfig(activeConfig)
}

export function getActiveSenario(
    configs: KeyboardConfig[],
    activeKeyboardConfigName: string,
    activeScenarioName: string
): Scenario {
    const activeConfig = getActiveKeyboardConfig(
        configs,
        activeKeyboardConfigName
    )
    const activeScenario = activeConfig.scenarios.find(
        (scenario) => scenario.name === activeScenarioName
    )
    if (activeScenario === undefined) {
        return activeConfig.scenarios[0]
    }
    return activeScenario
}

export function getActiveSenarioJson(
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string,
    activeScenarioName: string
): ScenarioJson {
    const activeConfig = getActiveKeyboardConfigJson(
        configs,
        activeKeyboardConfigName
    )
    const activeScenario = activeConfig.scenarios.find(
        (scenario) => scenario.name === activeScenarioName
    )
    if (activeScenario === undefined) {
        return activeConfig.scenarios[0]
    }
    return activeScenario
}
export function getActiveSenarioFromJson(
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string,
    activeScenarioName: string
): Scenario {
    const activeConfig = parseJsonConfig(
        getActiveKeyboardConfigJson(configs, activeKeyboardConfigName)
    )
    const activeScenario = activeConfig.scenarios.find(
        (scenario) => scenario.name === activeScenarioName
    )
    if (activeScenario === undefined) {
        return activeConfig.scenarios[0]
    }
    return activeScenario
}

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
