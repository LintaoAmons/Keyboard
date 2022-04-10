import {KeyMapConfig, KeyMapItem} from "../CoreTypes";


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

}


export {TypeConverter}