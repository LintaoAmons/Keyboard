export type Scenarios = Scenario[]

export interface Scenario {
    name: string;
    config: ScenarioConfig;
}

export type ScenarioConfig  = KeyMapItem[]

export interface KeyMapItem {
    keycode: string;
    modifiers?: Modifier[];
    description: string;
}

export enum Modifier {
    CMD = "CMD",
    CTRL = "CTRL",
    SHIFT = "SHIFT",
    ALT = "ALT",
    TAB = "TAB",
    HYPER = "HYPER"
}
