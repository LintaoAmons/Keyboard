import styles from './KeyMapOverview.module.scss'
import {KeyMapItem, Scenario} from "../CoreTypes";
import React from "react";
import {TypeConverter} from "../util/TypeConverter";

interface KeyMapOverviewProps {
    scenario: Scenario,
    highlightFunction: (keycodes: string[]) => void,
}

const KeyMapOverview: React.FC<KeyMapOverviewProps> = (props) => {

    const handleClick = (e: any) => {
        const configItem = props.scenario.config.find(i => i.keycode === e.target.value)
        const modifiers = configItem!!.modifiers!!.map(it => TypeConverter.modifierEnumToKeycode(it))
        props.highlightFunction([configItem!!.keycode, ...modifiers])
    }

    const renderConfigItem: (item: KeyMapItem) => JSX.Element = (item) => {
        return (
            <div className={styles.item} key={`overview-${props.scenario.name}-${item.keycode}-${item.modifiers}`}>
                <span className={styles.keycode}>{item.keycode}</span>
                <span className={styles.modifiers}>{item.modifiers?.join(",")}</span>
                <span className={styles.description}>{item.description}</span>
                <span className={styles.achievedBy}>{item.achieveBy}</span>
                <button onClick={handleClick} value={item.keycode}>highlight me</button>
            </div>)
    }

    const renderConfigItemHeader: () => JSX.Element = () => {
        return (
            <div className={styles.item}>
                <span className={styles.keycode}>Keycode</span>
                <span className={styles.modifiers}>Modifiers</span>
                <span className={styles.description}>Description</span>
                <span className={styles.achievedBy}>AchieveBy</span>
            </div>
        )
    }

    const renderConfigItems: () => JSX.Element = () => {
        let items = Array.from(props.scenario.config.values())
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