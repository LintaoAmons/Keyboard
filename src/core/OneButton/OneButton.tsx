import {Modifier} from '../CoreTypes';
import styles from './OneButton.module.scss';
import React from "react";

export interface OneButtonProps {
    keycode: string;
    size?: number;
    modifiers?: Modifier[];
    description?: string;
    hideButton?: boolean;
    highlightConfig: Map<string, boolean>;
}

const OneButton: React.FC<OneButtonProps> = (props) => {
    const buttonSize = (size?: number) => {
        switch (size) {
            case 20:
                return styles.size20
            case 25:
                return styles.size25
            case 30:
                return styles.size30
            case 40:
                return styles.size40
            case 50:
                return styles.size50
            case 100:
                return styles.size100
            default:
                return styles.size10
        }
    }

    const showHighlight = (description?: string) => {
        const show = props.highlightConfig.get(props.keycode) === true
        if (!show) return null

        // TODO: switch hardcoded modifier to enum
        if (['ctrl', 'alt', 'cmd', 'shift', 'hyper', 'tab'].includes(props.keycode)) {
            return styles.hightlightModifier
        }
        if (description == null ) {
            return null
        } else {
            return styles.showHighlight
        }
    }

    const calculateStyle = (size?: number, hideButton?: boolean) => {
        return `${(hideButton === true) ? styles.hidden : null} 
                ${buttonSize(size)}
                ${showHighlight(props.description)}
                `
    }

    return (
        <div className={calculateStyle(props.size, props.hideButton)}>
            <span>{props.keycode}</span>
        </div>
    )
}

export {OneButton};
