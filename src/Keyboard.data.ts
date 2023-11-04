import { KeyboardLayout, toKeyboardLayout } from "./Keyboard";

export const LintaosKeyboard: KeyboardLayout = {
    name: 'Lintaos keyboard',
    layout: toKeyboardLayout(
        [
            ['esc', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '=', 'backspace,4'],
            ['tab,3', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|,3'],
            ['caps,4', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter,5'],
            ['shift,5', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift,5'],
            ['', '', 'alt', 'cmd', 'space,14', 'cmd', 'alt'],
        ]
    ),
}
