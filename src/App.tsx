import React, {useState} from 'react';
import {Keyboard} from './core/Keyboard'
import {KeyMapOverview} from './core/KeyMapOverview/KeyMapOverview';
import './App.css';
import {KeyMapConfig, KeyMapItem, Modifier} from "./core/CoreTypes";
import {ConfigSetter} from "./core/ConfigSetter";


export const initState: KeyMapConfig = new Map<String, KeyMapItem>(
    [
        ['q', {keycode: 'q', modifiers: [Modifier.ALT], description: "description"}]
    ]
)

function App() {
    const [config, setConfig] = useState<KeyMapConfig>(initState)

    return (
        <div className="App">
            <h1>Lintao's Keyboard</h1>
            <Keyboard config={config}/>
            <ConfigSetter setConfig={setConfig}/>
            <KeyMapOverview config={config}/>
        </div>
    );
}

export default App;
