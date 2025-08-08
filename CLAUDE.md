# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Keyboard Configuration Visualizer

## Project Overview
This is a React-based keyboard configuration visualizer that displays keyboard layouts and their associated keybindings. The application allows users to view, edit, and manage different keyboard configurations and scenarios.

## Build and Development Commands

### Core Commands
```bash
npm run dev        # Start Vite development server with hot reload
npm run build      # Build for production using Vite
npm test           # Run tests with vitest
npm run preview    # Preview production build locally
```

### Important Notes
- Always run `npm test` and `npm run build` after making changes to ensure code quality and verify the build works correctly
- Node.js version 18 is required (specified in package.json engines)

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (replaces Create React App)
- **Styling**: TailwindCSS
- **State Management**: React Context (ConfigContext)
- **Testing**: Vitest + React Testing Library + jsdom
- **Icons**: Lucide React

### Key Architectural Decisions

#### 1. Desktop-Only Layout
The application is designed **exclusively for desktop** - no responsive mobile layout:
- Eliminates responsive breakpoints and mobile-specific logic
- Uses fixed width classes: `w-96`, `w-3/12`, `w-10/12`, `w-full`
- **Never use Tailwind responsive prefixes**: `md:`, `lg:`, `xl:`, `sm:`
- Minimum supported viewport: 1024px width

#### 2. Single Configuration Structure
Simplified from multiple profiles to **single configuration** with scenarios:
- Single `config` object instead of `configs` array
- Default config (`generated.json`) automatically loaded into localStorage on init
- Users work with one keyboard layout but multiple scenarios (vim modes, etc.)

### Data Structure
```typescript
config: KeyboardConfigJson = {
  name: "Generated",
  keyboardLayout: { name: "...", layout: [...] },
  scenarios: [
    { name: "Vim Generated", keymapItems: [...] }
  ]
}
```

### Core Components

#### State Management (ConfigContext)
- **Location**: `src/contexts/ConfigContext.tsx`
- Central state management for single config
- Handles localStorage persistence, scenario management, keybinding CRUD
- Key functions: `saveConfig()`, `loadConfig()`, `exportConfig()`, `importConfig()`

#### Main Layout Components
- **App.tsx**: Root component with desktop-only flex layout
- **ConfigSetter.tsx**: Sidebar (w-3/12) with scenario management and JSON preview  
- **Keyboard.tsx**: Main keyboard visualization
- **KeymapOverview.tsx**: Keybinding list display

#### Control Components
- **EditModeControls**: Edit mode toggle and management
- **MultiSelectControls**: Multi-select mode for batch operations
- **KeyClickControls**: Key click filtering functionality
- **SidebarToggle**: Desktop sidebar visibility toggle

### Configuration Management

#### Key Features
- **Single Configuration**: One keyboard layout with multiple scenarios
- **Scenario Management**: Add, edit, duplicate, and delete scenarios within config
- **Edit Mode Key Clicking**: Click any key on keyboard to add new keybindings
- **Multi-Select Mode**: Select multiple keybindings for batch operations  
- **Key Click Filtering**: Click keys to filter keybindings containing that key
- **localStorage**: Persistent single configuration storage with versioning

#### Data Flow
1. **Initialization**: App loads `src/configs/generated.json` as default config
2. **localStorage Check**: If no stored config, saves default to localStorage  
3. **State Management**: Single config object managed by ConfigContext
4. **Scenario Selection**: Users switch between scenarios within the config
5. **Persistence**: Changes automatically tracked and saved to localStorage

### File Structure
```
src/
├── contexts/ConfigContext.tsx     # Central state management
├── Config.ts                      # TypeScript interfaces
├── configParser.ts                # JSON config parsing
├── utils/
│   ├── localStorage.ts            # Single config storage utilities
│   ├── configUtils.ts             # Config manipulation utilities
│   ├── parsingUtils.ts            # Keymap parsing utilities
│   └── keybindingUtils.ts         # Keybinding utilities
├── components/                    # UI components
└── configs/generated.json         # Default configuration
```

### Neovim Integration

The project includes a Lua script for extracting Neovim keymaps:

#### Neovim Keymap Extraction
```bash
# Inside nvim, run:
:source tools/extract-keymaps.lua
# Generates src/configs/generated.json with your Neovim keybindings
```

**Script Location**: `tools/extract-keymaps.lua`
- Extracts normal mode keymaps from Neovim
- Converts to application's JSON format
- Skips `<Plug>` keymaps
- Uses keymap descriptions or falls back to "anonymous function" message

### Development Guidelines

#### CSS and Styling
- **Desktop-only**: Use fixed dimensions, never responsive classes
- **Layout**: `flex-row h-screen` for main layout
- **Sidebar**: `w-3/12` when visible, transitions with `duration-300`
- **Colors**: TailwindCSS with custom flame graph color system

#### Component Design  
- Design for desktop viewport (1024px+ width)
- Use fixed positioning for floating controls
- Follow existing patterns in component structure
- Check neighboring files for framework choices and conventions

#### Testing
- Tests located in `test/` directory
- Uses Vitest + React Testing Library + jsdom environment  
- Test command: `npm test`
- Setup file: `test/setup.ts`