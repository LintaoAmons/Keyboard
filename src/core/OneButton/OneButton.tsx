import type { ReactNode, FC } from 'react';
import styles from './OneButton.module.scss';

export interface OneButtonProps {
    keycode: ReactNode;
    highlightConfig: Map<string, boolean>;
    size?: number;
    description?: string;
    hideButton?: boolean;
}

const OneButton: FC<OneButtonProps> = (props) => {
    const { keycode, size = styles.size10, description, hideButton, highlightConfig } = props;

    const buttonSize = () => {
        switch (size) {
            case 20:
                return styles.size20;
            case 25:
                return styles.size25;
            case 30:
                return styles.size30;
            case 40:
                return styles.size40;
            case 50:
                return styles.size50;
            case 100:
                return styles.size100;
            default:
                return styles.size10;
        }
    };

    const showHighlight = () => {
        const show = highlightConfig?.get(keycode?.toString() || '') === true;
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

    const calculateStyle = () => `${hideButton === true ? styles.hidden : null} 
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
