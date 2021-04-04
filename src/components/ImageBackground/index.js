/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground, View} from 'react-native';

const Index = (props) => {
  const {fluid, style, source, ...restProps} = props;
  return (
    <View {...restProps} style={[fluid && {flex: 1}, style && style]}>
      <ImageBackground source={source} style={fluid ? {flex: 1} : {}}>
        {props.children}
      </ImageBackground>
    </View>
  );
};

Index.defaultProps = {
  fluid: false,
  style: {},
};

export default Index;
