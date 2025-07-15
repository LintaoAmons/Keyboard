import { KeyboardConfigJson } from '../Config';

const STORAGE_KEY = 'keyboard-config';
const STORAGE_VERSION = '1.0';

export interface StoredConfig {
    version: string;
    config: KeyboardConfigJson;
    lastModified: number;
}

export const saveConfigToStorage = (config: KeyboardConfigJson): void => {
    try {
        const storedConfig: StoredConfig = {
            version: STORAGE_VERSION,
            config,
            lastModified: Date.now()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedConfig));
    } catch (error) {
        console.error('Failed to save config to localStorage:', error);
    }
};

export const loadConfigFromStorage = (): KeyboardConfigJson | null => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        
        const storedConfig: StoredConfig = JSON.parse(stored);
        
        // Check version compatibility
        if (storedConfig.version !== STORAGE_VERSION) {
            console.warn('Stored config version mismatch, using defaults');
            return null;
        }
        
        return storedConfig.config;
    } catch (error) {
        console.error('Failed to load config from localStorage:', error);
        return null;
    }
};

export const clearStoredConfig = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear stored config:', error);
    }
};

export const hasStoredConfig = (): boolean => {
    try {
        return localStorage.getItem(STORAGE_KEY) !== null;
    } catch (error) {
        console.error('Failed to check for stored config:', error);
        return false;
    }
};

export const getStorageInfo = (): { hasData: boolean; lastModified?: Date; version?: string } => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { hasData: false };
        
        const storedConfig: StoredConfig = JSON.parse(stored);
        
        return {
            hasData: true,
            lastModified: new Date(storedConfig.lastModified),
            version: storedConfig.version
        };
    } catch (error) {
        console.error('Failed to get storage info:', error);
        return { hasData: false };
    }
};

export const exportConfig = (config: KeyboardConfigJson): string => {
    const exportData = {
        version: STORAGE_VERSION,
        config,
        exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(exportData, null, 2);
};

export const importConfig = (jsonString: string): KeyboardConfigJson | null => {
    try {
        const importData = JSON.parse(jsonString);
        
        // Validate structure - check for both old format (configs array) and new format (single config)
        if (importData.config) {
            // New format with single config
            return importData.config;
        } else if (importData.configs && Array.isArray(importData.configs) && importData.configs.length > 0) {
            // Old format with configs array - take the first one
            return importData.configs[0];
        } else {
            throw new Error('Invalid config structure');
        }
    } catch (error) {
        console.error('Failed to import config:', error);
        return null;
    }
};