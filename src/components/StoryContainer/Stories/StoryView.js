import React from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import ProgressiveImage from './ProgressiveImage';

const WIDTH = Dimensions.get('window').width;
function StoryView(props) {
  const image = props.images[props.progressIndex];

  return (
    <SafeAreaView style={styles.divStory}>
      <View style={styles.divStory}>
        <ProgressiveImage
          style={props.imageStyle ? props.imageStyle : styles.imgStyle}
          imgSource={{uri: image}}
          thumbnailSource={{uri: image}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divStory: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: WIDTH,
    height: WIDTH,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
});

export default StoryView;
