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
      <div className={styles.row1}>
        <OneButton keycode='tab' size={2}/>
        <OneButton keycode='q' />
        <OneButton keycode='w'/>
        <OneButton keycode='e'/>
        <OneButton keycode='r'/>
        <OneButton keycode='t'/>
        <OneButton keycode='y'/>
        <OneButton keycode='u'/>
        <OneButton keycode='i'/>
        <OneButton keycode='o'/>
        <OneButton keycode='p'/>
        <OneButton keycode='['/>
        <OneButton keycode=']'/>
        <OneButton keycode='\' size={2}/>
      </div>
    </div>
  )
}

export { Keyboard };
