import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Successicon = (props) => {
  return (
    <Svg
    width={65}
    height={64}
    viewBox="0 0 65 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.566 32l12.8 10.667 17.067-21.334M32.499 61.867a29.867 29.867 0 110-59.735 29.867 29.867 0 010 59.735z"
      stroke="#5BAE5B"
      strokeWidth={1.6}
    />
  </Svg>
  )
}

export default Successicon

