import { type FC, Dispatch, SetStateAction } from 'react';
import { Scenario, KeyboardConfig } from '../CoreTypes';

interface ConfigSetterProps {
    keyboardConfig: KeyboardConfig;
    setConfig: Dispatch<SetStateAction<KeyboardConfig>>;
    targetScenario: Scenario;
    setCurrentScenario: Dispatch<SetStateAction<Scenario>>;
    setHighlight: Dispatch<SetStateAction<Map<string, boolean>>>;
}

const ConfigSetter: FC<ConfigSetterProps> = (props) => {
    const { keyboardConfig, setConfig, targetScenario, setCurrentScenario, setHighlight } = props;
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

    const handleChangeScenarios = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const target = keyboardConfig.scenarios.find((it) => it.name === e.target.value);
        if (target) {
            setCurrentScenario(target);
        }
    };

    return (
        <div className="flex flex-col items-start ">
            <h2 className="text-5xl mx-3 self-center">Config</h2>

            <label
                className="block m-3 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="scenarios"
                id="scenarios">
                Choose Scenario:{' '}
            </label>
            <select
                className="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            <textarea
                id="config"
                name="config"
                className="block mx-3 w-full h-screen text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Paste your config here."
                defaultValue={JSON.stringify(keyboardConfig)} // TODO: beautify json
                onBlur={handleChange}
            />
        </div>
    );
};

export { ConfigSetter };
