import { useContext, useEffect, useState } from "react"
import { TERipple, TESelect, TETextarea } from "tw-elements-react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";
import { ConfigContext } from "./App";
import { findActiveSenario } from "./Config";
import { parseJsonConfig } from "./configParser";
import defaultConfigJson from "./config.new.json"
import JsonView from "@uiw/react-json-view";


export default function ConfigSetter(): JSX.Element {

  const { config, profile, setConfig } = useContext(ConfigContext);
  const [currentConfigJsonString, setCurrentConfigJsonString] = useState(JSON.stringify(defaultConfigJson, null, 2));

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

  const copyConfigToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentConfigJsonString);
      alert('Config copied to clipboard! You can modify it then load the config again');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const loadConfig = () => {
    const userInput = window.prompt("Please copy your configuration:");
    if (userInput) {
      const newConfig = parseJsonConfig(JSON.parse(userInput))
      setConfig((prevConfig) => ({
        ...prevConfig,
        keyboardConfig: newConfig,
        activeScenario: findActiveSenario(newConfig, prevConfig.activeScenario.name) || prevConfig.activeScenario
      }))
      setCurrentConfigJsonString(() => userInput)
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
            onClick={() => { alert("还没做") }}
          >
            Add Scenario
          </button>
        </TERipple>
        <TERipple rippleColor="light">
          <button
            type="button"
            className="-ml-0.5 inline-block border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            onClick={() => { alert("还没做") }}
          >
            Add Keybinding
          </button>
        </TERipple>
        <TERipple rippleColor="light">
          <button
            type="button"
            className="-ml-0.5 inline-block rounded-r border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
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
      </div>

      <div className="flex justify-center mt-5">
        <div className="relative mb-3 xl:w-96">
          <JsonView value={JSON.parse(currentConfigJsonString)} displayDataTypes={false} collapsed={3} enableClipboard={false} />
        </div>
      </div>
    </div>
  )
}
