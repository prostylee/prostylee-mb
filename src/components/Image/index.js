import React from 'react';
import FastImage from 'react-native-fast-image';

const Image = (props) => {
  return (
    <FastImage
      style={props.style}
      source={props.source}
      resizeMode={FastImage.resizeMode[props.resizeMode]}
      tintColor={props.tintColor}
    />
  );
};

export default Image;
