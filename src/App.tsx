import { useEffect, useState, useMemo } from 'react';
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
    const targetScenario = useMemo(() => {
        const scenario = scenarios.find((it) => it.name === currentScenario.name);
        const target = scenario === undefined ? scenarios[0] : scenario;
        return target;
    }, [scenarios, currentScenario]);

    const initHighlight = () => {
        const newHighlightTable = new Map<string, boolean>();
        targetScenario.config.forEach((it) => newHighlightTable.set(it.keycode, true));
        setHighlightConfig(newHighlightTable);
    };

    const highLightSpecific = (keycode: string[]) => {
        window.scrollTo(0, 0);
        const newHighlightTable = new Map<string, boolean>();
        keycode.forEach((it) => newHighlightTable.set(it, true));
        setHighlightConfig(newHighlightTable);
    };

    useEffect(initHighlight, [targetScenario]);

    return (
        <div className="App">
            <Title />
            <Keyboard config={targetScenario.config} highlightConfig={highlightConfig} />
            <ConfigSetter
                scenarios={scenarios}
                setConfig={setScenarios}
                targetScenario={targetScenario}
                setCurrentScenario={setCurrentScenario}
                setHighlight={setHighlightConfig}
            />
            <KeyMapOverview scenario={targetScenario} highlightFunction={highLightSpecific} />
        </div>
    );
}

export default App;
