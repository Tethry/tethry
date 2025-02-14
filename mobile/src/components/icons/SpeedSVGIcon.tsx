import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SpeedSVGIcon = (props: SvgProps) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path
      fill="#5555D0"
      fillRule="evenodd"
      d="M8.667 3.116c0-.86-1.173-1.115-1.529-.331L4.145 9.369a.8.8 0 0 0 .729 1.131h2.46v3.384c0 .86 1.172 1.115 1.528.332l2.992-6.585a.8.8 0 0 0-.728-1.131h-2.46V3.116Zm-2.965 6.05 1.631-3.588v1.455a.8.8 0 0 0 .8.8h2.165l-1.631 3.59V9.966a.8.8 0 0 0-.8-.8H5.702Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SpeedSVGIcon;
