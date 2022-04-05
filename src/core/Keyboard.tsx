import { OneButton } from "./OneButton/OneButton";
import { Modifier } from "./OneButton/OneButton";
import styles from './Keyboard.module.scss'

const Keyboard: React.FC = () => {
  return (
    <div>
      <div className={styles.row0}>
        <OneButton keycode='esc'/>
        <OneButton keycode='1'/>
        <OneButton keycode='2'/>
        <OneButton keycode='3'/>
        <OneButton keycode='4'/>
        <OneButton keycode='5'/>
        <OneButton keycode='6'/>
        <OneButton keycode='7'/>
        <OneButton keycode='8'/>
        <OneButton keycode='9'/>
        <OneButton keycode='0'/>
        <OneButton keycode='-'/>
        <OneButton keycode='='/>
        <OneButton keycode='backspace' size={3}/>
      </div>
    </div>
  )
}

export { Keyboard };
