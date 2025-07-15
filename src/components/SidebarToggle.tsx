import React, { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

const SidebarToggle: React.FC = () => {
    const { sidebarVisible, setSidebarVisible } = useContext(ConfigContext);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-2 bg-white hover:bg-gray-100 rounded-md border border-gray-300 shadow-md transition-all duration-200 hover:shadow-lg"
            aria-label={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
            title={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
        >
            <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                {sidebarVisible ? (
                    // Hide sidebar icon
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                ) : (
                    // Show sidebar icon
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                )}
            </svg>
        </button>
    );
};

export default SidebarToggle;