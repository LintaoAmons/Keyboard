import {Modifier, Scenario, ScenarioConfig, Scenarios} from "./core/CoreTypes";

const firefox: ScenarioConfig = [
    {keycode: 'h', modifiers: [Modifier.CTRL, Modifier.CMD], description: "切换到左边的标签页", achieveBy: "HammerSpoon"},
    {keycode: 'l', modifiers: [Modifier.CTRL, Modifier.CMD], description: "切换到右边的标签页", achieveBy: "HammerSpoon"},
    {keycode: '8', modifiers: [Modifier.TAB], description: "搜索标签页", achieveBy: "Simple Tab Groups"}
]

const keyRemap: ScenarioConfig = [
    {keycode: 'h', modifiers: [Modifier.TAB], description: '左', achieveBy: 'karabiner'},
    {keycode: 'j', modifiers: [Modifier.TAB], description: '右', achieveBy: 'karabiner'},
    {keycode: 'k', modifiers: [Modifier.TAB], description: '上', achieveBy: 'karabiner'},
    {keycode: 'l', modifiers: [Modifier.TAB], description: '下', achieveBy: 'karabiner'},
    {keycode: '1', modifiers: [Modifier.TAB], description: 'F1', achieveBy: 'karabiner'},
    {keycode: '2', modifiers: [Modifier.TAB], description: 'F2', achieveBy: 'karabiner'},
    {keycode: '3', modifiers: [Modifier.TAB], description: 'F3', achieveBy: 'karabiner'},
    {keycode: '4', modifiers: [Modifier.TAB], description: 'F4', achieveBy: 'karabiner'},
    {keycode: '5', modifiers: [Modifier.TAB], description: 'F5', achieveBy: 'karabiner'},
    {keycode: '6', modifiers: [Modifier.TAB], description: 'F6', achieveBy: 'karabiner'},
    {keycode: '7', modifiers: [Modifier.TAB], description: 'F7', achieveBy: 'karabiner'},
    {keycode: '8', modifiers: [Modifier.TAB], description: 'F8', achieveBy: 'karabiner'},
    {keycode: '9', modifiers: [Modifier.TAB], description: 'F9', achieveBy: 'karabiner'},
    {keycode: '0', modifiers: [Modifier.TAB], description: 'F10', achieveBy: 'karabiner'},
    {keycode: '-', modifiers: [Modifier.TAB], description: 'F11', achieveBy: 'karabiner'},
    {keycode: '=', modifiers: [Modifier.TAB], description: 'F12', achieveBy: 'karabiner'},
]

const terminal: ScenarioConfig = [
    {
        keycode: 'h',
        modifiers: [Modifier.CTRL, Modifier.CMD],
        description: "Select left tmux pane",
        achieveBy: "HammerSpoon"
    },
    {
        keycode: 'l',
        modifiers: [Modifier.CTRL, Modifier.CMD],
        description: "Select right tmux pane",
        achieveBy: "HammerSpoon"
    },
    {keycode: 'h', modifiers: [Modifier.CTRL], description: "Select left Vim window", achieveBy: "HammerSpoon"},
    {keycode: 'l', modifiers: [Modifier.CTRL], description: "Select right Vim window", achieveBy: "HammerSpoon"},
]


export const allScenarios: Scenario = {
    name: 'AllScenarios',
    config: [
        {keycode: 'f', modifiers: [Modifier.HYPER], description: "打开 firefox 浏览器", achieveBy: "HammerSpoon"},
        {keycode: 'j', modifiers: [Modifier.HYPER], description: "打开 Joplin", achieveBy: "HammerSpoon"},
        {keycode: 'k', modifiers: [Modifier.HYPER], description: "打开 Terminal", achieveBy: "HammerSpoon"},
        {keycode: 'l', modifiers: [Modifier.HYPER], description: "打开 File Explorer", achieveBy: "HammerSpoon"},
        {keycode: ';', modifiers: [Modifier.HYPER], description: "打开 微信", achieveBy: "HammerSpoon"},
        {keycode: 'u', modifiers: [Modifier.HYPER], description: "打开 Draw.io", achieveBy: "HammerSpoon"},
        {keycode: 'i', modifiers: [Modifier.HYPER], description: "打开 IDEA", achieveBy: "HammerSpoon"},
        {keycode: 'o', modifiers: [Modifier.HYPER], description: "打开 Vscode", achieveBy: "HammerSpoon"},
        {keycode: 'v', modifiers: [Modifier.HYPER], description: "Alfred 剪贴板历史", achieveBy: "HammerSpoon"},

        {keycode: 'a', modifiers: [Modifier.HYPER], description: "window to left half", achieveBy: "HammerSpoon"},
        {keycode: 's', modifiers: [Modifier.HYPER], description: "window to bottom half", achieveBy: "HammerSpoon"},
        {keycode: 'd', modifiers: [Modifier.HYPER], description: "window to right half", achieveBy: "HammerSpoon"},
        {keycode: 'w', modifiers: [Modifier.HYPER], description: "window to top half", achieveBy: "HammerSpoon"},
        {keycode: 'z', modifiers: [Modifier.HYPER], description: "window to full size", achieveBy: "HammerSpoon"},
        {
            keycode: 'e',
            modifiers: [Modifier.HYPER],
            description: "window to previous display",
            achieveBy: "HammerSpoon"
        },
        {keycode: 'r', modifiers: [Modifier.HYPER], description: "window to next display", achieveBy: "HammerSpoon"},
    ]
};

export const initScenarios: Scenarios = [
    allScenarios,
    {
        name: 'Firefox',
        config: firefox
    },
    {
        name: 'terminal',
        config: terminal
    },
    {
        name: '改键',
        config: keyRemap
    }
]