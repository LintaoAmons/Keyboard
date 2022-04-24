import type { FC } from 'react';
import styles from './KeyMapOverview.module.scss';
import { KeyMapItem, Scenario } from '../CoreTypes';
import { TypeConverter } from '../util/TypeConverter';

interface KeyMapOverviewProps {
    scenario: Scenario;
    highlightFunction: (keycodes: string[]) => void;
}

const KeyMapOverview: FC<KeyMapOverviewProps> = (props) => {
    const { scenario, highlightFunction } = props;
    const handleClick = (value: string) => {
        const configItem = scenario.config.find((i) => i.keycode === value);
        if (configItem && configItem.modifiers) {
            const modifiers = configItem.modifiers.map((it) =>
                TypeConverter.modifierEnumToKeycode(it)
            );
            highlightFunction([configItem.keycode, ...modifiers]);
        }
    };

    const renderConfigItem: (item: KeyMapItem) => JSX.Element = (item) => (
        <div
            className={styles.item}
            key={`overview-${scenario.name}-${item.keycode}-${item.modifiers}`}>
            <span className={styles.keycode}>{item.keycode}</span>
            <span className={styles.modifiers}>{item.modifiers?.join(',')}</span>
            <span className={styles.description}>{item.description}</span>
            <span className={styles.achievedBy}>{item.achieveBy}</span>
            <button onClick={() => handleClick(item.keycode)} value={item.keycode}>
                highlight me
            </button>
        </div>
    );

    const renderConfigItemHeader: () => JSX.Element = () => (
        <div className={styles.item}>
            <span className={styles.keycode}>Keycode</span>
            <span className={styles.modifiers}>Modifiers</span>
            <span className={styles.description}>Description</span>
            <span className={styles.achievedBy}>AchieveBy</span>
        </div>
    );

    const renderConfigItems: () => JSX.Element = () => {
        const items = Array.from(scenario.config.values());
        return (
            <div className={styles.itemsContainer}>
                {renderConfigItemHeader()}
                {items.map((ele) => renderConfigItem(ele))}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>OVERVIEW</h1>
            {renderConfigItems()}
        </div>
    );
};

export { KeyMapOverview };
