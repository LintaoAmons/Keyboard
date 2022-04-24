import type { KeyboardItem } from './Keyboard.type';
import styles from './Keyboard.module.scss';

export const keyboardList: { style: string; list: KeyboardItem[] }[] = [
    {
        style: styles.row1,
        list: [
            {
                keycode: 'esc',
            },
            {
                keycode: '1',
            },
            {
                keycode: '2',
            },
            {
                keycode: '3',
            },
            {
                keycode: '4',
            },
            {
                keycode: '5',
            },
            {
                keycode: '6',
            },
            {
                keycode: '7',
            },
            {
                keycode: '8',
            },
            {
                keycode: '9',
            },
            {
                keycode: '0',
            },
            {
                keycode: '-',
            },
            {
                keycode: '=',
            },
            {
                keycode: 'backspace',
                size: 30,
            },
        ],
    },
    {
        style: styles.row2,
        list: [
            {
                keycode: 'tab',
                size: 20,
            },
            {
                keycode: 'q',
            },
            {
                keycode: 'w',
            },
            {
                keycode: 'e',
            },
            {
                keycode: 'r',
            },
            {
                keycode: 't',
            },
            {
                keycode: 'y',
            },
            {
                keycode: 'u',
            },
            {
                keycode: 'i',
            },
            {
                keycode: 'o',
            },
            {
                keycode: 'p',
            },
            {
                keycode: '[',
            },
            {
                keycode: ']',
            },
            {
                keycode: '\\',
                size: 20,
            },
        ],
    },
    {
        style: styles.row3,
        list: [
            {
                keycode: 'ctrl',
                size: 25,
            },
            {
                keycode: 'a',
            },
            {
                keycode: 's',
            },
            {
                keycode: 'd',
            },
            {
                keycode: 'f',
            },
            {
                keycode: 'g',
            },
            {
                keycode: 'h',
            },
            {
                keycode: 'j',
            },
            {
                keycode: 'k',
            },
            {
                keycode: 'l',
            },
            {
                keycode: ';',
            },
            {
                keycode: "'",
            },
            {
                keycode: 'Enter',
                size: 40,
            },
        ],
    },
    {
        style: styles.row4,
        list: [
            {
                keycode: 'shift',
                size: 40,
            },
            {
                keycode: 'z',
            },
            {
                keycode: 'x',
            },
            {
                keycode: 'c',
            },
            {
                keycode: 'v',
            },
            {
                keycode: 'b',
            },
            {
                keycode: 'n',
            },
            {
                keycode: 'm',
            },
            {
                keycode: ',',
            },
            {
                keycode: '.',
            },
            {
                keycode: '/',
            },
            {
                keycode: 'right shift',
                size: 50,
            },
        ],
    },
    {
        style: styles.row5,
        list: [
            {
                keycode: 'Placeholder',
                hideButton: true,
            },
            {
                keycode: 'alt',
            },
            {
                keycode: 'cmd',
            },
            {
                keycode: 'space',
                size: 100,
            },
            {
                keycode: 'hyper',
            },
        ],
    },
];
