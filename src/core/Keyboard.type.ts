import type { ReactNode } from 'react';
import type { KeyMapItem } from './CoreTypes';

export interface KeyboardItem {
    keycode: ReactNode;
    size?: number;
    hideButton?: boolean;
    showHighlight?: boolean;
}

export type ConfigMap = Map<string, KeyMapItem>;
