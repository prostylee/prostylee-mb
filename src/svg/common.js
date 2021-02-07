import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

export const Search = ({width = 24, height = 24, color = "#8B9399"}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M20.9999 20.9999L16.6499 16.6499" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}

export const Bag = ({width = 24, height = 24, color = "#8B9399"}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M4.63797 7.9266C4.67683 7.26589 5.22397 6.75 5.88581 6.75H18.1142C18.776 6.75 19.3232 7.26589 19.362 7.9266L20.0645 19.8679C20.1405 21.1602 19.1129 22.25 17.8183 22.25H6.18166C4.88707 22.25 3.85952 21.1602 3.93554 19.8679L4.63797 7.9266Z" stroke={color} stroke-width="1.5"/>
      <Path d="M16 10V5C16 2.79086 14.2091 1 12 1V1C9.79086 1 8 2.79086 8 5V10" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}



