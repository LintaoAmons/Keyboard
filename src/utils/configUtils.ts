import { KeyboardConfigJson, KeyboardConfig, Scenario, ScenarioJson } from '../Config';
import { parseJsonConfig } from '../configParser';

export const getActiveKeyboardConfigJson = (
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string
): KeyboardConfigJson => {
    const activeConfig = configs.find(
        (config) => config.name === activeKeyboardConfigName
    );
    return activeConfig ?? configs[0];
};

export const getActiveKeyboardConfig = (
    configs: KeyboardConfig[],
    activeKeyboardConfigName: string
): KeyboardConfig => {
    const activeConfig = configs.find(
        (config) => config.name === activeKeyboardConfigName
    );
    return activeConfig ?? configs[0];
};

export const getActiveKeyboardConfigFromJson = (
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string
): KeyboardConfig => {
    const activeConfig = getActiveKeyboardConfigJson(configs, activeKeyboardConfigName);
    return parseJsonConfig(activeConfig);
};

export const getActiveScenario = (
    configs: KeyboardConfig[],
    activeKeyboardConfigName: string,
    activeScenarioName: string
): Scenario => {
    const activeConfig = getActiveKeyboardConfig(configs, activeKeyboardConfigName);
    const activeScenario = activeConfig.scenarios.find(
        (scenario) => scenario.name === activeScenarioName
    );
    return activeScenario ?? activeConfig.scenarios[0];
};

export const getActiveScenarioJson = (
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string,
    activeScenarioName: string
): ScenarioJson => {
    const activeConfig = getActiveKeyboardConfigJson(configs, activeKeyboardConfigName);
    const activeScenario = activeConfig.scenarios.find(
        (scenario) => scenario.name === activeScenarioName
    );
    return activeScenario ?? activeConfig.scenarios[0];
};

export const getActiveScenarioFromJson = (
    configs: KeyboardConfigJson[],
    activeKeyboardConfigName: string,
    activeScenarioName: string
): Scenario => {
    const activeConfig = parseJsonConfig(
        getActiveKeyboardConfigJson(configs, activeKeyboardConfigName)
    );
    const activeScenario = activeConfig.scenarios.find(
        (scenario) => scenario.name === activeScenarioName
    );
    return activeScenario ?? activeConfig.scenarios[0];
};