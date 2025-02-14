import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const DownArrowIcon = (props: SvgProps) => (
  <Svg width="8" height="6" viewBox="0 0 8 6" fill="none" {...props}>
    <Path
      d="M0.940244 0.720093L4.00024 3.78009L7.06024 0.720093L8.00024 1.66676L4.00024 5.66676L0.000244141 1.66676L0.940244 0.720093Z"
      fill="#69696C"
    />
  </Svg>
);

export default DownArrowIcon;
