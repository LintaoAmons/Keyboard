import { createContext } from "react"
import defaultConfigJson from "./config.json"
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

export interface Scenario {
    name: string
    KeymapItems: KeyMapItem[]
}

export interface KeyMapItem {
    keybinding?: KeyStroke[]
    description: string
    achieveBy?: string
}

export interface KeyStroke {
    keycode: string
    modifiers?: Modifier[]
}

export interface KeyboardContext {
    config: Config
    profile: string
    setConfig: React.Dispatch<React.SetStateAction<Config>>
}

export const ConfigContext = createContext({
    config: Config.getConfig(),
    profile: "Default",
    setConfig: (config: Config) => { console.log(config) }
} as KeyboardContext);

