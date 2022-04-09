import {KeyMapConfig, KeyMapItem} from "./CoreTypes";
import React, {Dispatch, SetStateAction, useState} from "react";
import styles from "./Keyboard.module.scss";
import {Simulate} from "react-dom/test-utils";
import contextMenu = Simulate.contextMenu;
import {initState} from "../App";

interface ConfigSetterProps {
    config: KeyMapConfig,
    setConfig: Dispatch<SetStateAction<KeyMapConfig>>,
}

const ConfigSetter: React.FC<ConfigSetterProps> = props => {
    const initList = new Array<KeyMapItem>();
    // @ts-ignore
    for (let value of initState.values()) {
        initList.push(value)
    }

    const [keyMapItemList, setKeyMapItemList] = useState<KeyMapItem[]>(initList)

    const handleChange = (e: any) => {
        const configList = JSON.parse(e.target.value) as Array<KeyMapItem>
        setKeyMapItemList(configList)
        const newConfig = new Map<String, KeyMapItem>()
        for (let keyMapItem of configList) {
            newConfig.set(keyMapItem.keycode, keyMapItem)
        }
        props.setConfig(newConfig)
    }

    return (<div>
        <input className={styles.config}
               type="text" name="config" id="config"
               defaultValue={JSON.stringify(keyMapItemList)}
               onBlur={handleChange}/>
    </div>)
}

export {ConfigSetter};