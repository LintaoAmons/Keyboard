import {
    KeyboardConfig,
    KeyboardConfigJson,
    KeyboardKey,
    KeyMapItem,
    KeyStroke,
    Modifier,
} from './Config'

export function toKeyboardLayout(layoutString: string[][]): KeyboardKey[][] {
    return layoutString.map((row) => {
        return row.map((key) => {
            let keycode = ''
            let size = 2
            let tags = new Map<string, string | boolean>()

            if (key === ',') {
                return new KeyboardKey(',')
            }

            const parts = key.split(',')
            if (parts.length > 0) {
                keycode = parts[0]

                for (let i = 1; i < parts.length; i++) {
                    if (parts[i].includes('=')) {
                        // Key-value pair
                        const tagParts = parts[i].split('=')
                        tags.set(tagParts[0], tagParts[1])
                    } else if (i === 1 && !isNaN(Number(parts[i]))) {
                        // Size is always the second part, if it's a number
                        size = Number(parts[i])
                    } else {
                        tags.set(parts[i], true)
                    }
                }
            }

            return new KeyboardKey(keycode, size, tags)
        })
    })
}

export function keyMapItemToString(keyMapItem: KeyMapItem): string {
    let result = keyMapItem.keybinding
        .map((k) => {
            // Escape commas in the keycode
            let keycode = k.keycode === ',' ? '\\,' : k.keycode
            let modifiers = k.modifiers
                ? k.modifiers.map((m) => modifierToString(m)).join('-')
                : ''
            return modifiers ? `<${modifiers}-${keycode}>` : keycode
        })
        .join(',')

    // Conditionally append description, conditions, and achieveBy with pipes
    let hasDescription =
        'description' in keyMapItem && keyMapItem.description !== ''
    let hasConditions =
        'conditions' in keyMapItem && keyMapItem.conditions!.length > 0
    let hasAchieveBy = 'achieveBy' in keyMapItem && keyMapItem.achieveBy !== ''

    if (hasDescription || hasConditions || hasAchieveBy) {
        result += `|${keyMapItem.description || ''}`
    }

    if (hasConditions || hasAchieveBy) {
        result += `|${
            Array.isArray(keyMapItem.conditions)
                ? keyMapItem.conditions.join(',')
                : keyMapItem.conditions || ''
        }`
    }

    if (hasAchieveBy) {
        result += `|${keyMapItem.achieveBy}`
    }

    return result
}

function modifierToString(modifier: Modifier): string {
    const modifierMap: { [key in Modifier]: string } = {
        [Modifier.CMD]: 'M',
        [Modifier.CTRL]: 'C',
        [Modifier.SHIFT]: 'S',
        [Modifier.ALT]: 'A',
        [Modifier.TAB]: 'T',
        [Modifier.HYPER]: 'H',
    }
    return modifierMap[modifier]
}

export function parseKeyMapItemFromString(str: string): KeyMapItem {
    const [keys, description = '', rawConditions = '', achieveBy = ''] =
        str.split('|')

    const commaPlaceHolder = '♞'
    const escaped = keys.replaceAll('\\,', commaPlaceHolder)
    const keyBindings = escaped.split(',').map((k) => {
        if (k === commaPlaceHolder) {
            return { keycode: ',' }
        }
        return parseKeyStroke(k)
    })

    const escapedConditions = rawConditions.replaceAll('\\,', commaPlaceHolder)
    const conditions = escapedConditions.split(',').map((c) => {
        return c.replaceAll(commaPlaceHolder, ',')
    })

    return {
        keybinding: keyBindings,
        description,
        conditions,
        achieveBy,
    }
}

export function parseKeyStroke(input: string): KeyStroke {
    // Remove < and > characters and then split by '-'
    var parts = input.replace(/[<>]/g, '').split('-')

    let modifiers = []
    let keycode = ''

    for (let part of parts) {
        switch (part) {
            case 'C':
                modifiers.push(Modifier.CTRL)
                break
            case 'M':
                modifiers.push(Modifier.CMD)
                break
            case 'S':
                modifiers.push(Modifier.SHIFT)
                break
            case 'A':
                modifiers.push(Modifier.ALT)
                break
            case 'H':
                modifiers.push(Modifier.HYPER)
                break
            case 'T':
                modifiers.push(Modifier.TAB)
                break
            default:
                // If not a recognized modifier, assume it's the keycode
                if (!keycode) {
                    keycode = part
                } else {
                    // If keycode is already set, it's an error
                    throw new Error(`Invalid keystroke format: [${input}]`)
                }
                break
        }
    }

    if (!keycode) {
        throw new Error(`No keycode found in keystroke [${input}]`)
    }

    return {
        keycode: keycode,
        modifiers: modifiers.length > 0 ? modifiers : undefined,
    }
}

// TODO: the layout can be more consice with only an array of strings
const defaultKeyboardLayout = JSON.parse(`{
    "name": "Lintaos keyboard",
    "layout": [
      ["esc", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "=", "backspace,grow"],
      ["tab,3", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|,grow"],
      ["ctrl,4", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter,grow"],
      ["shift,5", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift,grow"],
      ["", "", "alt", "cmd", "space,14", "hyper", "alt"]
    ]
}`)

export function parseJsonConfig(raw: KeyboardConfigJson): KeyboardConfig {
    const keyboardLayout = raw.keyboardLayout
        ? raw.keyboardLayout
        : defaultKeyboardLayout

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
