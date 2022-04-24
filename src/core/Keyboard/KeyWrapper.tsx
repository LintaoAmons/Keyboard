import { type FC, memo } from 'react';
import { OneButton } from './OneButton/OneButton';
import type { KeyboardItem, ConfigMap } from './Keyboard.type';

interface KeyWrapperProps {
    keyboardItem: KeyboardItem;
    config: ConfigMap;
    highlightConfig: Map<string, boolean>;
}

const KeyWrapper: FC<KeyWrapperProps> = (props) => {
    const { keyboardItem, config, highlightConfig } = props;
    const desc = config.get(keyboardItem.keycode)?.description;

    return <OneButton {...keyboardItem} description={desc} highlightConfig={highlightConfig} />;
};

export default memo(KeyWrapper);
