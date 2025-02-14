import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const TethryTokenIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#5555D0"
      d="M1.416 14.48c1.335 5.427 6.928 8.779 12.494 7.485 5.566-1.293 8.996-6.74 7.662-12.167-1.335-5.427-6.928-8.778-12.494-7.485C3.512 3.606.082 9.053 1.416 14.48Z"
    />
    <Path
      fill="#0000B9"
      d="M1.562 13.585c1.31 5.329 6.874 8.604 12.427 7.313 5.553-1.29 8.992-6.656 7.682-11.985-1.31-5.33-6.875-8.604-12.428-7.314C3.691 2.889.251 8.255 1.562 13.585Z"
    />
    <Path
      fill="#00055C"
      stroke="#0000B9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={2.613}
      strokeWidth={0.022}
      d="M2.169 13.474c1.237 5.032 6.478 8.127 11.706 6.913 5.229-1.215 8.464-6.279 7.226-11.311C19.864 4.044 14.623.949 9.395 2.164 4.166 3.378.93 8.442 2.169 13.474Z"
    />
    <Path
      fill="#FDFDFD"
      d="m10.754 9.563 1.332 1.198v3.395l-1.332-.522v-4.07ZM12.152 10.761l-1.331-1.198h3.261v1.198h-1.93ZM8.758 10.761V9.563h1.93v1.198h-1.93Z"
    />
  </Svg>
);
export default TethryTokenIcon;
