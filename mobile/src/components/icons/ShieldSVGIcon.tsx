import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ShieldSVGIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#8080DC"
      fillRule="evenodd"
      d="M18.29 5.086 16.742 4.4l-3.626-1.453a3 3 0 0 0-2.232 0L7.258 4.4l-1.548.686C4.687 5.54 4 6.524 4 7.644c0 1.974.15 5.122.994 7.206 1.077 2.66 3.972 4.8 5.685 5.881a2.46 2.46 0 0 0 2.642 0c1.713-1.082 4.608-3.22 5.685-5.881.844-2.084.994-5.232.994-7.206 0-1.12-.687-2.104-1.71-2.558Zm-3.594 6.121a1 1 0 0 0-1.414-1.414l-1.939 1.939-.282-.282a1 1 0 0 0-1.414 1.414l.989.989a1 1 0 0 0 1.414 0l2.646-2.646Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ShieldSVGIcon;
