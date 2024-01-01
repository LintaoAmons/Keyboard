import { Config, isModifier, KeyboardConfig, Modifier } from './Config'; // Update the import path to match your project structure

describe('Config', () => {
    var config: Config

    beforeEach(() => {
        config = Config.getConfig(); // Get a new instance of Config for each test
    });

    it("should get default config", () => {
        expect(config.keyboardConfig).not.toBeNull()
        expect(config.activeScenario).not.toBeNull()
        expect(config.highlightedItem).not.toBeNull()
    })

})

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
