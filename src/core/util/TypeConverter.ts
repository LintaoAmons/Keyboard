import { KeyMapItem, Modifier } from "../../generated_apis/Api";

class TypeConverter {
    static configListToMap = (configList: KeyMapItem[]) => {
        const out = new Map();
        configList.forEach((it) => out.set(it.keycode, it));
        return out;
    };

    static modifierEnumToKeycode = (modifier: Modifier) => {
        switch (modifier) {
            case Modifier.ALT:
                return 'alt';
            case Modifier.CMD:
                return 'cmd';
            case Modifier.CTRL:
                return 'ctrl';
            case Modifier.SHIFT:
                return 'shift';
            case Modifier.HYPER:
                return 'hyper';
            case Modifier.TAB:
                return 'tab';
            default:
                return '';
        }
    };
}

export { TypeConverter };
