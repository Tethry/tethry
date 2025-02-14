import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MessageNotificationIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#19191C"
      d="M4 5.667C4 5.298 4.298 5 4.667 5H8a.667.667 0 0 1 0 1.333H4.667A.667.667 0 0 1 4 5.667ZM4.667 7.667a.667.667 0 1 0 0 1.333h6a.667.667 0 0 0 0-1.333h-6Z"
    />
    <Path
      fill="#19191C"
      fillRule="evenodd"
      d="m10.267 13.3.933-.7c.23-.173.511-.267.8-.267a2.667 2.667 0 0 0 2.667-2.666V4.333A2.667 2.667 0 0 0 12 1.667H4a2.667 2.667 0 0 0-2.667 2.666v5.334A2.667 2.667 0 0 0 4 12.333h1.333c.289 0 .57.094.8.267l.934.7a2.667 2.667 0 0 0 3.2 0ZM12 11c-.577 0-1.138.187-1.6.533l-.933.7a1.334 1.334 0 0 1-1.6 0l-.934-.7a2.667 2.667 0 0 0-1.6-.533H4a1.333 1.333 0 0 1-1.333-1.333V4.333C2.667 3.597 3.264 3 4 3h8c.736 0 1.333.597 1.333 1.333v5.334c0 .736-.597 1.333-1.333 1.333Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default MessageNotificationIcon;
