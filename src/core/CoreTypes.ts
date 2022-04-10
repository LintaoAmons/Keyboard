export type KeyMapConfig = Map<String, KeyMapItem>

export interface KeyMapItem {
    keycode: string;
    modifiers?: Modifier[];
    description: string;
    scenario?: string[];
}

export enum Modifier {
    CMD,
    CTRL,
    SHIFT,
    ALT,
}
