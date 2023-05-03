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
            <h2 className="text-4xl m-3 self-center">Config</h2>

            <label
                className="block ml-3 text-sm font-medium"
                htmlFor="scenarios"
                id="scenarios-label">
                Choose Scenario:{' '}
            </label>
            <select
                className="mb-3 mx-3 border text-sm rounded-lg block w-full p-2.5"
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
                className="block mx-3 w-full h-screen text-sm rounded-lg border"
                placeholder="Paste your config here."
                defaultValue={JSON.stringify(keyboardConfig)} // TODO: beautify json
                onBlur={handleChange}
            />
        </div>
    );
};

export { ConfigSetter };
