import React from 'react';
import {View} from 'react-native';

interface Props {
  topBounceColor: String;
  bottomBounceColor: String;
  children: React.FunctionComponent;
}

const AppScrollViewIOSBounceColorsWrapper = ({
  topBounceColor,
  bottomBounceColor,
  children,
  ...props
}: Props) => {
  return (
    <View {...props} style={[{position: 'relative'}, props.style]}>
      {children}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}>
        <View style={{flex: 1, backgroundColor: topBounceColor}} />
        <View style={{flex: 1, backgroundColor: bottomBounceColor}} />
      </View>
    </View>
  );
};
export default AppScrollViewIOSBounceColorsWrapper;
