import { KeyboardKey, KeyMapItem, KeyStroke, Modifier } from '../Config';
import { SPECIAL_CHARACTERS, MODIFIER_MAP } from '../constants';

// Cache to prevent repeated error logging for the same input
const errorLogCache = new Set<string>();

export const toKeyboardLayout = (layoutString: string[][]): KeyboardKey[][] => {
    return layoutString.map((row) => {
        return row.map((key) => {
            let keycode = '';
            let size = 2;
            let tags = new Map<string, string | boolean>();

            if (key === SPECIAL_CHARACTERS.COMMA) {
                return new KeyboardKey(SPECIAL_CHARACTERS.COMMA);
            }

            const parts = key.split(',');
            if (parts.length > 0) {
                keycode = parts[0];

                for (let i = 1; i < parts.length; i++) {
                    if (parts[i].includes('=')) {
                        const tagParts = parts[i].split('=');
                        tags.set(tagParts[0], tagParts[1]);
                    } else if (i === 1 && !isNaN(Number(parts[i]))) {
                        size = Number(parts[i]);
                    } else {
                        tags.set(parts[i], true);
                    }
                }
            }

            return new KeyboardKey(keycode, size, tags);
        });
    });
};

export const keyMapItemToString = (keyMapItem: KeyMapItem): string => {
    let result = keyMapItem.keybinding
        .map((k) => {
            const keycode = k.keycode === SPECIAL_CHARACTERS.COMMA ? SPECIAL_CHARACTERS.ESCAPED_COMMA : k.keycode;
            const modifiers = k.modifiers
                ? k.modifiers.map((m) => modifierToString(m)).join('-')
                : '';
            return modifiers ? `<${modifiers}-${keycode}>` : keycode;
        })
        .join(',');

    const hasDescription = 'description' in keyMapItem && keyMapItem.description !== '';
    const hasConditions = 'conditions' in keyMapItem && keyMapItem.conditions!.length > 0;
    const hasAchieveBy = 'achieveBy' in keyMapItem && keyMapItem.achieveBy !== '';

    if (hasDescription || hasConditions || hasAchieveBy) {
        result += `|${keyMapItem.description || ''}`;
    }

    if (hasConditions || hasAchieveBy) {
        result += `|${
            Array.isArray(keyMapItem.conditions)
                ? keyMapItem.conditions.join(',')
                : keyMapItem.conditions || ''
        }`;
    }

    if (hasAchieveBy) {
        result += `|${keyMapItem.achieveBy}`;
    }

    return result;
};

const modifierToString = (modifier: Modifier): string => {
    return MODIFIER_MAP[modifier] || modifier;
};

export const parseKeyMapItemFromString = (str: string): KeyMapItem => {
    try {
        const [keys, description = '', rawConditions = '', achieveBy = ''] = str.split('|');

        const escaped = keys.replaceAll(SPECIAL_CHARACTERS.ESCAPED_COMMA, SPECIAL_CHARACTERS.COMMA_PLACEHOLDER);
        const keyBindings = escaped.split(',').map((k) => {
            if (k === SPECIAL_CHARACTERS.COMMA_PLACEHOLDER) {
                return { keycode: SPECIAL_CHARACTERS.COMMA };
            }
            try {
                return parseKeyStroke(k);
            } catch (error) {
                // Only log error once per unique input
                if (!errorLogCache.has(`${str}:${k}`)) {
                    console.error(`Error parsing keystroke "${k}" in keymap item "${str}":`, error);
                    errorLogCache.add(`${str}:${k}`);
                }
                return { keycode: 'ERROR' };
            }
        });

        const escapedConditions = rawConditions.replaceAll(SPECIAL_CHARACTERS.ESCAPED_COMMA, SPECIAL_CHARACTERS.COMMA_PLACEHOLDER);
        const conditions = escapedConditions.split(',').map((c) => {
            return c.replaceAll(SPECIAL_CHARACTERS.COMMA_PLACEHOLDER, SPECIAL_CHARACTERS.COMMA);
        });

        return {
            keybinding: keyBindings,
            description,
            conditions,
            achieveBy,
        };
    } catch (error) {
        // Only log error once per unique input
        if (!errorLogCache.has(str)) {
            console.error(`Error parsing keymap item "${str}":`, error);
            errorLogCache.add(str);
        }
        return {
            keybinding: [{ keycode: 'ERROR' }],
            description: 'Parsing failed',
        };
    }
};

export const parseKeyStroke = (input: string): KeyStroke => {
    try {
        if (input.length === 1) {
            return {
                keycode: input,
                modifiers: undefined,
            };
        }

        const parts = input.replace(/[<>]/g, '').split('-');
        const modifiers: Modifier[] = [];
        let keycode = '';

        for (const part of parts) {
            const modifier = parseModifier(part);
            if (modifier) {
                modifiers.push(modifier);
            } else {
                if (!keycode) {
                    keycode = part;
                } else {
                    // Only log error once per unique input
                    if (!errorLogCache.has(input)) {
                        console.error(`Invalid keystroke format: [${input}] - Multiple keycodes detected`);
                        errorLogCache.add(input);
                    }
                    return { keycode: 'ERROR' };
                }
            }
        }

        if (!keycode) {
            // Only log error once per unique input
            if (!errorLogCache.has(input)) {
                console.error(`No keycode found in keystroke [${input}]`);
                errorLogCache.add(input);
            }
            return { keycode: 'ERROR' };
        }

        return {
            keycode,
            modifiers: modifiers.length > 0 ? modifiers : undefined,
        };
    } catch (error) {
        // Only log error once per unique input
        if (!errorLogCache.has(input)) {
            console.error(`Error parsing keystroke [${input}]:`, error);
            errorLogCache.add(input);
        }
        return { keycode: 'ERROR' };
    }
};

const parseModifier = (part: string): Modifier | null => {
    const modifierMapping: Record<string, Modifier> = {
        'C': Modifier.CTRL,
        'M': Modifier.CMD,
        'D': Modifier.CMD,
        'S': Modifier.SHIFT,
        'A': Modifier.ALT,
        'H': Modifier.HYPER,
        'T': Modifier.TAB,
    };

    return modifierMapping[part] || null;
};
