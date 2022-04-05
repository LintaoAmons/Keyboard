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
      case 2: return styles.size2
      case 3: return styles.size3
      case 4: return styles.size3
      case 5: return styles.size4
      default: return styles.size1
    }
  }

  return (
    <div className={buttonSize(props.size)}>
      <span>{props.keycode}</span>
    </div>
  )
}

export { OneButton };
