import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CopyIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#19191C"
      fillRule="evenodd"
      d="M14 2a4 4 0 0 0-4 4v2H6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2h4a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4h-4Zm0 12h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2.535c1.196.692 2 1.984 2 3.465v2ZM4 12a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CopyIcon;
