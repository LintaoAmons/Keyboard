import { OneButton } from "./OneButton/OneButton";
import { Modifier } from "./OneButton/OneButton";
import styles from './Keyboard.module.scss'
import { useState } from "react";

interface KeyMapConfig {
  // TODO 如何把这个 list 变成一个 map
  keyMapItmes: KeyMapItem[];
}

interface KeyMapItem {
  keycode: string;
  modifiers: Modifier[];
  description: string;
}

const Keyboard: React.FC = () => {
  const [config, useConfig] = useState<KeyMapConfig>(
    {
      keyMapItmes: [
        { keycode: 'q', modifiers: [Modifier.ALT], description: "description" }
      ]
    }
  )

  const getCorrespondingDescription: (keycode: string) => string | undefined = (keycode) => {
    const desc = config.keyMapItmes.find(e => e.keycode == keycode)?.description
    return desc == undefined ? undefined : desc
  }

  const KeyWrapper: React.FC<{ keycode: string, size?: number, hidden?: boolean }> = (props) => {
    return (<OneButton keycode={props.keycode}
      size={props.size}
      hidden={props.hidden}
      description={getCorrespondingDescription(props.keycode)} />)
  }

  return (
    <div>
      <div className={styles.row1}>
        <KeyWrapper keycode='esc' />
        <KeyWrapper keycode='1' />
        <KeyWrapper keycode='2' />
        <KeyWrapper keycode='3' />
        <KeyWrapper keycode='4' />
        <KeyWrapper keycode='5' />
        <KeyWrapper keycode='6' />
        <KeyWrapper keycode='7' />
        <KeyWrapper keycode='8' />
        <KeyWrapper keycode='9' />
        <KeyWrapper keycode='0' />
        <KeyWrapper keycode='-' />
        <KeyWrapper keycode='=' />
        <KeyWrapper keycode='backspace' size={30} />
      </div>
      <div className={styles.row2}>
        <KeyWrapper keycode='tab' size={20} />
        <KeyWrapper keycode='q' />
        <KeyWrapper keycode='w' />
        <KeyWrapper keycode='e' />
        <KeyWrapper keycode='r' />
        <KeyWrapper keycode='t' />
        <KeyWrapper keycode='y' />
        <KeyWrapper keycode='u' />
        <KeyWrapper keycode='i' />
        <KeyWrapper keycode='o' />
        <KeyWrapper keycode='p' />
        <KeyWrapper keycode='[' />
        <KeyWrapper keycode=']' />
        <KeyWrapper keycode='\' size={20} />
      </div>
      <div className={styles.row3}>
        <KeyWrapper keycode='control' size={25} />
        <KeyWrapper keycode='a' />
        <KeyWrapper keycode='s' />
        <KeyWrapper keycode='d' />
        <KeyWrapper keycode='f' />
        <KeyWrapper keycode='g' />
        <KeyWrapper keycode='h' />
        <KeyWrapper keycode='j' />
        <KeyWrapper keycode='k' />
        <KeyWrapper keycode='l' />
        <KeyWrapper keycode=';' />
        <KeyWrapper keycode="'" />
        <KeyWrapper keycode='Enter' size={40} />
      </div>
      <div className={styles.row4}>
        <KeyWrapper keycode='shift' size={40} />
        <KeyWrapper keycode='z' />
        <KeyWrapper keycode='x' />
        <KeyWrapper keycode='c' />
        <KeyWrapper keycode='v' />
        <KeyWrapper keycode='b' />
        <KeyWrapper keycode='n' />
        <KeyWrapper keycode='m' />
        <KeyWrapper keycode='m' />
        <KeyWrapper keycode='.' />
        <KeyWrapper keycode='/' />
        <KeyWrapper keycode="shift" size={50} />
      </div>
      <div className={styles.row5}>
        <KeyWrapper keycode='Placeholder' hidden={true} />
        <KeyWrapper keycode='alt' />
        <KeyWrapper keycode='cmd' />
        <KeyWrapper keycode='space' size={100} />
        <KeyWrapper keycode='right cmd' />
      </div>
    </div>
  )
}

export { Keyboard };
