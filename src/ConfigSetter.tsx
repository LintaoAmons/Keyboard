import { useContext } from "react"
import { TESelect } from "tw-elements-react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";
import { Config, ConfigContext } from "./Config";

export default function ConfigSetter(): JSX.Element {

    const { config, profile, setConfig } = useContext(ConfigContext);

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
            activeScenario: prevConfig.keyboardConfig.scenarios.find(it => it.name == data.text) || prevConfig.activeScenario
        }))
    }


    return (
        <div className="flex flex-col items-start ">
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

        </div>
    )
}
