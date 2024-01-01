import React from "react";
import { createContext, useState } from "react";
import { Config } from "./Config";
import ConfigSetter from "./ConfigSetter";
import Keyboard from "./Keyboard";
import KeymapOverview from "./KeymapOverview";

// Get initial config implementation
const initialConfig = Config.getConfig();

// Define the shape of your context
interface ConfigContextType {
  config: typeof initialConfig;
  profile: string;
  setConfig: React.Dispatch<React.SetStateAction<typeof initialConfig>>;
}

// Create the context with a default value
export const ConfigContext = createContext<ConfigContextType>({
  config: initialConfig,
  profile: "Default",
  // Provide a placeholder function for setConfig
  setConfig: () => { },
});

export default function App(): JSX.Element {
  const [config, setConfig] = useState(Config.getConfig())
  const value = { config, profile: "Default", setConfig }

  return (
    <ConfigContext.Provider value={value}>
      <div className="flex flex-row h-screen">

        <div className="border-r border-solid border-2">
          <ConfigSetter />
        </div>

        <div className="w-10/12 flex flex-col items-center p-4">
          <h1 className='text-4xl'>Lintao's Keyboard</h1>
          <Keyboard />
          <KeymapOverview />

        </div>
      </div>
    </ConfigContext.Provider>
  );
}
