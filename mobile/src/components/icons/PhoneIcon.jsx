import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Circle, G, Rect, Defs } from "react-native-svg"
const PhoneIcon = (props) => {
  return (
    <Svg
    width={'100%'}
    height={208}
    viewBox="0 0 144 208"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={71.5} cy={83} r={60} fill="#CCCCF1" />
    <G filter="url(#filter0_dd_584_6915)">
      <Rect x={40} y={16} width={64} height={128} rx={5.12} fill="#F5F5F5" />
      <Rect
        x={41}
        y={17}
        width={62}
        height={126}
        rx={4.12}
        stroke="#0000B9"
        strokeWidth={2}
      />
    </G>
    <Defs></Defs>
  </Svg>
  )
}

export default PhoneIcon

const styles = StyleSheet.create({})