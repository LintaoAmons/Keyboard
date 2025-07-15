import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { KeyboardConfigJson, KeyMapItem } from '../Config';
import generatedConfig from '../configs/generated.json';
import { parseJsonConfig } from '../configParser';
import { saveConfigToStorage, loadConfigFromStorage, clearStoredConfig } from '../utils/localStorage';

export interface ConfigContextType {
    config: KeyboardConfigJson;
    setConfig: React.Dispatch<React.SetStateAction<KeyboardConfigJson>>;
    activeScenarioName: string;
    setActiveScenarioName: React.Dispatch<React.SetStateAction<string>>;
    highlightedItem: KeyMapItem;
    setHighlightedItem: React.Dispatch<React.SetStateAction<KeyMapItem>>;
    highlightedItems: KeyMapItem[];
    setHighlightedItems: React.Dispatch<React.SetStateAction<KeyMapItem[]>>;
    multiSelectMode: boolean;
    setMultiSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarVisible: boolean;
    setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
    clickedKey: string | null;
    setClickedKey: React.Dispatch<React.SetStateAction<string | null>>;
    keyClickMode: boolean;
    setKeyClickMode: React.Dispatch<React.SetStateAction<boolean>>;
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
    originalConfig: KeyboardConfigJson;
    keyClickNewKeybinding: string | null;
    setKeyClickNewKeybinding: React.Dispatch<React.SetStateAction<string | null>>;
    saveConfig: () => void;
    loadConfig: () => void;
    resetConfig: () => void;
    exportConfig: () => string;
    importConfig: (jsonString: string) => boolean;
    addKeybinding: (keybinding: string) => void;
    updateKeybinding: (index: number, keybinding: string) => void;
    deleteKeybinding: (index: number) => void;
    addScenario: (scenarioName: string) => void;
    updateScenario: (oldName: string, newName: string) => void;
    deleteScenario: (scenarioName: string) => void;
    duplicateScenario: (scenarioName: string, newName: string) => void;
}

const defaultConfig = generatedConfig as KeyboardConfigJson;
const parsedConfig = parseJsonConfig(defaultConfig);

export const ConfigContext = createContext<ConfigContextType>({
    config: defaultConfig,
    setConfig: () => {},
    activeScenarioName: '',
    setActiveScenarioName: () => {},
    highlightedItem: {} as KeyMapItem,
    setHighlightedItem: () => {},
    highlightedItems: [],
    setHighlightedItems: () => {},
    multiSelectMode: false,
    setMultiSelectMode: () => {},
    sidebarVisible: true,
    setSidebarVisible: () => {},
    clickedKey: null,
    setClickedKey: () => {},
    keyClickMode: false,
    setKeyClickMode: () => {},
    editMode: false,
    setEditMode: () => {},
    hasUnsavedChanges: false,
    setHasUnsavedChanges: () => {},
    originalConfig: defaultConfig,
    keyClickNewKeybinding: null,
    setKeyClickNewKeybinding: () => {},
    saveConfig: () => {},
    loadConfig: () => {},
    resetConfig: () => {},
    exportConfig: () => '',
    importConfig: () => false,
    addKeybinding: () => {},
    updateKeybinding: () => {},
    deleteKeybinding: () => {},
    addScenario: () => {},
    updateScenario: () => {},
    deleteScenario: () => {},
    duplicateScenario: () => {},
});

interface ConfigProviderProps {
    children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [originalConfig, setOriginalConfig] = useState(defaultConfig);
    const [activeScenarioName, setActiveScenarioName] = useState(
        defaultConfig.scenarios[0].name
    );
    const [highlightedItem, setHighlightedItem] = useState(
        parsedConfig.scenarios[0].KeymapItems[0]
    );
    const [highlightedItems, setHighlightedItems] = useState<KeyMapItem[]>([]);
    const [multiSelectMode, setMultiSelectMode] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [clickedKey, setClickedKey] = useState<string | null>(null);
    const [keyClickMode, setKeyClickMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [keyClickNewKeybinding, setKeyClickNewKeybinding] = useState<string | null>(null);

    // Load config from localStorage on mount, or save default config if none exists
    useEffect(() => {
        const storedConfig = loadConfigFromStorage();
        if (storedConfig) {
            setConfig(storedConfig);
            setOriginalConfig(storedConfig);
            setActiveScenarioName(storedConfig.scenarios[0].name);
        } else {
            // No stored config, save the default generated config to localStorage
            saveConfigToStorage(defaultConfig);
            setOriginalConfig(defaultConfig);
        }
    }, []);

    // Watch for changes to config
    useEffect(() => {
        const hasChanges = JSON.stringify(config) !== JSON.stringify(originalConfig);
        setHasUnsavedChanges(hasChanges);
    }, [config, originalConfig]);

    const saveConfig = () => {
        saveConfigToStorage(config);
        setOriginalConfig(config);
        setHasUnsavedChanges(false);
    };

    const loadConfig = () => {
        const storedConfig = loadConfigFromStorage();
        if (storedConfig) {
            setConfig(storedConfig);
            setOriginalConfig(storedConfig);
            setActiveScenarioName(storedConfig.scenarios[0].name);
        }
    };

    const resetConfig = () => {
        clearStoredConfig();
        setConfig(defaultConfig);
        setOriginalConfig(defaultConfig);
        setActiveScenarioName(defaultConfig.scenarios[0].name);
        setHasUnsavedChanges(false);
        // Save default config to localStorage
        saveConfigToStorage(defaultConfig);
    };

    const exportConfig = (): string => {
        return JSON.stringify(config, null, 2);
    };

    const importConfig = (jsonString: string): boolean => {
        try {
            const importedConfig = JSON.parse(jsonString);
            // Validate it's a valid config structure
            if (importedConfig && importedConfig.scenarios && Array.isArray(importedConfig.scenarios)) {
                setConfig(importedConfig);
                setActiveScenarioName(importedConfig.scenarios[0].name);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const addKeybinding = (keybinding: string) => {
        const updatedConfig = { ...config };
        const scenarioIndex = updatedConfig.scenarios.findIndex(
            s => s.name === activeScenarioName
        );
        if (scenarioIndex !== -1) {
            updatedConfig.scenarios[scenarioIndex].keymapItems.push(keybinding);
            setConfig(updatedConfig);
        }
    };

    const updateKeybinding = (index: number, keybinding: string) => {
        const updatedConfig = { ...config };
        const scenarioIndex = updatedConfig.scenarios.findIndex(
            s => s.name === activeScenarioName
        );
        if (scenarioIndex !== -1) {
            updatedConfig.scenarios[scenarioIndex].keymapItems[index] = keybinding;
            setConfig(updatedConfig);
        }
    };

    const deleteKeybinding = (index: number) => {
        const updatedConfig = { ...config };
        const scenarioIndex = updatedConfig.scenarios.findIndex(
            s => s.name === activeScenarioName
        );
        if (scenarioIndex !== -1) {
            updatedConfig.scenarios[scenarioIndex].keymapItems.splice(index, 1);
            setConfig(updatedConfig);
        }
    };

    const addScenario = (scenarioName: string) => {
        const updatedConfig = { ...config };
        // Check if scenario name already exists
        const scenarioExists = updatedConfig.scenarios.some(
            s => s.name === scenarioName
        );
        if (!scenarioExists) {
            updatedConfig.scenarios.push({
                name: scenarioName,
                keymapItems: []
            });
            setConfig(updatedConfig);
            setActiveScenarioName(scenarioName);
        }
    };

    const updateScenario = (oldName: string, newName: string) => {
        const updatedConfig = { ...config };
        const scenarioIndex = updatedConfig.scenarios.findIndex(
            s => s.name === oldName
        );
        if (scenarioIndex !== -1) {
            // Check if new name already exists
            const nameExists = updatedConfig.scenarios.some(
                (s, i) => s.name === newName && i !== scenarioIndex
            );
            if (!nameExists) {
                updatedConfig.scenarios[scenarioIndex].name = newName;
                setConfig(updatedConfig);
                if (activeScenarioName === oldName) {
                    setActiveScenarioName(newName);
                }
            }
        }
    };

    const deleteScenario = (scenarioName: string) => {
        const updatedConfig = { ...config };
        const scenarioIndex = updatedConfig.scenarios.findIndex(
            s => s.name === scenarioName
        );
        if (scenarioIndex !== -1 && updatedConfig.scenarios.length > 1) {
            updatedConfig.scenarios.splice(scenarioIndex, 1);
            setConfig(updatedConfig);
            
            // If we deleted the active scenario, switch to the first available
            if (activeScenarioName === scenarioName) {
                setActiveScenarioName(updatedConfig.scenarios[0].name);
            }
        }
    };

    const duplicateScenario = (scenarioName: string, newName: string) => {
        const updatedConfig = { ...config };
        const scenarioIndex = updatedConfig.scenarios.findIndex(
            s => s.name === scenarioName
        );
        if (scenarioIndex !== -1) {
            // Check if new name already exists
            const nameExists = updatedConfig.scenarios.some(
                s => s.name === newName
            );
            if (!nameExists) {
                const originalScenario = updatedConfig.scenarios[scenarioIndex];
                updatedConfig.scenarios.push({
                    name: newName,
                    keymapItems: [...originalScenario.keymapItems]
                });
                setConfig(updatedConfig);
                setActiveScenarioName(newName);
            }
        }
    };

    const value = {
        config,
        setConfig,
        activeScenarioName,
        setActiveScenarioName,
        highlightedItem,
        setHighlightedItem,
        highlightedItems,
        setHighlightedItems,
        multiSelectMode,
        setMultiSelectMode,
        sidebarVisible,
        setSidebarVisible,
        clickedKey,
        setClickedKey,
        keyClickMode,
        setKeyClickMode,
        editMode,
        setEditMode,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        originalConfig,
        keyClickNewKeybinding,
        setKeyClickNewKeybinding,
        saveConfig,
        loadConfig,
        resetConfig,
        exportConfig,
        importConfig,
        addKeybinding,
        updateKeybinding,
        deleteKeybinding,
        addScenario,
        updateScenario,
        deleteScenario,
        duplicateScenario,
    };

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    );
};
