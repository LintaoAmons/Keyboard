import { OneButton } from "./OneButton/OneButton";
import { Modifier } from "./OneButton/OneButton";
import styles from './Keyboard.module.scss'
import { useState } from "react";

interface KeyMapConfig {
  keyMapItmes: KeyMapItem[];
}

interface KeyMapItem {
  keycode: string;
  modifiers: Modifier[];
  description: string;
}

const Keyboard: React.FC = () => {
  const [config, useConfig] = useState<KeyMapConfig>({} as KeyMapConfig)

  return (
    <div>
      <div className={styles.row1}>
        <OneButton keycode='esc' />
        <OneButton keycode='1' />
        <OneButton keycode='2' />
        <OneButton keycode='3' />
        <OneButton keycode='4' />
        <OneButton keycode='5' />
        <OneButton keycode='6' />
        <OneButton keycode='7' />
        <OneButton keycode='8' />
        <OneButton keycode='9' />
        <OneButton keycode='0' />
        <OneButton keycode='-' />
        <OneButton keycode='=' />
        <OneButton keycode='backspace' size={30} />
      </div>
      <div className={styles.row2}>
        <OneButton keycode='tab' size={20} />
        <OneButton keycode='q' description="lintao"/>
        <OneButton keycode='w' />
        <OneButton keycode='e' />
        <OneButton keycode='r' />
        <OneButton keycode='t' />
        <OneButton keycode='y' />
        <OneButton keycode='u' />
        <OneButton keycode='i' />
        <OneButton keycode='o' />
        <OneButton keycode='p' />
        <OneButton keycode='[' />
        <OneButton keycode=']' />
        <OneButton keycode='\' size={20} />
      </div>
      <div className={styles.row3}>
        <OneButton keycode='control' size={25} />
        <OneButton keycode='a' />
        <OneButton keycode='s' />
        <OneButton keycode='d' />
        <OneButton keycode='f' />
        <OneButton keycode='g' />
        <OneButton keycode='h' />
        <OneButton keycode='j' />
        <OneButton keycode='k' />
        <OneButton keycode='l' />
        <OneButton keycode=';' />
        <OneButton keycode="'" />
        <OneButton keycode='Enter' size={40} />
      </div>
      <div className={styles.row4}>
        <OneButton keycode='shift' size={40} />
        <OneButton keycode='z' />
        <OneButton keycode='x' />
        <OneButton keycode='c' />
        <OneButton keycode='v' />
        <OneButton keycode='b' />
        <OneButton keycode='n' />
        <OneButton keycode='m' />
        <OneButton keycode='m' />
        <OneButton keycode='.' />
        <OneButton keycode='/' />
        <OneButton keycode="shift" size={50} />
      </div>
      <div className={styles.row5}>
        <OneButton keycode='Placeholder' hidden={true} />
        <OneButton keycode='alt' />
        <OneButton keycode='cmd' />
        <OneButton keycode='space' size={100} />
        <OneButton keycode='right cmd' />
      </div>
    </div>
  )
}

export { Keyboard };
