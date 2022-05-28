import { type FC, Dispatch, SetStateAction } from 'react';
import { Api, KeyboardConfig, Scenario } from '../../generated_apis/Api';
import styles from './ConfigSetter.module.scss';

interface ConfigSetterProps {
    scenarios: Scenario[];
    setConfig: Dispatch<SetStateAction<Scenario[]>>;
    targetScenario: Scenario;
    setCurrentScenario: Dispatch<SetStateAction<Scenario>>;
    setHighlight: Dispatch<SetStateAction<Map<string, boolean>>>;
}

const ConfigSetter: FC<ConfigSetterProps> = (props) => {
    const { scenarios, setConfig, targetScenario, setCurrentScenario, setHighlight } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const scenariosNew = JSON.parse(e.target.value) as Scenario[];
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

    const loadData = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fetchData = async () => {
            const response = await new Api().keyboardConfig.getById(parseInt(e.target.value, 2));
            const data = (await response.json()) as KeyboardConfig;
            setConfig(data.scenarios);
        };

        fetchData();
    };

    return (
        <div>
            <h2>Config</h2>

            <div>
                <label htmlFor="load-config">
                    {' '}
                    LoadConfig:
                    <input
                        type="text"
                        name="load-config"
                        id="load-config"
                        defaultValue="1"
                        onBlur={loadData}
                    />
                </label>

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
            </div>

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
