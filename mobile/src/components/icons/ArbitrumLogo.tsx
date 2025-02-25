import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const ArbitrumLogo = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#BDC5D1"
        d="M128 0c70.667 0 128 57.333 128 128s-57.333 128-128 128S0 198.667 0 128 57.333 0 128 0Z"
      />
      <G fill="#fff" clipPath="url(#b)">
        <Path d="m143.132 143.055-9.561 26.292a3.378 3.378 0 0 0 0 2.258l16.447 45.239 19.023-11.017-22.831-62.772c-.518-1.446-2.56-1.446-3.078 0ZM162.3 98.84c-.518-1.446-2.56-1.446-3.079 0l-9.56 26.292a3.381 3.381 0 0 0 0 2.259l26.947 74.065 19.023-11.017L162.3 98.84Z" />
        <Path d="M128.5 41.268c.47 0 .94.13 1.361.358l72.544 42.005a2.737 2.737 0 0 1 1.361 2.356v83.994c0 .975-.518 1.868-1.361 2.356l-72.544 42.005a2.67 2.67 0 0 1-1.361.357c-.47 0-.94-.13-1.361-.357l-72.544-41.973a2.736 2.736 0 0 1-1.361-2.356v-84.01c0-.975.518-1.868 1.36-2.356l72.545-42.005a2.724 2.724 0 0 1 1.361-.374Zm0-12.268c-2.576 0-5.169.666-7.486 2.015L48.486 73.004a15.014 15.014 0 0 0-7.486 13v83.993a15.013 15.013 0 0 0 7.486 12.999l72.544 42.005a14.999 14.999 0 0 0 7.486 2.015c2.577 0 5.169-.666 7.486-2.015l72.544-42.005a15.012 15.012 0 0 0 7.486-12.999V86.003a15.013 15.013 0 0 0-7.486-13l-72.56-41.988A14.882 14.882 0 0 0 128.5 29Z" />
        <Path d="m80.522 201.553 6.675-18.329 13.433 11.196-12.558 11.504-7.55-4.371ZM122.392 79.99H104a3.272 3.272 0 0 0-3.078 2.162L61.498 190.536l19.023 11.017 43.41-119.352a1.634 1.634 0 0 0-1.539-2.21Z" />
        <Path d="M154.572 79.99H136.18a3.272 3.272 0 0 0-3.078 2.162L88.088 205.908l19.023 11.017 49-134.724c.389-1.073-.405-2.21-1.539-2.21Z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h256v256H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M41 29h175v198H41z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ArbitrumLogo;
