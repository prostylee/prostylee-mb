import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

import {absolute} from 'theme/style';

const ProgressiveImage = (props) => {
  const thumbnailAnimated = new Animated.Value(0);

  const imageAnimated = new Animated.Value(0);
  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };
  const {thumbnailSource, source, style, ...rest} = props;
  return (
    <View style={styles.container}>
      <Animated.Image
        {...rest}
        source={thumbnailSource}
        style={[style, {opacity: thumbnailAnimated}]}
        onLoad={handleThumbnailLoad}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, {opacity: imageAnimated}, style]}
        onLoad={onImageLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageOverlay: {
    ...absolute(0, 0, 0, 0),
  },
  container: {
    marginTop: -14,
  },
});

export default ProgressiveImage;
