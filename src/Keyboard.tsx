import { CSSProperties, useContext } from "react";
import { ConfigContext, isModifier, KeyboardKey } from "./Config";
import {  KeyboardLayout, toKeyboardLayout } from "./configParser";
import { bgColor, genHighlightLevelMap, getHighlightLevel } from "./KeyboardStyleCalculation";

const KeyboardSizeUnit = 1.5

interface KeyProps {
  keyData: KeyboardKey;
  highlightLevel: number;
}

const Key: React.FC<KeyProps> = ({ keyData, highlightLevel }) => {
  const { keycode, size, tags } = keyData;

  var width: CSSProperties = {
    width: `${KeyboardSizeUnit * size}rem`,
  };

  // Check if 'grow' tag is present and true
  if (tags.get('grow') === true) {
    // Modify the width style to include 'grow'
    width = { ...width, flexGrow: 1 };
  }

  if (keycode === '') {
    return <div style={width}>{keycode}</div>;
  }


  var style = "flex items-center justify-center mx-1 h-12 "

  if (isModifier(keycode)) {
    style += "border-blue-500 border-2 border-dashed"
  } else {
    style += "border-black border"
  }

  style = bgColor(style, highlightLevel)

  return <div className={style} style={width}>{keycode}</div>;
}


const lintaosKeyboard: KeyboardLayout = {
  name: 'Lintaos keyboard',
  layout: toKeyboardLayout(
    [
      ['esc', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '=', 'backspace,grow'],
      ['tab,3', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|,grow'],
      ['ctrl,4', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter,grow'],
      ['shift,5', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift,grow'],
      ['', '', 'alt', 'cmd', 'space,14', 'hyper', 'alt'],
    ]
  ),
}

export default function Keyboard(): JSX.Element {
  const layout = lintaosKeyboard.layout

  const { config, setConfig } = useContext(ConfigContext);
  const { keyboardConfig, activeScenario, highlightedItem } = config;

  const highlightLevelMap = genHighlightLevelMap(highlightedItem)

  return (
    <div className="flex-col">
      {layout.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex my-1 md:w-full">
          {row.map((keyData, keyIndex) => (
            <Key key={`key-${keyIndex}`} keyData={keyData} highlightLevel={getHighlightLevel(highlightLevelMap, keyData.keycode)} />
          ))}
        </div>
      ))}
    </div>
  )
}

