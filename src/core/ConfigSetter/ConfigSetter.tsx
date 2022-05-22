import { type FC, Dispatch, SetStateAction } from 'react';
import { Scenario, Scenarios } from '../CoreTypes';
import styles from './ConfigSetter.module.scss';

interface ConfigSetterProps {
    scenarios: Scenarios;
    setConfig: Dispatch<SetStateAction<Scenarios>>;
    targetScenario: Scenario;
    setCurrentScenario: Dispatch<SetStateAction<Scenario>>;
    setHighlight: Dispatch<SetStateAction<Map<string, boolean>>>;
}

const ConfigSetter: FC<ConfigSetterProps> = (props) => {
    const { scenarios, setConfig, targetScenario, setCurrentScenario, setHighlight } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const scenariosNew = JSON.parse(e.target.value) as Scenarios;
            setConfig(scenariosNew);
            setCurrentScenario(scenariosNew[0]);
            setHighlight(new Map());
        } else {
            e.target.value = JSON.stringify(scenarios);
        }
    };

    const handleChangeScenarios = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const target = scenarios.find((it) => it.name === e.target.value);
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
                onChange={handleChangeScenarios}
            >
                {scenarios.map((it) => (
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
                defaultValue={JSON.stringify(scenarios)}
                onBlur={handleChange}
            />
        </div>
    );
};

export { ConfigSetter };
