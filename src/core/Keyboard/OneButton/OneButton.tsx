import type { FC } from 'react';
import styles from './OneButton.module.scss';

export interface OneButtonProps {
    keycode: string;
    highlightConfig: Map<string, boolean>;
    size?: number;
    description?: string;
    hideButton?: boolean;
}

export enum ButtonSize {
    SIZE20,
    SIZE25,
    SIZE30,
    SIZE40,
    SIZE50,
    SIZE100,
}

const OneButton: FC<OneButtonProps> = (props) => {
    const { keycode, size = styles.size10, description, hideButton, highlightConfig } = props;

    const buttonSize = () => {
        switch (size) {
            case ButtonSize.SIZE20:
                return styles.size20;
            case ButtonSize.SIZE25:
                return styles.size25;
            case ButtonSize.SIZE30:
                return styles.size30;
            case ButtonSize.SIZE40:
                return styles.size40;
            case ButtonSize.SIZE50:
                return styles.size50;
            case ButtonSize.SIZE100:
                return styles.size100;
            default:
                return styles.size10;
        }
    };

    const showHighlight = () => {
        const show = highlightConfig?.get(keycode) === true;
        if (!show) return null;

        // TODO: switch hardcoded modifier to enum
        if (['ctrl', 'alt', 'cmd', 'shift', 'hyper', 'tab'].includes(keycode?.toString() || '')) {
            return styles.hightlightModifier;
        }
        if (description == null) {
            return null;
        }
        return styles.showHighlight;
    };

    const calculateStyle =
        () => `flex items-center justify-center mx-1 h-12 bg-white border border-black
            ${hideButton === true ? 'invisible' : null} 
            ${buttonSize()}
            ${showHighlight()}
            `;

    return (
        <div className={calculateStyle()}>
            <span>{keycode}</span>
        </div>
    );
};

export { OneButton };
