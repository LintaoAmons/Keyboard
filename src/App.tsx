import { useEffect, useMemo, useState } from 'react';
import Keyboard from './core/Keyboard/Keyboard';
import { KeyMapOverview } from './core/KeyMapOverview/KeyMapOverview';
import './App.css';
import { Scenario, Scenarios } from './core/CoreTypes';
import { ConfigSetter } from './core/ConfigSetter/ConfigSetter';
import Title from './core/Title/Title';
import { initScenarios } from './initConfig';
import { Api } from './generated_apis/Api';

function App() {
    const [scenarios, setScenarios] = useState<Scenarios>(initScenarios);
    const [currentScenario, setCurrentScenario] = useState<Scenario>(initScenarios[0]);
    const [highlightConfig, setHighlightConfig] = useState<Map<string, boolean>>(new Map());
    const targetScenario = useMemo(() => {
        const scenario = scenarios.find((it) => it.name === currentScenario.name);
        return scenario === undefined ? scenarios[0] : scenario;
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

    const testApi = () => {
        const api = new Api();
        api.keyboardConfig.getById(1);
    };

    useEffect(initHighlight, [targetScenario]);

    return (
        <div className="App">
            <Title />
            <Keyboard config={targetScenario.config} highlightConfig={highlightConfig} />
            <button onClick={testApi}>Test api</button>
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
