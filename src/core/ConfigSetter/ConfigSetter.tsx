import {KeyMapConfig, KeyMapItem} from "../CoreTypes";
import React, {Dispatch, SetStateAction} from "react";
import styles from "./ConfigSetter.module.scss";
import {initState} from "../../App";
import {TypeConverter} from "../util/TypeConverter";

interface ConfigSetterProps {
    setConfig: Dispatch<SetStateAction<KeyMapConfig>>,
}

const ConfigSetter: React.FC<ConfigSetterProps> = props => {

    const handleChange = (e: any) => {
        const configList = JSON.parse(e.target.value) as Array<KeyMapItem>
        props.setConfig(TypeConverter.configListToMap(configList))
    }

    return (
        <div>
            <h2>Config</h2>
            <input className={styles.config}
                   type="text" name="config" id="config"
                   defaultValue={JSON.stringify(TypeConverter.configMapToList(initState))}
                   onBlur={handleChange}/>
        </div>)
}

export {ConfigSetter};