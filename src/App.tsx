import { useEffect, useMemo, useState } from 'react';
import Keyboard from './core/Keyboard/Keyboard';
import { KeyMapOverview } from './core/KeyMapOverview/KeyMapOverview';
import './App.css';
import { Scenario, Api, Modifier, KeyboardConfig } from './generated_apis/Api';
import { ConfigSetter } from './core/ConfigSetter/ConfigSetter';
import Title from './core/Title/Title';

const initScenarios: Scenario[] = [
    {
        name: 'init',
        config: [
            {
                keycode: 'f',
                modifiers: [Modifier.CMD],
                description: '打开 firefox 浏览器',
                achieveBy: 'HammerSpoon',
            },
        ],
    },
];

function App() {
    const [scenarios, setScenarios] = useState<Scenario[]>(initScenarios);
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

    useEffect(() => {
        const fetchData = async () => {
            const response = await new Api().keyboardConfig.getById(1);
            const data = await response.json() as KeyboardConfig;
            setScenarios(data.scenarios);
        };

        fetchData().catch(console.error);
        initHighlight();
    }, []);
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
