import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

export const NewFeedTab = ({width = 24, height = 24, color = "#9B9B9B"}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M3 9L12 2L21 9V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V9Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M9 22V12H15V22" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}

export const StoreTab = ({width = 28, height = 28, color = "#9B9B9B"}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M22.7822 4.52178C22.7494 4.3737 22.667 4.24126 22.5487 4.14638C22.4304 4.05149 22.2832 3.99985 22.1316 4H5.86844C5.71671 3.99997 5.56949 4.05164 5.45105 4.14649C5.33262 4.24134 5.25002 4.3737 5.21689 4.52178L4 10C4 10.5304 4.21071 11.0391 4.58579 11.4142C4.96086 11.7893 5.46957 12 6 12C6.53043 12 7.03914 11.7893 7.41421 11.4142C7.78929 11.0391 8 10.5304 8 10C8 10.5304 8.21071 11.0391 8.58579 11.4142C8.96086 11.7893 9.46957 12 10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 10.5304 12.2107 11.0391 12.5858 11.4142C12.9609 11.7893 13.4696 12 14 12C14.5304 12 15.0391 11.7893 15.4142 11.4142C15.7893 11.0391 16 10.5304 16 10C16 10.5304 16.2107 11.0391 16.5858 11.4142C16.9609 11.7893 17.4696 12 18 12C18.5304 12 19.0391 11.7893 19.4142 11.4142C19.7893 11.0391 20 10.5304 20 10C20 10.5304 20.2107 11.0391 20.5858 11.4142C20.9609 11.7893 21.4696 12 22 12C22.5304 12 23.0391 11.7893 23.4142 11.4142C23.7893 11.0391 24 10.5304 24 10L22.7822 4.52178Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M5.3335 11.8853V19.9999C5.3335 20.3535 5.47397 20.6927 5.72402 20.9427C5.97407 21.1928 6.31321 21.3333 6.66683 21.3333H10.7815C11.1349 21.3333 11.4738 21.4737 11.7237 21.7235L14.0002 23.9999L16.2766 21.7235C16.5266 21.4737 16.8655 21.3333 17.2188 21.3333H21.3335C21.6871 21.3333 22.0263 21.1928 22.2763 20.9427C22.5264 20.6927 22.6668 20.3535 22.6668 19.9999V11.8853" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}

export const NotifTab = ({width = 28, height = 28, color = "#9B9B9B"}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M20 10C20 8.4087 19.3679 6.88258 18.2426 5.75736C17.1174 4.63214 15.5913 4 14 4C12.4087 4 10.8826 4.63214 9.75736 5.75736C8.63214 6.88258 8 8.4087 8 10C8 17 5 19 5 19H23C23 19 20 17 20 10Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M15.73 23C15.5542 23.3031 15.3019 23.5547 14.9982 23.7295C14.6946 23.9044 14.3504 23.9965 14 23.9965C13.6496 23.9965 13.3054 23.9044 13.0018 23.7295C12.6982 23.5547 12.4458 23.3031 12.27 23" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}

export const AccountTab = ({width = 28, height = 28, color = "#9B9B9B"}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="14" cy="14" r="9.25" stroke={color} stroke-width="1.5"/>
      <Circle cx="14" cy="12" r="3.25" stroke={color} stroke-width="1.5"/>
      <Path d="M21 20C19.7217 17.6293 17.0673 16 14 16C10.9327 16 8.27831 17.6293 7 20" stroke={color} stroke-width="1.5"/>
    </Svg>
  )
}
