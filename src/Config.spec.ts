import { Config, isModifier, KeyboardConfig, Modifier } from './Config'; // Update the import path to match your project structure
import defaultConfigJson from "./config.json"

const defaultConfig = defaultConfigJson as KeyboardConfig

describe('Config', () => {
    let config: Config

    beforeEach(() => {
        config = Config.getConfig(); // Get a new instance of Config for each test
    });

    it('should return the default keyboard config', () => {
        expect(config.keyboardConfig).toEqual(defaultConfig);
    });

    it('should return the same instance of Config', () => {
        const anotherConfig = Config.getConfig();
        expect(config).toBe(anotherConfig);
    });

    it('should set activeScenario to the first scenario', () => {
        expect(config.activeScenario).toEqual(defaultConfig.scenarios[0]);
    });

    it('should set highlightedItem to the first KeyMapItem', () => {
        expect(config.highlightedItem).toEqual(defaultConfig.scenarios[0].KeymapItems[0]);
    });

    describe('set custom config', () => {
        it('should set a custom keyboard config', () => {
            const customConfig = {
                name: 'Custom',
                version: '1.0',
                scenarios: [
                    {
                        name: 'Custom Scenario',
                        KeymapItems: [
                            {
                                keycode: 'b',
                                description: 'Press b',
                                achieveBy: 'b',
                            },
                        ],
                    },
                ],
            };

            const customInstance = Config.setConfig(customConfig);

            expect(customInstance.keyboardConfig).toEqual(customConfig);
        });
    })
});

describe('isModifier', () => {
    it('should return true for valid Modifier keys', () => {
        expect(isModifier(Modifier.CMD)).toBe(true);
        expect(isModifier(Modifier.CTRL)).toBe(true);
        expect(isModifier(Modifier.SHIFT)).toBe(true);
        expect(isModifier(Modifier.ALT)).toBe(true);
        expect(isModifier(Modifier.TAB)).toBe(true);
        expect(isModifier(Modifier.HYPER)).toBe(true);
    });

    it('should return false for invalid Modifier keys', () => {
        expect(isModifier('INVALID_KEY')).toBe(false);
        expect(isModifier('Another_Invalid_Key')).toBe(false);
        expect(isModifier('')).toBe(false);
    });

    it('should return true for valid Modifier keys with different cases', () => {
        expect(isModifier('cmd')).toBe(true);
        expect(isModifier('Ctrl')).toBe(true);
    });
});
