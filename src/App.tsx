import React, {useEffect, useState} from 'react';
import {Keyboard} from './core/Keyboard'
import {KeyMapOverview} from './core/KeyMapOverview/KeyMapOverview';
import './App.css';
import {KeyMapConfig, KeyMapItem, Modifier} from "./core/CoreTypes";
import {ConfigSetter} from "./core/ConfigSetter/ConfigSetter";
import {Title} from "./core/Title/Title";

export const initState: KeyMapConfig = new Map<string, KeyMapItem>(
    [
        ['f', {keycode: 'f', modifiers: [Modifier.HYPER], description: "打开 firefox 浏览器"}],
        ['j', {keycode: 'j', modifiers: [Modifier.HYPER], description: "打开 Joplin"}],
        ['k', {keycode: 'k', modifiers: [Modifier.HYPER], description: "打开 Terminal"}],
        ['l', {keycode: 'l', modifiers: [Modifier.HYPER], description: "打开 File Explorer"}],
        [';', {keycode: ';', modifiers: [Modifier.HYPER], description: "打开 微信"}],
        ['u', {keycode: 'u', modifiers: [Modifier.HYPER], description: "打开 Draw.io"}],
        ['i', {keycode: 'i', modifiers: [Modifier.HYPER], description: "打开 IDEA"}],
        ['o', {keycode: 'o', modifiers: [Modifier.HYPER], description: "打开 Vscode"}],

        ['a', {keycode: 'a', modifiers: [Modifier.HYPER], description: "window to left half"}],
        ['s', {keycode: 's', modifiers: [Modifier.HYPER], description: "window to bottom half"}],
        ['d', {keycode: 'd', modifiers: [Modifier.HYPER], description: "window to right half"}],
        ['w', {keycode: 'w', modifiers: [Modifier.HYPER], description: "window to top half"}],
        ['z', {keycode: 'z', modifiers: [Modifier.HYPER], description: "window to full size"}],
        ['e', {keycode: 'e', modifiers: [Modifier.HYPER], description: "window to previous display"}],
        ['r', {keycode: 'r', modifiers: [Modifier.HYPER], description: "window to next display"}],
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
        window.scrollTo(0, 0)
        const newHighlightTable = new Map<string, boolean>();
        keycode.forEach(it => newHighlightTable.set(it, true))
        setHighlightConfig(newHighlightTable)
    }

    useEffect(highLightDefaultToTrue, [])

    return (
        <div className="App">
            <Title/>

            <Keyboard config={config} highlightConfig={highlightConfig}/>
            <ConfigSetter setConfig={setConfig}/>
            <KeyMapOverview config={config} highlightFunction={highLightSpecific}/>
        </div>
    );
}

export default App;
