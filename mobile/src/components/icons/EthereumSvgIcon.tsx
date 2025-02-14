import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const EthereumSvgIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 32 32"  {...props}>
    <Path d="m15.927 23.959-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0 6.254 16.297l9.819 5.807 9.823-5.801z" />
  </Svg>
);
export default EthereumSvgIcon;
