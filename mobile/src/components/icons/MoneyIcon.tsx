import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MoneySVGIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#8080DC"
      fillRule="evenodd"
      d="M12.468 6.11a2.666 2.666 0 1 1 0 5.331 2.666 2.666 0 0 1 0-5.33Zm.666 2.666a.666.666 0 1 0-1.332 0 .666.666 0 0 0 1.332 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#8080DC"
      fillRule="evenodd"
      d="M3.14 5.946a4 4 0 0 1 4-4h10.656a4 4 0 0 1 4 4v5.66c0 .545-.109 1.064-.306 1.538l-.28 2.06a3.974 3.974 0 0 1-.957 2.1c-.013.041-.03.082-.048.123l-.948 2.008a4 4 0 0 1-5.95 1.543l-8.59-6.166a1 1 0 0 1-.19-.177 3.99 3.99 0 0 1-1.387-3.03V5.947Zm14.656 9.66c.462 0 .905-.078 1.317-.222a2.001 2.001 0 0 1-2.428 1.2l-3.344-.978h4.455ZM5.84 4.426c-.428.367-.7.912-.7 1.52v5.66c0 .608.272 1.153.7 1.52a1 1 0 0 1 .799-1.602h1.666a1 1 0 1 1 0 2H6.638c-.026 0-.052-.001-.077-.003a2 2 0 0 0 .579.085h10.656a2 2 0 0 0 .579-.085 1.038 1.038 0 0 1-.077.003h-1.666a1 1 0 1 1 0-2h1.666a1 1 0 0 1 .799 1.601c.428-.366.7-.911.7-1.52V5.947c0-.608-.272-1.153-.7-1.52a1 1 0 0 1-.799 1.602h-1.666a1 1 0 1 1 0-2h1.666c.026 0 .052.001.077.003a2 2 0 0 0-.579-.085H7.14a2 2 0 0 0-.58.085l.078-.003h1.666a1 1 0 1 1 0 2H6.638a1 1 0 0 1-.799-1.602Zm11.569 14.237a3.999 3.999 0 0 1-1.285-.16l-4.784-1.399 3.134 2.25a2 2 0 0 0 2.935-.691Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default MoneySVGIcon;
