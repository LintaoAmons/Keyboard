import { useContext, useEffect, useState } from "react"
import { TERipple, TESelect, TETextarea } from "tw-elements-react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";
import { ConfigContext } from "./App";
import { parseJsonConfig } from "./configParser";
import JsonView from "@uiw/react-json-view";
import configJsons from "./configs/configs"

export default function ConfigSetter(): JSX.Element {

    const { configs, setConfigs, activeKeyboardConfigName, activeScenarioName, setActiveScenarioName, setActiveKeyboardConfigName } = useContext(ConfigContext);
    const [currentConfigJsonString, setCurrentConfigJsonString] = useState(JSON.stringify(configJsons[0]));
    const configOptions = configs.map((config) => {
        return {
            text: config.name,
            value: config.name
        }
    })
    const scenarioOptions = configs.filter(it => it.name === activeKeyboardConfigName)
        .flatMap(keyboardConfig => keyboardConfig.scenarios)
        .map((senario) => {
            return { text: senario.name, value: senario.name }
        })

    const handleProfileOptionSelect = (data: SelectData) => {
        setActiveKeyboardConfigName((_) => data.value as string)
    }

    const handleScenarioOptionSelect = (data: SelectData) => {
        setActiveScenarioName((_) => data.value as string)
    }

    const copyConfigToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentConfigJsonString);
            alert('Config copied to clipboard! You can modify it then load the config again');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const loadConfig = () => {
        try {
            const userInput = window.prompt("Please copy your configuration:");
            if (userInput) {
                const newConfig = parseJsonConfig(JSON.parse(userInput))
                setConfigs((prevConfigs) => {
                    // Check if the item already exists
                    const existingItemIndex = prevConfigs.findIndex(config => config.name === newConfig.name);

                    if (existingItemIndex >= 0) {
                        // Item found - replace it
                        return prevConfigs.map((config, index) =>
                            index === existingItemIndex ? newConfig : config
                        );
                    } else {
                        // Item not found - push it
                        return [...prevConfigs, newConfig];
                    }

                });
                setActiveKeyboardConfigName(newConfig.name)
                setActiveScenarioName(newConfig.scenarios[0].name)
                setCurrentConfigJsonString(() => userInput)
            }
        } catch (error) {
            alert("Unable to parse your config, please check the format")
        }
    }

    return (
        <div className="flex flex-col px-3 h-screen" >
            <h2 className="text-4xl m-3 self-center">Config</h2>

            <label htmlFor="profiles" className="flex w-full items-baseline mx-3">
                <div className="flex justify-center">
                    <div className="relative mb-3 md:w-96 pt-5">
                        <TESelect
                            data={configOptions}
                            label="Select Profiles"
                            onOptionSelect={handleProfileOptionSelect}
                            value={activeKeyboardConfigName}
                        />
                    </div>
                </div>
            </label>

            <label htmlFor="scenarios" className="flex w-full items-baseline mx-3">
                <div className="flex justify-center">
                    <div className="relative mb-3 md:w-96 pt-5">
                        <TESelect
                            data={scenarioOptions}
                            label="Select Scenario"
                            onOptionSelect={handleScenarioOptionSelect}
                            value={activeScenarioName}
                        />
                    </div>
                </div>
            </label>

            <div className="inline-flex" role="group">
                <TERipple rippleColor="light">
                    <button
                        type="button"
                        className="inline-block rounded-l border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        onClick={copyConfigToClipboard}
                    >
                        Copy config
                    </button>
                </TERipple>
                <TERipple rippleColor="light">
                    <button
                        type="button"
                        className="-ml-0.5 inline-block rounded-r border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        onClick={loadConfig}
                    >
                        Load config
                    </button>
                </TERipple>
                <TERipple rippleColor="light">
                    <button
                        type="button"
                        className="-ml-0.5 inline-block rounded-r border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        onClick={() => { alert("还没做") }}
                    >
                        Add Scenario
                    </button>
                </TERipple>
            </div>

            <div className="flex justify-center mt-5">
                <div className="relative mb-3 xl:w-96">
                    <JsonView value={JSON.parse(currentConfigJsonString)} displayDataTypes={false} collapsed={3} enableClipboard={false} />
                </div>
            </div>
        </div>
    )
}
