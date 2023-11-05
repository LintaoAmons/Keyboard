import { useState } from "react";
import { Config, ConfigContext } from "./Config";
import ConfigSetter from "./ConfigSetter";
import Keyboard from "./Keyboard";
import KeymapOverview from "./KeymapOverview";

export default function App(): JSX.Element {
    const [ config, setConfig ] = useState(Config.getConfig())
    const value = {config, profile: "Default",setConfig}

    return (
        <ConfigContext.Provider value={value}>
            <div className="flex flex-row h-screen">

                <div className="border-r border-solid border-2 pr-5">
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
