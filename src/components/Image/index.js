import React from 'react';
import FastImage from 'react-native-fast-image';

const Image = (props) => {
  const checkSource = () => {
    const {source} = props;
    const normalisedSource =
      source && typeof source.uri === 'string' && !source.uri.split('http')[1]
        ? null
        : source;
    return source && source.uri ? normalisedSource : source;
  };
  return (
    <FastImage
      style={props.style}
      source={checkSource()}
      resizeMode={FastImage.resizeMode[props.resizeMode]}
      tintColor={props.tintColor}
    />
  );
};

export default Image;
