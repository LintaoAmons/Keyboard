import React, {useEffect, useState} from 'react';
import {Keyboard} from './core/Keyboard'
import {KeyMapOverview} from './core/KeyMapOverview/KeyMapOverview';
import './App.css';
import {hyper, KeyMapConfig, KeyMapItem} from "./core/CoreTypes";
import {ConfigSetter} from "./core/ConfigSetter/ConfigSetter";


export const initState: KeyMapConfig = new Map<string, KeyMapItem>(
    [
        ['f', {keycode: 'f', modifiers: hyper, description: "open firefox"}],
        ['j', {keycode: 'j', modifiers: hyper, description: "open Joplin"}],
        ['k', {keycode: 'k', modifiers: hyper, description: "open Terminal"}],
        ['l', {keycode: 'l', modifiers: hyper, description: "open File Explorer"}],
        ['u', {keycode: 'u', modifiers: hyper, description: "open Draw.io"}],
        ['i', {keycode: 'i', modifiers: hyper, description: "open IDEA"}],
        ['o', {keycode: 'o', modifiers: hyper, description: "open Vscode"}],
    ]
)

function App() {
    const [config, setConfig] = useState<KeyMapConfig>(initState)
    const [highlightConfig, setHighlightConfig] = useState<Map<string, boolean>>(new Map())

    const highLightDefaultToTrue = () => {
        const newHighlightTable = new Map<string, boolean>();
        Array.from(config.values())
            .forEach(it => newHighlightTable.set(it.keycode, true)
            )
        setHighlightConfig(newHighlightTable)
    }

    const highLightSpecific = (keycode: string[]) => {
        const newHighlightTable = new Map<string, boolean>();
        keycode.forEach(it => newHighlightTable.set(it, true))
        setHighlightConfig(newHighlightTable)
    }

    useEffect(highLightDefaultToTrue, [])

    return (
        <div className="App">
            <h1>Lintao's Keyboard</h1>
            <Keyboard config={config} highlightConfig={highlightConfig}/>
            <ConfigSetter setConfig={setConfig}/>
            <KeyMapOverview config={config} highlightFunction={highLightSpecific}/>
        </div>
    );
}

export default App;
