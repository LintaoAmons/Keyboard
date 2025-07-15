# Keyboard Configuration Visualizer

## Project Overview
This is a React-based keyboard configuration visualizer that displays keyboard layouts and their associated keybindings. The application allows users to view, edit, and manage different keyboard configurations and scenarios.

## Architecture Decisions

### 1. Desktop-Only Layout

**Decision**: The application supports **desktop-only layout** instead of responsive mobile/desktop design.

**Rationale**:
- **Complexity reduction**: Eliminates the need for complex responsive breakpoints and mobile-specific logic
- **Better user experience**: Keyboard layouts are inherently better suited for desktop/laptop viewing
- **Maintenance simplicity**: Single layout reduces CSS complexity and testing requirements
- **Target audience**: Users configuring keyboard shortcuts are primarily desktop users

### 2. Single Configuration Structure

**Decision**: Simplified data structure from multiple profiles to **single configuration** with scenarios.

**Rationale**:
- **Simplicity**: Removes the complexity of managing multiple keyboard profiles
- **Focus**: Users typically work with one keyboard layout but multiple scenarios (vim modes, etc.)
- **localStorage efficiency**: Single config reduces storage complexity
- **Better UX**: Eliminates profile selection confusion, focuses on scenario management

### Implementation Changes

#### Desktop-Only Layout:
1. **Removed Tailwind responsive prefixes**: No more `md:`, `xl:`, or `sm:` classes
2. **Removed mobile detection**: Eliminated JavaScript-based mobile detection in `SidebarToggle.tsx`
3. **Removed mobile-specific UI**: Removed rotation messages and mobile-specific layouts
4. **Simplified sidebar logic**: Desktop sidebar is always available (can be toggled)
5. **JsonView always visible**: Configuration preview is always shown

#### Single Configuration Structure:
1. **Removed profile concept**: No more `configs` array, single `config` object
2. **Default config loading**: `generated.json` is automatically loaded into localStorage on init
3. **Simplified localStorage**: Single config storage instead of array
4. **Removed profile selection UI**: No more profile dropdown, only scenario selection
5. **Context simplification**: ConfigContext now manages single config state

### Technical Details

#### Key Components Affected:
- `App.tsx`: Removed responsive classes, updated to use single config
- `ConfigSetter.tsx`: Removed profile UI, simplified to show only scenarios
- `SidebarToggle.tsx`: Removed mobile detection and window resize listeners
- `Keyboard.tsx`: Removed responsive classes, updated to use single config
- `KeymapOverview.tsx`: Updated to use single config structure
- `EditModeControls.tsx`: Updated to use single config functions
- `ConfigContext.tsx`: Completely refactored to manage single config
- `localStorage.ts`: Updated to store single config instead of array

#### Data Structure:
**Before (Multiple Profiles)**:
```typescript
configs: KeyboardConfigJson[] = [
  { name: "Profile 1", scenarios: [...] },
  { name: "Profile 2", scenarios: [...] }
]
```

**After (Single Configuration)**:
```typescript
config: KeyboardConfigJson = {
  name: "Generated",
  scenarios: [
    { name: "Vim Generated", keymapItems: [...] }
  ]
}
```

#### Layout Structure:
```
App (flex-row h-screen)
├── SidebarToggle (fixed position)
├── MultiSelectControls (fixed position)
├── KeyClickControls (fixed position)
├── EditModeControls (fixed position)
├── ConfigSetter (w-3/12, refined sidebar)
│   ├── Header Section (config name)
│   ├── Scenario Management (selection + actions)
│   ├── Configuration Actions (copy/load)
│   └── Configuration Preview (JsonView)
└── Main Content (w-10/12 or w-full)
    ├── Keyboard Layout
    └── Keymap Overview
```

#### Refined Sidebar Design:
- **Structure**: Organized into logical sections with clear visual hierarchy
- **Header**: Clean config name display with truncation for long names
- **Scenario Management**: Labeled section with intuitive action buttons
- **Configuration Actions**: Separated copy/load functions with clear icons
- **Preview Section**: Scrollable JsonView with proper styling and spacing
- **Visual Design**: 
  - Light gray background (`bg-gray-50`)
  - White sections with subtle borders
  - Proper padding and spacing (`px-6 py-4`)
  - Shadow effects for depth
  - Responsive button layouts

#### Fixed Dimensions:
- **Sidebar**: `w-3/12` (25% width) when visible
- **Main content**: `w-10/12` (83.33% width) when sidebar visible, `w-full` when hidden
- **JsonView**: Contained within scrollable section with monospace font

## Development Guidelines

### CSS Classes
- Use fixed width classes: `w-96`, `w-3/12`, `w-10/12`, `w-full`
- Avoid Tailwind responsive prefixes: `md:`, `lg:`, `xl:`, `sm:`
- Use standard flex and grid classes without breakpoints

### Component Design
- Design components for desktop viewport (1024px+ width)
- Use fixed positioning for floating controls
- Maintain consistent spacing and padding

### Testing
- Test on desktop browsers only
- Minimum supported viewport: 1024px width
- Focus on desktop keyboard and mouse interactions

## Build and Development

### Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm test           # Run tests with vitest
npm run preview    # Preview production build
```

### Build Process
Always run `npm test` and `npm run build` after making changes to ensure code quality and verify the build works correctly.

## Configuration Management

### Features
- **Single Configuration**: One keyboard layout with multiple scenarios
- **Scenario Management**: Add, edit, duplicate, and delete scenarios
- **Keybinding Editor**: Modal-based keybinding editing with validation
- **Edit Mode Key Clicking**: Click any key on the keyboard to add new keybindings
- **Multi-Select Mode**: Select multiple keybindings for batch operations
- **Key Click Filtering**: Click keys to filter keybindings containing that key
- **Import/Export**: JSON-based configuration import/export
- **LocalStorage**: Persistent single configuration storage
- **Real-time Preview**: Live preview of keybinding changes
- **Default Loading**: Automatically loads `generated.json` on first run

### Data Flow
1. **Initialization**: App loads `generated.json` as default config
2. **localStorage Check**: If no stored config, saves default to localStorage
3. **State Management**: Single config object managed by ConfigContext
4. **Scenario Selection**: Users switch between scenarios within the config
5. **Persistence**: Changes automatically tracked and saved to localStorage

### File Structure
- `src/contexts/ConfigContext.tsx`: Central single config state management
- `src/components/`: All UI components
- `src/configs/generated.json`: Default configuration loaded on init
- `src/utils/localStorage.ts`: Single config storage utilities
- `src/utils/`: Utility functions for parsing and config management