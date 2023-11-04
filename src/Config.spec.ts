import { Config, KeyboardConfig } from './Config'; // Update the import path to match your project structure

const defaultConfig: KeyboardConfig = {
    name: 'Default',
    version: '0.1',
    scenarios: [{
        name: 'Default',
        KeymapItems: [
            {
                keycode: 'a',
                description: 'Press a',
                achieveBy: 'a'
            },
            {
                keycode: 'b',
                description: 'Press b',
                achieveBy: 'b'
            }]
    }]
}

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
