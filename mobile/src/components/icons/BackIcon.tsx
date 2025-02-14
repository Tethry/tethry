import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const BackIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      fill="#19191C"
      d="M.917 11.37a2 2 0 0 1 0-2.74L8.272.814a1 1 0 0 1 1.456 1.37L2.373 10l7.355 7.815a1 1 0 1 1-1.456 1.37L.917 11.371Z"
    />
  </Svg>
);
export default BackIcon;
