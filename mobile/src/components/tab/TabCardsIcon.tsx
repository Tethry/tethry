import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const TabCardsIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill="#B4B4B4"
      d="M5.5 3.5h14a3 3 0 0 1 3 3V7h-20v-.5a3 3 0 0 1 3-3Z"
    />
    <Path
      fill="#B4B4B4"
      fillRule="evenodd"
      d="M2.5 9v8.5a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9h-20Zm2 7a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1Zm12-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default TabCardsIcon;
