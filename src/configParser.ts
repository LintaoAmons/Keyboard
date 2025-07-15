import {
    KeyboardConfig,
    KeyboardConfigJson,
} from './Config'
import { toKeyboardLayout, keyMapItemToString, parseKeyMapItemFromString } from './utils/parsingUtils'
import { DEFAULT_KEYBOARD_LAYOUT } from './constants'







export function parseJsonConfig(raw: KeyboardConfigJson): KeyboardConfig {
    const keyboardLayout = raw.keyboardLayout
        ? raw.keyboardLayout
        : DEFAULT_KEYBOARD_LAYOUT

    return {
        name: raw.name,
        version: raw.version,
        keyboardLayout: {
            name: keyboardLayout.name,
            layout: toKeyboardLayout(keyboardLayout.layout),
        },
        scenarios: raw.scenarios.map((it) => {
            return {
                name: it.name,
                KeymapItems: it.keymapItems.map((jsonString) =>
                    parseKeyMapItemFromString(jsonString)
                ),
            }
        }),
    }
}

export function convertConfigToJsonString(
    config: KeyboardConfig
): KeyboardConfigJson {
    return {
        name: config.name,
        version: config.version,
        // TODO: keyboardLayout can't convert to string yet
        keyboardLayout: undefined,
        scenarios: config.scenarios.map((it) => {
            return {
                name: it.name,
                keymapItems: it.KeymapItems.map((keyItem) =>
                    keyMapItemToString(keyItem)
                ),
            }
        }),
    }
}

export function convertConfigs(
    configs: KeyboardConfigJson[]
): KeyboardConfig[] {
    return configs.map((it) => parseJsonConfig(it))
}
