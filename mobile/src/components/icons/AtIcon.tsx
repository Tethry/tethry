import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const AtSVGIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#8080DC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12s-.006 2.518-.5 4a16.9 16.9 0 0 0-.056.172c-.621 1.942-3.668 1.848-3.944-.172v0M8 13.4v0c0 2.755 2.699 4.7 5.313 3.83l.159-.054c.35-.117.684-.28.991-.485L15.5 16m0 0c-.24-1.012.397-1.612.699-2.93.228-.997-.078-2.006-.747-2.778A3.748 3.748 0 0 0 12.62 9h-.274A4.347 4.347 0 0 0 8 13.347v.268M14.5 20l-2.536.241C7.694 20.648 4 17.29 4 13a8 8 0 0 1 8-8h.533A7.467 7.467 0 0 1 20 12.467"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default AtSVGIcon;
