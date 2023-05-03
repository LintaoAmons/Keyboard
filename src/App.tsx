import { useEffect, useMemo, useState } from 'react';
import Keyboard from './core/Keyboard/Keyboard';
import { KeyMapOverview } from './core/KeyMapOverview/KeyMapOverview';
import { KeyboardConfig, Scenario } from './core/CoreTypes';
import { ConfigSetter } from './core/ConfigSetter/ConfigSetter';
import Title from './core/Title/Title';
import { initConfig } from './initConfig';

function App() {
    const [keyboardConfig, setKeyboardConfig] = useState<KeyboardConfig>(initConfig);
    const [currentScenario, setCurrentScenario] = useState<Scenario>(initConfig.scenarios[0]);
    const [highlightConfig, setHighlightConfig] = useState<Map<string, boolean>>(new Map());
    const targetScenario = useMemo(() => {
        const scenario = keyboardConfig.scenarios.find((it) => it.name === currentScenario.name);
        return scenario === undefined ? keyboardConfig.scenarios[0] : scenario;
    }, [keyboardConfig, currentScenario]);

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
        <div className="flex flex-row">
            <div className="w-72 border-r border-solid border-2 pr-5">
                <ConfigSetter
                    keyboardConfig={keyboardConfig}
                    setConfig={setKeyboardConfig}
                    targetScenario={targetScenario}
                    setCurrentScenario={setCurrentScenario}
                    setHighlight={setHighlightConfig}
                />
            </div>
            <div className="flex flex-col items-center justify-between p-4">
                <Title />
                <Keyboard config={targetScenario.config} highlightConfig={highlightConfig} />
                <KeyMapOverview scenario={targetScenario} highlightFunction={highLightSpecific} />
            </div>
        </div>
    );
}

export default App;
