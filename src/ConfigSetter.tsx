import { useContext, useState } from 'react'
import { TERipple, TESelect } from 'tw-elements-react'
import { SelectData } from 'tw-elements-react/dist/types/forms/Select/types'
import { ConfigContext } from './contexts/ConfigContext'
import JsonView from '@uiw/react-json-view'
import configJsons from './configs/configs'
import ScenarioEditor from './components/ScenarioEditor'

export default function ConfigSetter(): JSX.Element {
    const {
        config,
        setConfig,
        activeScenarioName,
        setActiveScenarioName,
        editMode,
        addScenario,
        updateScenario,
        deleteScenario,
        duplicateScenario,
    } = useContext(ConfigContext)
    // Keep config string in sync with actual config
    const currentConfigJsonString = JSON.stringify(config, null, 2)
    const [showScenarioEditor, setShowScenarioEditor] = useState(false)
    const [editorMode, setEditorMode] = useState<'add' | 'edit' | 'duplicate'>('add')
    const [editingScenario, setEditingScenario] = useState<string>('')
    const scenarioOptions = config.scenarios.map((scenario) => {
        return { text: scenario.name, value: scenario.name }
    })


    const handleScenarioOptionSelect = (data: SelectData) => {
        setActiveScenarioName((_) => data.value as string)
    }

    const copyConfigToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentConfigJsonString)
            alert(
                'Config copied to clipboard! You can modify it then load the config again'
            )
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    const loadConfig = () => {
        try {
            const userInput = window.prompt('Please copy your configuration:')
            if (userInput) {
                const newConfig = JSON.parse(userInput)
                // Validate config structure
                if (newConfig && newConfig.scenarios && Array.isArray(newConfig.scenarios)) {
                    setConfig(newConfig)
                    setActiveScenarioName(newConfig.scenarios[0].name)
                } else {
                    alert('Invalid config format. Please check the structure.')
                }
            }
        } catch (error) {
            alert('Unable to parse your config, please check the format')
        }
    }

    const handleAddScenario = () => {
        setEditorMode('add')
        setEditingScenario('')
        setShowScenarioEditor(true)
    }

    const handleEditScenario = (scenarioName: string) => {
        setEditorMode('edit')
        setEditingScenario(scenarioName)
        setShowScenarioEditor(true)
    }

    const handleDuplicateScenario = (scenarioName: string) => {
        setEditorMode('duplicate')
        setEditingScenario(scenarioName)
        setShowScenarioEditor(true)
    }

    const handleDeleteScenario = (scenarioName: string) => {
        if (config.scenarios.length > 1) {
            const confirmed = window.confirm(`Are you sure you want to delete the scenario "${scenarioName}"?`)
            if (confirmed) {
                deleteScenario(scenarioName)
            }
        } else {
            alert('Cannot delete the last scenario. A configuration must have at least one scenario.')
        }
    }

    const handleSaveScenario = (scenarioName: string) => {
        switch (editorMode) {
            case 'add':
                addScenario(scenarioName)
                break
            case 'edit':
                updateScenario(editingScenario, scenarioName)
                break
            case 'duplicate':
                duplicateScenario(editingScenario, scenarioName)
                break
        }
        setShowScenarioEditor(false)
    }

    const handleCancelScenario = () => {
        setShowScenarioEditor(false)
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50 border-r border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-semibold text-gray-800 text-center truncate" title={config.name}>
                    {config.name}
                </h2>
            </div>

            {/* Scenario Management Section */}
            <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Active Scenario
                        </label>
                        <div className="w-full">
                            <TESelect
                                data={scenarioOptions}
                                label="Select Scenario"
                                onOptionSelect={handleScenarioOptionSelect}
                                value={activeScenarioName}
                            />
                        </div>
                    </div>

                    {editMode && (
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleAddScenario}
                                className="flex items-center justify-center px-2 py-1.5 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                title="Add new scenario"
                            >
                                <span className="mr-1">➕</span>
                                Add
                            </button>
                            <button
                                onClick={() => handleEditScenario(activeScenarioName)}
                                className="flex items-center justify-center px-2 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                title="Edit scenario name"
                            >
                                <span className="mr-1">✏️</span>
                                Edit
                            </button>
                            <button
                                onClick={() => handleDuplicateScenario(activeScenarioName)}
                                className="flex items-center justify-center px-2 py-1.5 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                                title="Duplicate scenario"
                            >
                                <span className="mr-1">📋</span>
                                Duplicate
                            </button>
                            <button
                                onClick={() => handleDeleteScenario(activeScenarioName)}
                                className="flex items-center justify-center px-2 py-1.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                title="Delete scenario"
                            >
                                <span className="mr-1">🗑️</span>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Config Actions Section */}
            <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200">
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Configuration</h3>
                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={copyConfigToClipboard}
                            className="flex items-center justify-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors border border-gray-300"
                        >
                            <span className="mr-1">📋</span>
                            Copy Config
                        </button>
                        <button
                            onClick={loadConfig}
                            className="flex items-center justify-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors border border-blue-300"
                        >
                            <span className="mr-1">📥</span>
                            Load Config
                        </button>
                    </div>
                </div>
            </div>

            {/* Config Preview Section */}
            <div className="flex-1 px-4 py-3 overflow-hidden">
                <div className="h-full flex flex-col">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex-shrink-0">Configuration Preview</h3>
                    <div className="flex-1 bg-white rounded border border-gray-200 p-2 overflow-auto">
                        <JsonView
                            value={JSON.parse(currentConfigJsonString)}
                            displayDataTypes={false}
                            collapsed={3}
                            enableClipboard={false}
                            style={{
                                fontSize: '11px',
                                lineHeight: '1.3',
                                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                background: 'transparent'
                            }}
                        />
                    </div>
                </div>
            </div>
            
            {showScenarioEditor && (
                <ScenarioEditor
                    mode={editorMode}
                    scenarioName={editingScenario}
                    onSave={handleSaveScenario}
                    onCancel={handleCancelScenario}
                />
            )}
        </div>
    )
}
