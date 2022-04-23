import {Scenario, Scenarios} from "../CoreTypes";
import React, {Dispatch, SetStateAction} from "react";
import styles from "./ConfigSetter.module.scss";

interface ConfigSetterProps {
    scenarios: Scenarios;
    setConfig: Dispatch<SetStateAction<Scenarios>>;
    currentScenario: Scenario;
    setCurrentScenario: Dispatch<SetStateAction<Scenario>>
    setHighlight: Dispatch<SetStateAction<Map<string, boolean>>>
}

const ConfigSetter: React.FC<ConfigSetterProps> = props => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const scenarios = JSON.parse(e.target.value) as Scenarios
            props.setConfig(scenarios)
            props.setCurrentScenario(scenarios[0])
            props.setHighlight(new Map())
        } else {
            e.target.value = JSON.stringify(props.scenarios);
        }
    }

    const handleChangeScenarios = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setCurrentScenario(props.scenarios.find(it => it.name === e.target.value)!!)
    }

    return (
        <div>
            <h2>Config</h2>
            <label htmlFor="scenarios">Choose Scenario: </label>
            <select value={props.currentScenario.name} name="scenarios" id="scenarios" onChange={handleChangeScenarios}>
                {props.scenarios.map(it =>
                    <option value={it.name} key={`scenario-${it.name}`}>{it.name}</option>)}
            </select>
            <input className={styles.config}
                   type="text"
                   name="config"
                   id="config"
                   defaultValue={JSON.stringify(props.scenarios)}
                   onBlur={handleChange}/>
        </div>)
}

export {ConfigSetter};