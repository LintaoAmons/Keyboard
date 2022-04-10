import styles from './KeyMapOverview.module.scss'
import {KeyMapConfig, KeyMapItem} from "../CoreTypes";
import React from "react";

interface KeyMapOverviewProps {
    config: KeyMapConfig,
}

const KeyMapOverview: React.FC<KeyMapOverviewProps> = (props) => {

    const renderConfigItem: (item: KeyMapItem) => JSX.Element = (item) => {
        return (
            <div className={styles.item}>
                <span className={styles.keycode}>{item.keycode}</span>
                <span className={styles.modifiers}>{item.modifiers}</span>
                <span className={styles.description}>{item.description}</span>
            </div>)
    }

    const renderConfigItemHeader: () => JSX.Element = () => {
        return (
            <div className={styles.item}>
                <span className={styles.keycode}>Keycode</span>
                <span className={styles.modifiers}>Modifiers</span>
                <span className={styles.description}>Description</span>
            </div>
        )
    }

    const renderConfigItems: () => JSX.Element = () => {
        let items = Array.from(props.config.values())
        return (
            <div className={styles.itemsContainer}>
                {renderConfigItemHeader()}
                {items.map(ele => renderConfigItem(ele))}
            </div>)
    }

    return <div className={styles.container}>
        <h1 className={styles.header}>OVERVIEW</h1>
        {renderConfigItems()}
    </div>
}

export {KeyMapOverview}