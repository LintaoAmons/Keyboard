import { createContext } from "react"

const defaultConfig: KeyboardConfig = {
    name: 'Default',
    version: '0.1',
    scenarios: [{
        name: 'Default',
        KeymapItems: [
            {
                keycode: 'a',
                description: 'Press a',
                achieveBy: 'a'
            },]
    }]
}


export class Config {
    keyboardConfig: KeyboardConfig
    activeScenario: Scenario
    highlightedItem: KeyMapItem

    private static instance: Config = new Config(defaultConfig)

    private constructor(config: KeyboardConfig) {
        this.keyboardConfig = config
        this.activeScenario = config.scenarios[0]
        this.highlightedItem = config.scenarios[0].KeymapItems[0]
    }

    static getConfig(): Config {
        if (!Config.instance.keyboardConfig) {
            Config.instance = new Config(defaultConfig)
        }
        return Config.instance
    }

    static setConfig(config: KeyboardConfig): Config {
        Config.instance = new Config(config)
        return Config.instance
    }

}

export interface KeyboardConfig {
    name: string
    version?: string
    scenarios: Scenario[]
}

export interface Scenario {
    name: string
    KeymapItems: KeyMapItem[]
}

export interface KeyMapItem {
    keycode: string
    modifiers?: Modifier[]
    description: string
    achieveBy?: string
}

export enum Modifier {
    CMD = 'CMD',
    CTRL = 'CTRL',
    SHIFT = 'SHIFT',
    ALT = 'ALT',
    TAB = 'TAB',
    HYPER = 'HYPER',
}

export const ConfigContext = createContext(Config.getConfig());
