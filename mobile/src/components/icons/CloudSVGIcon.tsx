import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CloudSVGIcon = (props: SvgProps) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path
      fill="#5555D0"
      fillRule="evenodd"
      d="M7.667 1.833a5 5 0 0 0-4.996 5.2A4 4 0 0 0 4.667 14.5h6a4.667 4.667 0 0 0 1.83-8.96 5.002 5.002 0 0 0-4.83-3.707ZM4 6.833a3.667 3.667 0 0 1 7.271-.675.667.667 0 0 0 .446.51 3.335 3.335 0 0 1-1.05 6.499h-6A2.667 2.667 0 0 1 3.633 8.04a.667.667 0 0 0 .401-.705A3.706 3.706 0 0 1 4 6.833Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CloudSVGIcon;
