# Configuration Pattern Guide for Lintaos Keyboard

This document explains the configuration pattern used in the Lintaos Keyboard project and provides a step-by-step guide on how to create a new keyboard configuration.

## Overview of Configuration Structure

The Lintaos Keyboard project uses a JSON-based configuration format to define keyboard layouts and key mappings for different scenarios. Configurations are stored in the `src/configs/` directory as JSON files, which are then parsed into TypeScript objects for use in the application.

### Key Components of a Configuration

1. **KeyboardConfigJson**: The top-level structure that defines a keyboard configuration.
   - `name`: A unique name for the configuration (e.g., "Lintaos keyboard").
   - `version`: An optional version string for the configuration.
   - `keyboardLayout`: An optional object defining the physical layout of the keyboard.
     - `name`: Name of the layout.
     - `layout`: A 2D array of strings representing rows and keys on the keyboard.
   - `scenarios`: An array of scenario objects, each representing a specific usage context or key mapping set.

2. **ScenarioJson**: Represents a set of key mappings for a particular context or application.
   - `name`: Name of the scenario (e.g., "Vim", "Vscode Jupyter").
   - `keymapItems`: An array of strings, each string representing a key mapping item in a specific format.

3. **Key Mapping Format**: Each key mapping item in `keymapItems` is a string with a specific syntax:
   - **Keybinding**: A sequence of key strokes, separated by commas if multiple keys are involved. Modifiers are enclosed in `< >` with dashes (e.g., `<C-M-p>` for Ctrl+Meta+P).
   - **Description, Conditions, and AchieveBy**: Optional fields separated by `|` characters.
     - Format: `keybinding|description|conditions|achieveBy`
     - Example: `space,f,m|Format|normal-mode,visual-mode|conform.nvim`

### Parsing and Usage

- Configurations are loaded from JSON files in `src/configs/` and parsed using functions in `src/configParser.ts`.
- The `parseKeyMapItemFromString` function interprets the key mapping strings into `KeyMapItem` objects with structured data for keybindings, modifiers, descriptions, etc.
- The application allows switching between different configurations and scenarios via a UI, enabling users to visualize and interact with different key mappings.

## How to Write a New Configuration

Follow these steps to create a new keyboard configuration for the Lintaos Keyboard project:

### Step 1: Create a New JSON File

1. Navigate to the `src/configs/` directory.
2. Create a new JSON file with a descriptive name (e.g., `my-custom-config.json`).

### Step 2: Define the Basic Structure

Add the basic structure of a `KeyboardConfigJson` object. Here's a minimal example to start with:

```json
{
  "name": "My Custom Keyboard",
  "version": "1.0",
  "scenarios": []
}
```

- **Note**: You can omit `keyboardLayout` to use the default layout defined in `configParser.ts`, or define a custom layout as a 2D array of key strings.

### Step 3: Add Scenarios

Add one or more scenarios to the `scenarios` array. Each scenario should have a unique name and a list of key mapping items.

```json
{
  "name": "My Custom Keyboard",
  "version": "1.0",
  "scenarios": [
    {
      "name": "My Custom Scenario",
      "keymapItems": []
    }
  ]
}
```

### Step 4: Define Key Mappings

Populate the `keymapItems` array with key mapping strings following the format described above. Here are some examples:

- Simple key without modifiers: `"a|Press A"`
- Key with modifiers: `"<C-M-p>|Find Commands"`
- Multiple keys in sequence: `"space,f,m|Format|normal-mode,visual-mode|conform.nvim"`
- Escaped comma in keybinding: `"\\,,f,<H-m>|Comma followed by F with Hyper modifier"`

**Syntax Details**:
- Use `< >` to enclose modifiers and keycode (e.g., `<C-M-p>` for Ctrl+Meta+P).
- Modifiers are abbreviated as: `C` (Ctrl), `M` (Cmd/Meta), `S` (Shift), `A` (Alt), `H` (Hyper), `T` (Tab).
- Separate multiple key strokes with commas (e.g., `space,r,r`).
- Escape commas in keycodes with a backslash (e.g., `\\,` for a literal comma).
- Use `|` to separate keybinding, description, conditions, and achieveBy fields.

Example with key mappings added:

```json
{
  "name": "My Custom Keyboard",
  "version": "1.0",
  "scenarios": [
    {
      "name": "My Custom Scenario",
      "keymapItems": [
        "a|Press A",
        "<C-M-p>|Find Commands",
        "space,f,m|Format|normal-mode,visual-mode|conform.nvim",
        "\\,,f,<H-m>|Comma followed by F with Hyper modifier"
      ]
    }
  ]
}
```

### Step 5: (Optional) Define a Custom Keyboard Layout

If you want a custom keyboard layout different from the default, add a `keyboardLayout` object. Define keys with optional size and tags:

- Format for keys in layout: `keycode,size,tag1,tag2=value`
- Example: `backspace,grow` (keycode with a tag), `tab,3` (keycode with size), `cmd` (simple keycode).

```json
{
  "name": "My Custom Keyboard",
  "version": "1.0",
  "keyboardLayout": {
    "name": "My Custom Layout",
    "layout": [
      ["esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace,grow"],
      ["tab,3", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|,grow"],
      ["ctrl,4", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter,grow"],
      ["shift,5", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift,grow"],
      ["", "", "alt", "cmd", "space,14", "hyper", "alt"]
    ]
  },
  "scenarios": [
    {
      "name": "My Custom Scenario",
      "keymapItems": [
        "a|Press A",
        "<C-M-p>|Find Commands"
      ]
    }
  ]
}
```

### Step 6: Register the Configuration

To make the application recognize your new configuration, update the `src/configs/configs.ts` file to include your new JSON file:

1. Import your configuration JSON.
2. Add it to the `configs` array.

```typescript
import { KeyboardConfigJson } from '../Config'
import Default from './default.json'
import PrExample from './pr-example.json'
import MyCustomConfig from './my-custom-config.json'

const configs: KeyboardConfigJson[] = [Default, PrExample, MyCustomConfig]

export default configs
```

### Step 7: Test Your Configuration

Run the application to see your configuration in action:

```bash
npm run dev
```

- Select your configuration from the profile dropdown in the UI.
- Switch between scenarios if you defined multiple ones.
- Verify that the key mappings and layout (if custom) are displayed correctly.

## Best Practices

- **Unique Names**: Ensure configuration and scenario names are unique to avoid conflicts.
- **Clear Descriptions**: Provide meaningful descriptions for key mappings to help users understand their purpose.
- **Organize Scenarios**: Group related key mappings into scenarios for specific tools or workflows (e.g., "Vim", "VSCode").
- **Backup**: Keep a backup of custom configurations before modifying `configs.ts` or updating the project.

## Troubleshooting

- **Key Mapping Not Working**: Check the syntax of your key mapping strings. Ensure modifiers are correctly formatted (e.g., `<C-M-p>`).
- **Configuration Not Visible**: Verify that your JSON file is correctly imported and added to the `configs` array in `src/configs/configs.ts`.
- **Layout Issues**: If using a custom layout, ensure the `layout` array is a valid 2D structure with correct keycode formats.

For further details on the internal parsing logic, refer to `src/configParser.ts`.
