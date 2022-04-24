import type { KeyMapItem } from '../CoreTypes';

export interface KeyboardItem {
    keycode: string;
    size?: number;
    hideButton?: boolean;
    showHighlight?: boolean;
}

export type ConfigMap = Map<string, KeyMapItem>;
