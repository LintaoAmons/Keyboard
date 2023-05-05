import { type FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Scenario, KeyboardConfig, KeyMapItem } from '../CoreTypes';
import { KeybindingModal } from './KeybindingModal';

interface ConfigSetterProps {
    profiles: KeyboardConfig[];
    keyboardConfig: KeyboardConfig;
    setConfig: Dispatch<SetStateAction<KeyboardConfig>>;
    targetScenario: Scenario;
    setCurrentScenario: Dispatch<SetStateAction<Scenario>>;
    setHighlight: Dispatch<SetStateAction<Map<string, boolean>>>;
}

const ConfigSetter: FC<ConfigSetterProps> = (props) => {
    const {
        profiles,
        keyboardConfig,
        setConfig,
        targetScenario,
        setCurrentScenario,
        setHighlight,
    } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Are you sure you want to leave? Unsaved changes may be lost.';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const addKeybindingToCurrentScenario = (newKeybinding: KeyMapItem) => {
        setCurrentScenario((prevScenario) => {
            const updatedScenario = {
                ...prevScenario,
                config: [...prevScenario.config, newKeybinding],
            };

            setConfig((prevConfig) => {
                const updatedScenarios = prevConfig.scenarios.map((scenario) =>
                    scenario.name === updatedScenario.name ? updatedScenario : scenario
                );

                return {
                    ...prevConfig,
                    scenarios: updatedScenarios,
                };
            });

            return updatedScenario;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value) {
            const scenariosNew = JSON.parse(e.target.value) as KeyboardConfig;
            setConfig(scenariosNew);
            setCurrentScenario(scenariosNew.scenarios[0]);
            setHighlight(new Map());
        } else {
            e.target.value = JSON.stringify(keyboardConfig);
        }
    };

    const handleAddScenario = () => {
        // Popup a window to ask user to input a name
        const newScenarioName = prompt('Enter a new scenario name:', '');

        if (newScenarioName && newScenarioName.trim() !== '') {
            // Check if newScenarioName already exists in the current config
            const scenarioExists = keyboardConfig.scenarios.some(
                (scenario) => scenario.name === newScenarioName
            );

            if (scenarioExists) {
                alert('A scenario with this name already exists. Please choose a different name.');
            } else {
                // Add a new scenario with the name
                const newScenario: Scenario = {
                    name: newScenarioName,
                    config: [],
                };

                // Call setConfig to update the keyboardConfig
                setConfig((prevState) => ({
                    ...prevState,
                    scenarios: [...prevState.scenarios, newScenario],
                }));

                // Call setCurrentScenario to set the newly created scenario
                setCurrentScenario(newScenario);
            }
        }
    };

    const handleChangeScenarios = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const target = keyboardConfig.scenarios.find((it) => it.name === e.target.value);
        if (target) {
            setCurrentScenario(target);
        }
    };

    const handleDownloadConfig = () => {
        // Convert keyboardConfig to JSON string
        const configJson = JSON.stringify(keyboardConfig, null, 2);

        // Create a Blob object with the JSON string as its content
        const configBlob = new Blob([configJson], { type: 'application/json' });

        // Create a blob URL for the Blob object
        const url = URL.createObjectURL(configBlob);

        // Create a temporary download link, click it programmatically, and remove it
        const link = document.createElement('a');
        link.href = url;
        link.download = `keyboard-config-${keyboardConfig.name}-${keyboardConfig.version}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the blob URL
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col items-start ">
            <h2 className="text-4xl m-3 self-center">Config</h2>

            <label htmlFor="profiles" className="flex w-full items-baseline mx-3">
                Profiles
                <select
                    className="mb-3 mx-3 border text-sm rounded-lg block w-full p-2.5"
                    value={keyboardConfig.name}
                    name="profiles"
                    id="profiles"
                    onChange={() => {
                        // TODO
                    }}>
                    {profiles.map((it) => (
                        <option value={it.name} key={`profile-${it.name}`}>
                            {it.name}
                        </option>
                    ))}
                </select>
            </label>

            <label htmlFor="scenarios" className="flex w-full items-baseline mx-3">
                Scenarios
                <select
                    className=" mb-3 mx-3 border text-sm rounded-lg block w-full p-2.5"
                    value={targetScenario.name}
                    name="scenarios"
                    id="scenarios"
                    onChange={handleChangeScenarios}>
                    {keyboardConfig.scenarios.map((it) => (
                        <option value={it.name} key={`scenario-${it.name}`}>
                            {it.name}
                        </option>
                    ))}
                </select>
            </label>

            <div className="flex flex-col w-full mx-3 ">
                <div className="flex justify-around mb-2 w-full">
                    <button
                        className="basis-1/2 border-2 px-2 hover:bg-black hover:text-white"
                        onClick={handleAddScenario}>
                        Add Scenario
                    </button>
                    <button
                        className="basis-1/2 border-2 px-2 hover:bg-black hover:text-white"
                        onClick={() => setIsModalVisible(true)}>
                        Add Keybinding
                    </button>
                </div>
                <div className="flex mb-2 w-full">
                    <button
                        className="grow border-2 px-2 hover:bg-black hover:text-white"
                        onClick={handleDownloadConfig}>
                        Download config
                    </button>
                </div>
            </div>

            <textarea
                id="config"
                name="config"
                className="block mx-3 w-full h-screen text-sm rounded-lg border mb-10"
                placeholder="Paste your config here."
                value={JSON.stringify(keyboardConfig, null, 2)}
                onBlur={handleChange}
            />

            <KeybindingModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={(newKeybinding) => {
                    addKeybindingToCurrentScenario(newKeybinding);
                    setIsModalVisible(false);
                }}
            />
        </div>
    );
};

export { ConfigSetter };
