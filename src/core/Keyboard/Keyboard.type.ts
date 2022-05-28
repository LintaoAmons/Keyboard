import { KeyMapItem } from "../../generated_apis/Api";
import {ButtonSize} from "./OneButton/OneButton";

export interface KeyboardItem {
    keycode: string;
    size?: ButtonSize;
    hideButton?: boolean;
    showHighlight?: boolean;
}

export type ConfigMap = Map<string, KeyMapItem>;
