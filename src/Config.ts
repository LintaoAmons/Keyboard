import { createContext } from "react"

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

export const defaultConfig: KeyboardConfig = {
    name: 'Default',
    version: '0.1',
    scenarios: [{
        name: 'Default',
        KeymapItems: [
            {
                keybinding: [
                    { keycode: 'b', modifiers: [Modifier.CMD, Modifier.CTRL] },
                    { keycode: 'c' }
                ],
                description: 'Press a',
                achieveBy: 'a'
            },
            {
                keybinding: [
                    { keycode: 'b', modifiers: [Modifier.CMD] },
                    { keycode: 'c' }
                ],
                description: 'Press a',
                achieveBy: 'a'
            },
            {
                keybinding: [{ keycode: 'a' }],
                description: 'Press b',
                achieveBy: 'b'
            }]
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
     setConfig: React.Dispatch<React.SetStateAction<Config>>}

export const ConfigContext = createContext({
    config: Config.getConfig(),
    setConfig: (config: Config) => { console.log(config) }
} as KeyboardContext);

