import { OneButton } from "./OneButton";
import { Modifier } from "./OneButton";

const Keyboard: React.FC = () => {
  return (
    <div>
      <OneButton keycode='j' modifiers={[Modifier.CMD]} />
    </div>
  )
}

export { Keyboard };
