import React, { useContext } from 'react'
import ConfigSetter from './ConfigSetter'
import Keyboard from './Keyboard'
import KeymapOverview from './KeymapOverview'
import { ConfigProvider, ConfigContext } from './contexts/ConfigContext'
import SidebarToggle from './components/SidebarToggle'
import MultiSelectControls from './components/MultiSelectControls'
import KeyClickControls from './components/KeyClickControls'
import EditModeControls from './components/EditModeControls'
import { Github } from 'lucide-react'

// Re-export ConfigContext for backward compatibility
export { ConfigContext } from './contexts/ConfigContext'

export default function App(): JSX.Element {
    return (
        <ConfigProvider>
            <AppContent />
        </ConfigProvider>
    )
}

function AppContent(): JSX.Element {
    const { sidebarVisible } = useContext(ConfigContext)

    return (
        <div className="flex flex-row h-screen relative">
            <SidebarToggle />
            <MultiSelectControls />
            <KeyClickControls />
            <EditModeControls />

            {/* Desktop sidebar */}
            <div
                className={`pt-16 border-r border-solid border-2 transition-all duration-300 ease-in-out ${
                    sidebarVisible
                        ? 'w-3/10 opacity-100'
                        : 'w-0 opacity-0 overflow-hidden'
                }`}
            >
                <ConfigSetter />
            </div>

            <div
                className={`flex-1 flex flex-col items-center transition-all duration-300 ease-in-out ${
                    sidebarVisible ? 'w-10/12' : 'w-full'
                }`}
            >
                <div className="pt-16 px-4 w-full flex flex-col items-center">
                    <AppHeader />
                    <AppBody />
                </div>
            </div>
        </div>
    )
}

function AppHeader(): JSX.Element {
    const { config } = useContext(ConfigContext)

    return (
        <div className='flex items-center'>
            <h1 className="text-4xl my-3">{config.keyboardLayout?.name}</h1>
            <a
                href="https://github.com/LintaoAmons/Keyboard/"
                className="px-4 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
                <Github className="w-6 h-6" />
            </a>
        </div>
    )
}

function AppBody(): JSX.Element {
    return (
        <>
            <Keyboard />
            <KeymapOverview />
        </>
    )
}
