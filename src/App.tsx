import { useEffect, useState } from 'react';
import Keyboard from './core/Keyboard';
import { KeyMapOverview } from './core/KeyMapOverview/KeyMapOverview';
import './App.css';
import { Scenario, Scenarios } from './core/CoreTypes';
import { ConfigSetter } from './core/ConfigSetter/ConfigSetter';
import Title from './core/Title/Title';
import { allScenarios, initScenarios } from './initConfig';

function App() {
    const [scenarios, setScenarios] = useState<Scenarios>(initScenarios);
    const [currentScenario, setCurrentScenario] = useState<Scenario>(allScenarios);
    const [highlightConfig, setHighlightConfig] = useState<Map<string, boolean>>(new Map());

    const initHighlight = () => {
        const newHighlightTable = new Map<string, boolean>();
        currentScenario.config.forEach((it) => newHighlightTable.set(it.keycode, true));
        setHighlightConfig(newHighlightTable);
    };

    const highLightSpecific = (keycode: string[]) => {
        window.scrollTo(0, 0);
        const newHighlightTable = new Map<string, boolean>();
        keycode.forEach((it) => newHighlightTable.set(it, true));
        setHighlightConfig(newHighlightTable);
    };

    useEffect(() => {
        const scenario = scenarios.find((it) => it.name === currentScenario.name);
        const config = scenario === undefined ? scenarios[0] : scenario;
        setCurrentScenario(config);
    }, [currentScenario, scenarios]);

    useEffect(initHighlight, [currentScenario]);

    return (
        <div className="App">
            <Title />
            <Keyboard config={currentScenario.config} highlightConfig={highlightConfig} />
            <ConfigSetter
                scenarios={scenarios}
                setConfig={setScenarios}
                currentScenario={currentScenario}
                setCurrentScenario={setCurrentScenario}
                setHighlight={setHighlightConfig}
            />
            <KeyMapOverview scenario={currentScenario} highlightFunction={highLightSpecific} />
        </div>
    );
}

export default App;
