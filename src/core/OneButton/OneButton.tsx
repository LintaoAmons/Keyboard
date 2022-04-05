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
    <div>{props.keycode}</div>
  )
}

export { OneButton };
