import styles from './KeyMapOverview.module.scss'
import {KeyMapConfig, KeyMapItem} from "../CoreTypes";
import React from "react";

interface KeyMapOverviewProps {
    config: KeyMapConfig,
}

const KeyMapOverview: React.FC<KeyMapOverviewProps> = (props) => {

    const renderConfigItem: (item: KeyMapItem) => JSX.Element = (item) => {
        return (<div>
            <span>{item.keycode}</span>
            <span>{item.modifiers}</span>
            <span>{item.description}</span>
        </div>)
    }

    const renderConfigItems: () => JSX.Element = () => {
        let items = Array.from(props.config.values())
        return (
            <ul>
                {
                    items.map(ele => renderConfigItem(ele))
                }
            </ul>
        )

    }

    const items = Array.from(props.config.values())
    return <div className={styles.container}>
        <h1 className={styles.header}>OVERVIEW</h1>
        <ul>
            {renderConfigItems()}
            <li>Item 1</li>
            <li>Item 2</li>
        </ul>

    </div>
}

export {KeyMapOverview}