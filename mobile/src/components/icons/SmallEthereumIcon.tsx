import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SmallEthereumIcon = (props: SvgProps) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path fill="#627EEA" d="M8 16.5a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <Path
      fill="#fff"
      fillOpacity={0.602}
      d="M8.249 2.5v4.435l3.748 1.675L8.25 2.5Z"
    />
    <Path fill="#fff" d="M8.249 2.5 4.5 8.61l3.749-1.675V2.5Z" />
    <Path
      fill="#fff"
      fillOpacity={0.602}
      d="M8.249 11.484v3.014L12 9.308l-3.751 2.176Z"
    />
    <Path fill="#fff" d="M8.249 14.498v-3.014L4.5 9.307l3.749 5.19Z" />
    <Path
      fill="#fff"
      fillOpacity={0.2}
      d="m8.249 10.787 3.748-2.177L8.25 6.936v3.85Z"
    />
    <Path
      fill="#fff"
      fillOpacity={0.602}
      d="m4.5 8.61 3.749 2.177V6.936L4.5 8.61Z"
    />
  </Svg>
);
export default SmallEthereumIcon;
