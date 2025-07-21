# Keyboard Configuration Visualizer 🎯

![keyboard](https://github.com/user-attachments/assets/98f37c4d-cae4-4cbc-9b22-57786c391134)

<!-- mtoc-start -->

* [🎯 Project Goals](#-project-goals)
* [⌨️ Keyboard Layout Editing as Code](#-keyboard-layout-editing-as-code)
* [✨ Key Features](#-key-features)
  * [🔥 Interactive Visualization](#-interactive-visualization)
  * [🎛️ Advanced Controls](#-advanced-controls)
  * [📊 Analytics & Insights](#-analytics--insights)
  * [💾 Data Management](#-data-management)
  * [Neovim shortcut export scripts](#neovim-shortcut-export-scripts)
* [🛠️ Development](#-development)
  * [Setup Development Environment](#setup-development-environment)
  * [Commands](#commands)
* [🧪 Tech Stack](#-tech-stack)

<!-- mtoc-end -->
**Live Demo**: https://keyboard-7p1.pages.dev/

A powerful desktop-only React application that helps you visualize, analyze, and optimize your keyboard shortcuts system. Built specifically for keyboard shortcut enthusiasts who want to improve their shortcuts system and maintain organized, efficient keybindings.

Whether you're optimizing Vim keybindings, designing custom keyboard layouts, or maintaining complex shortcut systems, this visualizer provides the insights needed to create a more efficient and intuitive keyboard interaction experience.

## 🎯 Project Goals

This project serves users who want to:

1. **Understand their current shortcut system** through visual representation
2. **Identify optimization opportunities** by seeing usage patterns and conflicts
3. **Maintain organized keybindings** across different contexts/applications
4. **Share and backup shortcut configurations** with ease
5. **Discover underutilized keys** for new shortcut opportunities
6. **Visualize the impact** of configuration changes instantly

## ⌨️ Keyboard Layout Editing as Code

For version control and systematic management, the keyboard layout is defined entirely in **code** rather than through UI configuration. This approach ensures configuration changes are tracked, reviewable, and maintain consistent formatting across team environments.

## ✨ Key Features

### 🔥 Interactive Visualization
- **Flame Graph Mode**: Keys colored by usage frequency (more frequently used = brighter colors)
- **Multi-select Highlighting**: Simultaneous highlighting of multiple keybindings for pattern analysis
- **Key Click Filtering**: Click any key to see all keybindings containing that specific key
- **Real-time Preview**: Immediate visual feedback for configuration changes

### 🎛️ Advanced Controls
- **Multi-select Mode**: Select multiple keybindings for batch operations
- **Edit Mode**: Add new keybindings by clicking on keys
- **Select All/Clear**: One-click operations for comprehensive analysis
- **Scenario Management**: Switch between different keyboard configurations

### 📊 Analytics & Insights
- **Key Frequency Analysis**: Visual indication of which keys are most heavily used
- **Modifier Distribution**: Track usage of Ctrl, Alt, Shift across bindings
- **Conflict Detection**: Identify overlapping keybindings
- **Coverage Analysis**: Ensure all keys are being utilized effectively

### 💾 Data Management
- **JSON Import/Export**: Share configurations across devices/teams
- **Local Storage**: Persistent configuration storage
- **Default Loading**: Automatically load your configuration on startup
- **Backup & Restore**: Easy configuration backup system


### Neovim shortcut export scripts

1. **Generate Configuration from Neovim**:
   ```bash
   # Inside nvim
   :source tools/extract-keymaps.lua
   # This generates your keybinding configuration
   ```

2. **Load Your Configuration**:
   - Import your generated JSON file via the interface
   - Or start with the included default configuration and manually add keybindings

3. **Explore Your Shortcuts**:
   - Enable **Multi-select mode** for comprehensive analysis
   - Use **Select All** to analyze your entire shortcut system
   - Click **Clear** to reset selections
   - Switch **scenarios** to analyze different contexts


## 🛠️ Development

### Setup Development Environment
```bash
# Clone and install
git clone <repository>
cd Keyboard
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm test` - Run comprehensive test suite
- `npm run preview` - Preview production build locally

## 🧪 Tech Stack

- **Frontend**: React 18 + TypeScript 5
- **Styling**: TailwindCSS with custom color systems
- **State Management**: React Context + useState hooks
- **Build Tool**: Vite (lightning fast HMR)
- **Testing**: Vitest + React Testing Library
- **Icons**: Lucide React
- **Visual Analytics**: Custom flame graph implementation
- **Data**: JSON-based configuration system


