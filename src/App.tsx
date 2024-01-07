import React from "react";
import { createContext, useState } from "react";
import { KeyboardConfig, KeyboardConfigJson, KeyMapItem } from "./Config";
import ConfigSetter from "./ConfigSetter";
import Keyboard from "./Keyboard";
import KeymapOverview from "./KeymapOverview";
import configJsonList from "./configs/configs";
import { convertConfigs, parseJsonConfig } from "./configParser";


// Define the shape of your context
interface ConfigContextType {
    configs: KeyboardConfigJson[];
    setConfigs: React.Dispatch<React.SetStateAction<KeyboardConfigJson[]>>,
    activeKeyboardConfigName: string;
    setActiveKeyboardConfigName: React.Dispatch<React.SetStateAction<string>>;
    activeScenarioName: string;
    setActiveScenarioName: React.Dispatch<React.SetStateAction<string>>;
    highlightedItem: KeyMapItem;
    setHighlightedItem: React.Dispatch<React.SetStateAction<KeyMapItem>>;
}

// Create the context with a default value
const initConfigs: KeyboardConfigJson[] = configJsonList
const defaultConfig = initConfigs[0]
const parsedConfig = parseJsonConfig(defaultConfig)
export const ConfigContext: React.Context<ConfigContextType> = createContext<ConfigContextType>({
    configs: initConfigs,
    setConfigs: () => { },
    activeKeyboardConfigName: "",
    setActiveKeyboardConfigName: () => { },
    activeScenarioName: "",
    setActiveScenarioName: () => { },
    highlightedItem: {} as KeyMapItem,
    setHighlightedItem: () => { }
});


export default function App(): JSX.Element {
    const [configs, setConfigs] = useState(initConfigs)
    const [activeKeyboardConfigName, setActiveKeyboardConfigName] = useState(defaultConfig.name)
    const [activeScenarioName, setActiveScenarioName] = useState(defaultConfig.scenarios[0].name)
    const [highlightedItem, setHighlightedItem] = useState(parsedConfig.scenarios[0].KeymapItems[0])

    const value = {
        configs,
        setConfigs,
        activeKeyboardConfigName,
        setActiveKeyboardConfigName,
        activeScenarioName,
        setActiveScenarioName,
        highlightedItem,
        setHighlightedItem,
    }

    return (
        <ConfigContext.Provider value={value}>
            <div className="flex flex-row h-screen">

                <div className="border-r border-solid border-2 md:block hidden">
                    <ConfigSetter />
                </div>

                <div className="w-full md:w-10/12 flex flex-col items-center p-4">
                    <h1 className='text-4xl my-3'>{activeKeyboardConfigName}</h1>


                    <a
                        href="https://github.com/LintaoAmons/Keyboard/"
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >Create a PR to share your keybindings | 提交一个 PR 来分享你的快捷键</a>

                    <div className="md:hidden">
                        <ConfigSetter />
                    </div>

                    <Keyboard />
                    <KeymapOverview />

                </div>
            </div>
        </ConfigContext.Provider>
    );
}
