import {KeyMapItem, Modifier, Scenarios} from "./core/CoreTypes";

export const allScenarios: KeyMapItem[] = [
    {keycode: 'f', modifiers: [Modifier.HYPER], description: "打开 firefox 浏览器"},
    {keycode: 'j', modifiers: [Modifier.HYPER], description: "打开 Joplin"},
    {keycode: 'k', modifiers: [Modifier.HYPER], description: "打开 Terminal"},
    {keycode: 'l', modifiers: [Modifier.HYPER], description: "打开 File Explorer"},
    {keycode: ';', modifiers: [Modifier.HYPER], description: "打开 微信"},
    {keycode: 'u', modifiers: [Modifier.HYPER], description: "打开 Draw.io"},
    {keycode: 'i', modifiers: [Modifier.HYPER], description: "打开 IDEA"},
    {keycode: 'o', modifiers: [Modifier.HYPER], description: "打开 Vscode"},

    {keycode: 'a', modifiers: [Modifier.HYPER], description: "window to left half"},
    {keycode: 's', modifiers: [Modifier.HYPER], description: "window to bottom half"},
    {keycode: 'd', modifiers: [Modifier.HYPER], description: "window to right half"},
    {keycode: 'w', modifiers: [Modifier.HYPER], description: "window to top half"},
    {keycode: 'z', modifiers: [Modifier.HYPER], description: "window to full size"},
    {keycode: 'e', modifiers: [Modifier.HYPER], description: "window to previous display"},
    {keycode: 'r', modifiers: [Modifier.HYPER], description: "window to next display"},
]

const firefox: KeyMapItem[] = [
    {keycode: 'h', modifiers: [Modifier.CTRL, Modifier.CMD], description: "切换到左边的标签页"},
    {keycode: 'l', modifiers: [Modifier.CTRL, Modifier.CMD], description: "切换到右边的标签页"}
]


export const initScenarios: Scenarios = [
    {
        name: 'AllScenarios',
        config: allScenarios
    },
    {
        name: 'firefox',
        config: firefox
    }
]