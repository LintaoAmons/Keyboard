import styles from './OneButton.module.scss';
export interface OneButtonProps {
  keycode: String;
  size?: number; 
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
  const buttonSize : (size?: number) => string = (size) => {
    switch (size) {
      case 20: return styles.size20
      case 25: return styles.size25
      case 30: return styles.size30
      case 40: return styles.size40
      case 50: return styles.size50
      default: return styles.size10
    }
  }

  return (
    <div className={buttonSize(props.size)}>
      <span>{props.keycode}</span>
    </div>
  )
}

export { OneButton };
