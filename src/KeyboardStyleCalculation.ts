export function bgColor(style: string, highlightLevel: number): string {
  switch(highlightLevel) {
    case 1:
      style += " bg-fuchsia-300"; // add your desired color class for level 1
      break;
    case 2:
      style += " bg-yellow-500"; // add your desired color class for level 2
      break;
    case 3:
      style += " bg-red-500"; // add your desired color class for level 3
      break;
    default:
      break;
  }
  return style;
}
