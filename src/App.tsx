import React, {useEffect, useState} from 'react';
import {Keyboard} from './core/Keyboard'
import {KeyMapOverview} from './core/KeyMapOverview/KeyMapOverview';
import './App.css';
import {ScenarioConfig, Scenarios} from "./core/CoreTypes";
import {ConfigSetter} from "./core/ConfigSetter/ConfigSetter";
import {Title} from "./core/Title/Title";
import {allScenarios, initScenarios} from "./initConfig";

function App() {
    const [scenarios, setScenarios] = useState<Scenarios>(initScenarios)
    const [currentScenario, setCurrentScenario] = useState<string>("AllScenarios")
    const [currentConfig, setCurrentConfig] = useState<ScenarioConfig>(allScenarios)
    const [highlightConfig, setHighlightConfig] = useState<Map<string, boolean>>(new Map())

    const initHighlight = () => {
        const newHighlightTable = new Map<string, boolean>();
        currentConfig.forEach(it => newHighlightTable.set(it.keycode, true))
        setHighlightConfig(newHighlightTable)
    }

    const highLightSpecific = (keycode: string[]) => {
        window.scrollTo(0, 0)
        const newHighlightTable = new Map<string, boolean>();
        keycode.forEach(it => newHighlightTable.set(it, true))
        setHighlightConfig(newHighlightTable)
    }

    useEffect(() => {
        const scenario = scenarios.find(it => it.name === currentScenario);
        const config = scenario === undefined ? scenarios[0].config : scenario.config;
        setCurrentConfig(config)
    }, [currentScenario, scenarios])

    useEffect(initHighlight, [currentConfig])

    return (
        <div className="App">
            <Title/>
            <Keyboard config={currentConfig} highlightConfig={highlightConfig}/>
            <ConfigSetter currentConfig={scenarios} setConfig={setScenarios} currentScenario={currentScenario}
                          setCurrentScenario={setCurrentScenario}/>
            <KeyMapOverview config={currentConfig} highlightFunction={highLightSpecific}/>
        </div>
    );
}

export default App;
