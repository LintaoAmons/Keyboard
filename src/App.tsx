import React from "react";
import { createContext, useState } from "react";
import { KeyboardConfig, KeyMapItem } from "./Config";
import ConfigSetter from "./ConfigSetter";
import Keyboard from "./Keyboard";
import KeymapOverview from "./KeymapOverview";
import configJsonList from "./configs/configs";
import { convertConfigs } from "./configParser";


// Define the shape of your context
interface ConfigContextType {
    configs: KeyboardConfig[];
    setConfigs: React.Dispatch<React.SetStateAction<KeyboardConfig[]>>,
    activeKeyboardConfigName: string;
    setActiveKeyboardConfigName: React.Dispatch<React.SetStateAction<string>>;
    activeScenarioName: string;
    setActiveScenarioName: React.Dispatch<React.SetStateAction<string>>;
    highlightedItem: KeyMapItem;
    setHighlightedItem: React.Dispatch<React.SetStateAction<KeyMapItem>>;
}

// Create the context with a default value
const initConfigs: KeyboardConfig[] = convertConfigs(configJsonList)
const defaultConfig = initConfigs[0]
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
    const [highlightedItem, setHighlightedItem] = useState(defaultConfig.scenarios[0].KeymapItems[0])

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

                <div className="border-r border-solid border-2">
                    <ConfigSetter />
                </div>

                <div className="w-10/12 flex flex-col items-center p-4">
                    <h1 className='text-4xl my-3'>{activeKeyboardConfigName}</h1>
                    <Keyboard />
                    <KeymapOverview />

                </div>
            </div>
        </ConfigContext.Provider>
    );
}
