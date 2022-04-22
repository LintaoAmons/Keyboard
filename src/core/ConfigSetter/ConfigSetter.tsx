import {Scenarios} from "../CoreTypes";
import React, {Dispatch, SetStateAction} from "react";
import styles from "./ConfigSetter.module.scss";

interface ConfigSetterProps {
    currentConfig: Scenarios;
    setConfig: Dispatch<SetStateAction<Scenarios>>;
    currentScenario: string;
    setCurrentScenario: Dispatch<SetStateAction<string>>
}

const ConfigSetter: React.FC<ConfigSetterProps> = props => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const scenarios = JSON.parse(e.target.value) as Scenarios
        props.setConfig(scenarios)
    }

    const handleChangeScenarios = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setCurrentScenario(e.target.value)
    }

    return (
        <div>
            <h2>Config</h2>
            <label htmlFor="scenarios">Choose Scenario: </label>
            <select value={props.currentScenario} name="scenarios" id="scenarios" onChange={handleChangeScenarios}>
                {props.currentConfig.map(it => <option value={it.name}>{it.name}</option>)}
            </select>
            <input className={styles.config}
                   type="text"
                   name="config"
                   id="config"
                   defaultValue={JSON.stringify(props.currentConfig)}
                   onBlur={handleChange}/>
        </div>)
}

export {ConfigSetter};