import {type FC, useEffect, useState} from 'react';
import styles from './Keyboard.module.scss';
import { KeyMapItem } from "../../generated_apis/Api";
import {TypeConverter} from '../util/TypeConverter';
import type {ConfigMap} from './Keyboard.type';
import KeyWrapper from './KeyWrapper';
import {keyboardList} from './Keyboard.data';

interface KeyboardProps {
    config: KeyMapItem[];
    highlightConfig: Map<string, boolean>;
}

const Keyboard: FC<KeyboardProps> = (props) => {
    const {config, highlightConfig} = props;

    const [configMap, setConfigMap] = useState<ConfigMap>(TypeConverter.configListToMap(config));

    useEffect(() => setConfigMap(TypeConverter.configListToMap(config)), [config]);

    return (
        <div className={styles.keyboardContainer}>
            {keyboardList.map((key, idx) => (
                <div className={key.style} key={idx}>
                    {key.list.map((item, keyIdx) => (
                        <KeyWrapper
                            keyboardItem={item}
                            key={`KeyWrapper${keyIdx}`}
                            config={configMap}
                            highlightConfig={highlightConfig}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
