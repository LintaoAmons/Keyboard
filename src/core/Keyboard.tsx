import {OneButton} from "./OneButton/OneButton";
import styles from './Keyboard.module.scss'
import React from "react";
import {KeyMapConfig, KeyMapItem} from "./CoreTypes";

interface KeyWrapperProps {
    keycode: string;
    size?: number;
    hideButton?: boolean;
    showHighlight?: boolean;
}


interface KeyboardProps {
    config: KeyMapConfig;
    highlightConfig: Map<string, boolean>;
}

const Keyboard: React.FC<KeyboardProps> = (props) => {

    const highLightSpecific = (item: KeyMapItem) => {

    }

    const KeyWrapper: React.FC<KeyWrapperProps> = (propsInside) => {
        const desc = props.config.get(propsInside.keycode)?.description

        return (<OneButton keycode={propsInside.keycode}
                           size={propsInside.size}
                           hideButton={propsInside.hideButton}
                           description={desc}
                           highlightConfig={props.highlightConfig}
        />)
    }

    return (
        <div className={styles.keyboardContainer}>
            <div className={styles.row1}>
                <KeyWrapper keycode='esc'/>
                <KeyWrapper keycode='1'/>
                <KeyWrapper keycode='2'/>
                <KeyWrapper keycode='3'/>
                <KeyWrapper keycode='4'/>
                <KeyWrapper keycode='5'/>
                <KeyWrapper keycode='6'/>
                <KeyWrapper keycode='7'/>
                <KeyWrapper keycode='8'/>
                <KeyWrapper keycode='9'/>
                <KeyWrapper keycode='0'/>
                <KeyWrapper keycode='-'/>
                <KeyWrapper keycode='='/>
                <KeyWrapper keycode='backspace' size={30}/>
            </div>
            <div className={styles.row2}>
                <KeyWrapper keycode='tab' size={20}/>
                <KeyWrapper keycode='q'/>
                <KeyWrapper keycode='w'/>
                <KeyWrapper keycode='e'/>
                <KeyWrapper keycode='r'/>
                <KeyWrapper keycode='t'/>
                <KeyWrapper keycode='y'/>
                <KeyWrapper keycode='u'/>
                <KeyWrapper keycode='i'/>
                <KeyWrapper keycode='o'/>
                <KeyWrapper keycode='p'/>
                <KeyWrapper keycode='['/>
                <KeyWrapper keycode=']'/>
                <KeyWrapper keycode='\' size={20}/>
            </div>
            <div className={styles.row3}>
                <KeyWrapper keycode='ctrl' size={25}/>
                <KeyWrapper keycode='a'/>
                <KeyWrapper keycode='s'/>
                <KeyWrapper keycode='d'/>
                <KeyWrapper keycode='f'/>
                <KeyWrapper keycode='g'/>
                <KeyWrapper keycode='h'/>
                <KeyWrapper keycode='j'/>
                <KeyWrapper keycode='k'/>
                <KeyWrapper keycode='l'/>
                <KeyWrapper keycode=';'/>
                <KeyWrapper keycode="'"/>
                <KeyWrapper keycode='Enter' size={40}/>
            </div>
            <div className={styles.row4}>
                <KeyWrapper keycode='shift' size={40}/>
                <KeyWrapper keycode='z'/>
                <KeyWrapper keycode='x'/>
                <KeyWrapper keycode='c'/>
                <KeyWrapper keycode='v'/>
                <KeyWrapper keycode='b'/>
                <KeyWrapper keycode='n'/>
                <KeyWrapper keycode='m'/>
                <KeyWrapper keycode=','/>
                <KeyWrapper keycode='.'/>
                <KeyWrapper keycode='/'/>
                <KeyWrapper keycode="right shift" size={50}/>
            </div>
            <div className={styles.row5}>
                <KeyWrapper keycode='Placeholder' hideButton={true}/>
                <KeyWrapper keycode='alt'/>
                <KeyWrapper keycode='cmd'/>
                <KeyWrapper keycode='space' size={100}/>
                <KeyWrapper keycode='hyper'/>
            </div>
        </div>
    )
}

export {Keyboard};
