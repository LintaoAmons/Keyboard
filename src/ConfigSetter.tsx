import { useContext, useEffect, useState } from "react"
import { TERipple, TESelect, TETextarea } from "tw-elements-react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";
import { Config, ConfigContext, findActiveSenario, KeyboardConfig } from "./Config";

export default function ConfigSetter(): JSX.Element {

    const { config, profile, setConfig } = useContext(ConfigContext);
    const defaultContent = JSON.stringify(config.keyboardConfig, null, 2)
    const [textAreaContent, setTextAreaContent] = useState(defaultContent);

    // TODO: add profile and delete profile
    const profiles = [
        { text: "Default", value: 1 },
        { text: "Lintao's Config", value: 2 },
    ]

    const senarios = config.keyboardConfig.scenarios.map((it, index) => {
        console.log(it)
        return { text: it.name, value: index + 1 }
    })

    const handleProfileOptionSelect = (data: SelectData) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            profile: data.text,
        }))
    }

    const handleScenarioOptionSelect = (data: SelectData) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            activeScenario: findActiveSenario(prevConfig.keyboardConfig, data.text) || prevConfig.activeScenario
        }))
    }


    const handleConfigInputAreaBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newConfig = JSON.parse(e.target.value) as KeyboardConfig;
            setConfig((prevConfig) => ({
                ...prevConfig,
                keyboardConfig: newConfig,
                activeScenario: findActiveSenario(newConfig, prevConfig.activeScenario.name) || prevConfig.activeScenario
            }))
            setTextAreaContent((prev) => JSON.stringify(newConfig, null, 2))
        } catch (e: any) {
            console.error("Error parsing JSON:", e);
        }

    }


    return (
        <div className="flex flex-col px-3 h-screen" >
            <h2 className="text-4xl m-3 self-center">Config</h2>

            <label htmlFor="profiles" className="flex w-full items-baseline mx-3">
                <div className="flex justify-center">
                    <div className="relative mb-3 md:w-96 pt-5">
                        <TESelect data={profiles} label="Select Profiles" onOptionSelect={handleProfileOptionSelect} />
                    </div>
                </div>
            </label>

            <label htmlFor="scenarios" className="flex w-full items-baseline mx-3">
                <div className="flex justify-center">
                    <div className="relative mb-3 md:w-96 pt-5">
                        <TESelect data={senarios} label="Select Scenario" onOptionSelect={handleScenarioOptionSelect} />
                    </div>
                </div>
            </label>

            <div className="inline-flex" role="group">
                <TERipple rippleColor="light">
                    <button
                        type="button"
                        className="inline-block rounded-l border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    >
                        Add Scenario
                    </button>
                </TERipple>
                <TERipple rippleColor="light">
                    <button
                        type="button"
                        className="-ml-0.5 inline-block border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    >
                        Add Keybinding
                    </button>
                </TERipple>
                <TERipple rippleColor="light">
                    <button
                        type="button"
                        className="-ml-0.5 inline-block rounded-r border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    >
                        Download config
                    </button>
                </TERipple>
            </div>
            <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <form>
                    <div className="flex justify-center">
                        <div className="relative mb-3 xl:w-96">
                            <TETextarea 
                                className="h-screen"
                                id="Current Config" 
                                label="Message"
                                onChange={(e: any) => setTextAreaContent(e.target.value)}
                                onBlur={handleConfigInputAreaBlur}
                                value={textAreaContent}

                            ></TETextarea>
                        </div>
                    </div>

                    {/* <!--Submit button--> */}
                    <TERipple rippleColor="light" className="w-full">
                        <button
                            type="button"
                            className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                        >
                            Subscribe
                        </button>
                    </TERipple>
                </form>
            </div>

        </div>
    )
}
