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

    const onDeleteKeybinding = (index: number) => {
        setCurrentScenario((prevScenario) => {
            const newConfig = prevScenario.config.filter((_, i) => i !== index);
            return {
                ...prevScenario,
                config: newConfig,
            };
        });

        setKeyboardConfig((prevConfig) => {
            const newScenarios = prevConfig.scenarios.map((scenario) => {
                if (scenario.name === currentScenario.name) {
                    return {
                        ...scenario,
                        config: currentScenario.config.filter((_, i) => i !== index),
                    };
                }
                return scenario;
            });

            return {
                ...prevConfig,
                scenarios: newScenarios,
            };
        });
    };

    return (
        <div className="flex flex-row">
            <div className="w-2/12 border-r border-solid border-2 pr-5">
                <ConfigSetter
                    keyboardConfig={keyboardConfig}
                    setConfig={setKeyboardConfig}
                    targetScenario={targetScenario}
                    setCurrentScenario={setCurrentScenario}
                    setHighlight={setHighlightConfig}
                />
            </div>
            <div className="w-10/12 flex flex-col items-center p-4">
                <Title />
                <Keyboard config={targetScenario.config} highlightConfig={highlightConfig} />
                <KeyMapOverview
                    scenario={targetScenario}
                    highlightFunction={highLightSpecific}
                    onDeleteKeybinding={onDeleteKeybinding}
                />
            </div>
        </div>
    );
}

export default App;
