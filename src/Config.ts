import defaultConfigJson from "./configs/default.json"
import { parseJsonConfig } from "./configParser"


export enum Modifier {
    CMD = 'CMD',
    CTRL = 'CTRL',
    SHIFT = 'SHIFT',
    ALT = 'ALT',
    TAB = 'TAB',
    HYPER = 'HYPER',
}

export function isModifier(keycode: string): boolean {
    return Object.values(Modifier).map(v => v.toLowerCase()).includes(keycode.toLowerCase() as string)
}

export function findActiveSenario(config: KeyboardConfig, scenarioName: string | undefined): Scenario | undefined {
    if (scenarioName == undefined) {
        return undefined
    }
    return config.scenarios.find(it => it.name == scenarioName)
}


export class Config {
    keyboardConfig: KeyboardConfig
    activeScenario: Scenario
    highlightedItem: KeyMapItem

    private static instance: Config

    private constructor(config: KeyboardConfig) {
        this.keyboardConfig = config
        this.activeScenario = config.scenarios[0]
        this.highlightedItem = config.scenarios[0].KeymapItems[0]
    }

    static getConfig(): Config {
        if (!Config.instance) {
            Config.instance = new Config(parseJsonConfig(defaultConfigJson))
        }
        return Config.instance
    }

    static setConfig(config: KeyboardConfig): Config {
        Config.instance = new Config(config)
        return Config.instance
    }

}

export interface KeyboardLayout {
    name: string;
    layout: KeyboardKey[][];
}

export interface KeyboardLayoutJson {
    name: string;
    layout: string[][];
    // ["a,b,c,d,d,c", "\,,."]
}

export class KeyboardKey {
    keycode: string;
    size: number;
    tags: Map<string, string | boolean>;

    constructor(keycode: string = '', size: number = 2, tags: Map<string, string | boolean> = new Map()) {
        this.keycode = keycode;
        this.size = size;
        this.tags = tags;
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
    KeymapItems: KeyMapItem[] // TODO: List of String when json
}

export interface ScenarioJson {
    name: string
    keymapItems: string[]
}

export interface KeyMapItem { 
    // TODO: keybinding not nullable; description to nullable
    keybinding?: KeyStroke[]
    description: string
    achieveBy?: string
}

export interface KeyStroke {
    keycode: string
    modifiers?: Modifier[]
}
