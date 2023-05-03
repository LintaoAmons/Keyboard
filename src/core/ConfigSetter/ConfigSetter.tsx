import { type FC, Dispatch, SetStateAction } from 'react';
import { Scenario, KeyboardConfig } from '../CoreTypes';
import styles from './ConfigSetter.module.scss';

interface ConfigSetterProps {
    keyboardConfig: KeyboardConfig;
    setConfig: Dispatch<SetStateAction<KeyboardConfig>>;
    targetScenario: Scenario;
    setCurrentScenario: Dispatch<SetStateAction<Scenario>>;
    setHighlight: Dispatch<SetStateAction<Map<string, boolean>>>;
}

const ConfigSetter: FC<ConfigSetterProps> = (props) => {
    const { keyboardConfig, setConfig, targetScenario, setCurrentScenario, setHighlight } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div>
            <h2>Config</h2>
            <label htmlFor="scenarios" id="scenarios">
                Choose Scenario:{' '}
            </label>
            <select
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
            <input
                className={styles.config}
                type="text"
                name="config"
                id="config"
                defaultValue={JSON.stringify(keyboardConfig)}
                onBlur={handleChange}
            />
        </div>
    );
};

export { ConfigSetter };
