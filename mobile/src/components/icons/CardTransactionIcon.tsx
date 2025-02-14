import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CardTransactionIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#1E1E1E"
      d="M2.667 10.667c0-.368.298-.667.666-.667h5.334a.667.667 0 0 1 0 1.334H3.333a.667.667 0 0 1-.666-.667ZM10.667 10a.667.667 0 0 0 0 1.334H12A.667.667 0 0 0 12 10h-1.333Z"
    />
    <Path
      fill="#1E1E1E"
      fillRule="evenodd"
      d="M.667 4.334a2.667 2.667 0 0 1 2.666-2.667h9.334a2.667 2.667 0 0 1 2.666 2.667v7.333a2.667 2.667 0 0 1-2.666 2.667H3.333a2.667 2.667 0 0 1-2.666-2.667V4.334ZM3.333 3C2.597 3 2 3.597 2 4.334v.333h12v-.333C14 3.597 13.403 3 12.667 3H3.333ZM14 6H2v5.667C2 12.403 2.597 13 3.333 13h9.334c.736 0 1.333-.597 1.333-1.333V6Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default CardTransactionIcon;
