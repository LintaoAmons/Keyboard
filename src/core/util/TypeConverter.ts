import {KeyMapConfig, KeyMapItem, Modifier} from "../CoreTypes";


class TypeConverter {
    static configMapToList = (configMap: KeyMapConfig) => {
        const out = new Array<KeyMapItem>();
        Array.from(configMap.values())
            .forEach(it => out.push(it))
        return out
    }

    static configListToMap = (configList: KeyMapItem[]) => {
        const out = new Map()
        configList.forEach(it => out.set(it.keycode, it))
        return out
    }

    static modifierEnumToKeycode = (modifier: Modifier) => {
        switch (modifier) {
            case Modifier.ALT:
                return "alt"
            case Modifier.CMD:
                return 'cmd'
            case Modifier.CTRL:
                return 'ctrl'
            case Modifier.SHIFT:
                return 'shift'
            case Modifier.HYPER:
                return 'hyper'
        }
    }
}


export {TypeConverter}