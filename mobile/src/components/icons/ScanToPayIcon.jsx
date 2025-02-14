import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Path, Rect } from "react-native-svg"
const ScanToPayIcon = (props) => {
  return (
    <Svg
      width={'100%'}
      height={279}
      viewBox="0 0 303 279"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 8a8 8 0 018-8h287a8 8 0 018 8v263a8 8 0 01-8 8H8a8 8 0 01-8-8V8z"
        fill="#1E1E1E"
      />
      <Rect
        x={27}
        y={24.7822}
        width={249}
        height={229.436}
        rx={7}
        fill="#1E1E1E"
      />
      <Rect
        x={27}
        y={24.7822}
        width={249}
        height={229.436}
        rx={7}
        stroke="#F5F5F5"
        strokeWidth={2}
        strokeDasharray="100 100"
      />
    </Svg>
  )
}

export default ScanToPayIcon

const styles = StyleSheet.create({})