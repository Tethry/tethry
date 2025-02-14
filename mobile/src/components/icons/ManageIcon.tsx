import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ManageIcon = (props: SvgProps) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path
      fill="#00005D"
      fillRule="evenodd"
      d="M5.333 2.184V3.6a2.668 2.668 0 0 1 0 5.165v5.418a.667.667 0 0 1-1.333 0V8.766a2.668 2.668 0 0 1 0-5.165V2.184a.667.667 0 0 1 1.333 0Zm-2 4a1.333 1.333 0 1 1 2.667 0 1.333 1.333 0 0 1-2.667 0ZM10.667 12.766v1.418a.667.667 0 0 0 1.333 0v-1.418a2.668 2.668 0 0 0 0-5.165V2.184a.667.667 0 0 0-1.333 0V7.6a2.668 2.668 0 0 0 0 5.165Zm2-2.582a1.333 1.333 0 1 0-2.667 0 1.333 1.333 0 0 0 2.667 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ManageIcon;
