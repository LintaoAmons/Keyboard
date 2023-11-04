import { Config, ConfigContext } from "./Config";
import ConfigSetter from "./ConfigSetter";
import Keyboard from "./Keyboard";
import KeymapOverview from "./KeymapOverview";

export default function App(): JSX.Element {

  return (
    <ConfigContext.Provider value={Config.getConfig()}>
      <div className="flex flex-row">

        <div className="w-2/12 border-r border-solid border-2 pr-5">
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
