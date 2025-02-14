import * as React from "react"
import Svg, { G, Rect, Path, Defs, ClipPath, SvgProps } from "react-native-svg"


const Envelope = (props: SvgProps) => {
  return (
    <Svg
    width={103}
    height={93}
    viewBox="0 0 93 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_208_10066)">
      <Rect
        x={0.703857}
        y={27.3616}
        width={80}
        height={48}
        rx={2}
        transform="rotate(-20 .704 27.362)"
        fill="#8080DC"
      />
      <Path
        d="M14.394 42.864l2.807 1.134 1.962 5.39-2.415-.058-2.354-6.466zM17.307 43.959L14.5 42.826l5.18-1.886.692 1.903-3.065 1.116zM11.915 45.921l-.692-1.903 3.065-1.115.693 1.902-3.066 1.116z"
        fill="#FDFDFD"
      />
      <Path
        d="M74.684 2.563L3.267 28.557l41.085 1.009L74.684 2.563z"
        fill="#AAAAE8"
      />
      <Rect
        x={13.8699}
        y={57.6874}
        width={21}
        height={2}
        rx={1}
        transform="rotate(-20 13.87 57.687)"
        fill="#5555D0"
      />
      <Rect
        x={15.238}
        y={61.4462}
        width={17}
        height={2}
        rx={1}
        transform="rotate(-20 15.238 61.446)"
        fill="#5555D0"
      />
      <Rect
        x={16.606}
        y={65.205}
        width={17}
        height={2}
        rx={1}
        transform="rotate(-20 16.606 65.205)"
        fill="#5555D0"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_208_10066">
        <Rect
          x={0.703857}
          y={27.3616}
          width={80}
          height={48}
          rx={2}
          transform="rotate(-20 .704 27.362)"
          fill="#fff"
        />
      </ClipPath>
    </Defs>
  </Svg>
  );
};

export default Envelope;
