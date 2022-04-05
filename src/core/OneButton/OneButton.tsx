import styles from './OneButton.module.scss';
export interface OneButtonProps {
  keycode: String;
  modifiers?: Modifier[]
  description?: String;
}
export enum Modifier {
  CMD,
  CTRL,
  SHIFT,
  ALT,
}

const OneButton: React.FC<OneButtonProps> = (props) => {
  return (
    <div className={styles.button}>
      <span>{props.keycode}</span>
    </div>
  )
}

export { OneButton };
