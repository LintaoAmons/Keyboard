export interface OneButtonProps {
  keycode: String;
  modifiers: Modifier[]
}
export enum Modifier {
  CMD,
  CTRL,
  SHIFT,
  ALT,
}

const OneButton: React.FC<OneButtonProps> = (props) => {
  return (
    <div>button</div>
  )
}

export { OneButton };
