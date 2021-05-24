import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {Image} from 'components';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ProgressiveImage = (props) => {
  const insets = useSafeAreaInsets();
  const marSafeArea = (ins) => ({
    marginTop: -ins.top,
  });
  const {thumbnailSource} = props;
  return (
    <Image
      source={thumbnailSource}
      resizeMode="cover"
      style={[styles.image, marSafeArea(insets)]}
      PlaceholderContent={<ActivityIndicator />}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: WIDTH,
    height: HEIGHT,
  },
});

export default ProgressiveImage;
