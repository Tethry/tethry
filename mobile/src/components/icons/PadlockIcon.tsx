import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const PadlockIcon = (props: SvgProps) => (
  <Svg width={17} height={17} fill="none" {...props}>
    <Path
      fill="#1E1E1E"
      fillRule="evenodd"
      d="M4.5 7.167v-2a4 4 0 1 1 8 0v2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Zm1.333-2a2.667 2.667 0 0 1 5.334 0v2H5.833v-2ZM8.5 9.833c.368 0 .667.299.667.667v1.333a.667.667 0 1 1-1.334 0V10.5c0-.368.299-.667.667-.667Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default PadlockIcon;
