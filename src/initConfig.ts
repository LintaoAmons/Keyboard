import {Modifier, ScenarioConfig, Scenarios} from "./core/CoreTypes";

export const allScenarios: ScenarioConfig = [
    {keycode: 'f', modifiers: [Modifier.HYPER], description: "打开 firefox 浏览器"},
    {keycode: 'j', modifiers: [Modifier.HYPER], description: "打开 Joplin"},
    {keycode: 'k', modifiers: [Modifier.HYPER], description: "打开 Terminal"},
    {keycode: 'l', modifiers: [Modifier.HYPER], description: "打开 File Explorer"},
    {keycode: ';', modifiers: [Modifier.HYPER], description: "打开 微信"},
    {keycode: 'u', modifiers: [Modifier.HYPER], description: "打开 Draw.io"},
    {keycode: 'i', modifiers: [Modifier.HYPER], description: "打开 IDEA"},
    {keycode: 'o', modifiers: [Modifier.HYPER], description: "打开 Vscode"},
    {keycode: 'v', modifiers: [Modifier.HYPER], description: "Alfred 剪贴板历史"},

    {keycode: 'a', modifiers: [Modifier.HYPER], description: "window to left half"},
    {keycode: 's', modifiers: [Modifier.HYPER], description: "window to bottom half"},
    {keycode: 'd', modifiers: [Modifier.HYPER], description: "window to right half"},
    {keycode: 'w', modifiers: [Modifier.HYPER], description: "window to top half"},
    {keycode: 'z', modifiers: [Modifier.HYPER], description: "window to full size"},
    {keycode: 'e', modifiers: [Modifier.HYPER], description: "window to previous display"},
    {keycode: 'r', modifiers: [Modifier.HYPER], description: "window to next display"},
]

const firefox: ScenarioConfig = [
    {keycode: 'h', modifiers: [Modifier.CTRL, Modifier.CMD], description: "切换到左边的标签页"},
    {keycode: 'l', modifiers: [Modifier.CTRL, Modifier.CMD], description: "切换到右边的标签页"},
    {keycode: '8', modifiers: [Modifier.TAB], description: "搜索标签页"}
]

const keyRemap: ScenarioConfig = [
    {keycode: 'h', modifiers: [Modifier.TAB], description: '左'},
    {keycode: 'j', modifiers: [Modifier.TAB], description: '右'},
    {keycode: 'k', modifiers: [Modifier.TAB], description: '上'},
    {keycode: 'l', modifiers: [Modifier.TAB], description: '下'},
    {keycode: '1', modifiers: [Modifier.TAB], description: 'F1'},
    {keycode: '2', modifiers: [Modifier.TAB], description: 'F2'},
    {keycode: '3', modifiers: [Modifier.TAB], description: 'F3'},
    {keycode: '4', modifiers: [Modifier.TAB], description: 'F4'},
    {keycode: '5', modifiers: [Modifier.TAB], description: 'F5'},
    {keycode: '6', modifiers: [Modifier.TAB], description: 'F6'},
    {keycode: '7', modifiers: [Modifier.TAB], description: 'F7'},
    {keycode: '8', modifiers: [Modifier.TAB], description: 'F8'},
    {keycode: '9', modifiers: [Modifier.TAB], description: 'F9'},
    {keycode: '0', modifiers: [Modifier.TAB], description: 'F10'},
    {keycode: '-', modifiers: [Modifier.TAB], description: 'F11'},
    {keycode: '=', modifiers: [Modifier.TAB], description: 'F12'},
]


export const initScenarios: Scenarios = [
    {
        name: 'AllScenarios',
        config: allScenarios
    },
    {
        name: 'Firefox',
        config: firefox
    },
    {
        name: '改键',
        config: keyRemap
    }
]