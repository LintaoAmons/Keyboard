import {KeyMapConfig, KeyMapItem} from "./CoreTypes";
import React, {Dispatch, SetStateAction} from "react";
import styles from "./Keyboard.module.scss";
import {initState} from "../App";

interface ConfigSetterProps {
    setConfig: Dispatch<SetStateAction<KeyMapConfig>>,
}

const ConfigSetter: React.FC<ConfigSetterProps> = props => {
    const initList = new Array<KeyMapItem>();
    // @ts-ignore
    for (let value of initState.values()) {
        initList.push(value)
    }

    const handleChange = (e: any) => {
        const configList = JSON.parse(e.target.value) as Array<KeyMapItem>
        const newConfig = new Map<String, KeyMapItem>()
        for (let keyMapItem of configList) {
            newConfig.set(keyMapItem.keycode, keyMapItem)
        }
        props.setConfig(newConfig)
    }

    return (
        <div>
            <h2>Config</h2>
            <input className={styles.config}
                   type="text" name="config" id="config"
                   defaultValue={JSON.stringify(initList)}
                   onBlur={handleChange}/>
        </div>)
}

export {ConfigSetter};