/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import StoryContainer from 'components/StoryContainer/Stories/StoryContainer';

import {
  BAR_ACTIVE_COLOR,
  BAR_INACTIVE_COLOR,
} from 'components/StoryContainer/Utils/colors';

const images = [
  'https://s3.ap-south-1.amazonaws.com/hsdreams1/pins/2019/01/big/7d1e5e0b31a650b9314023921b9e161b.jpeg',
  'https://boostupliving.com/wp-content/uploads/2019/06/best-motivational-quote-mobile-wallpapers-53.jpg',
  'https://i.pinimg.com/originals/51/bd/4c/51bd4c1e72d5d6ae5f2a4f31e31d2ef5.jpg',
  'https://pumpernickelpixie.com/wp-content/uploads/2016/01/15-phone-wallpaper.jpg',
  'https://i.pinimg.com/originals/5a/f0/e5/5af0e538f7437fd13a73f7c96601ccb6.jpg',
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Story = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StoryContainer
        visible={true}
        enableProgress={false}
        images={images}
        duration={5}
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
        barStyle={{
          barActiveColor: BAR_ACTIVE_COLOR,
          barInActiveColor: BAR_INACTIVE_COLOR,
          barWidth: 100,
          barHeight: 4,
        }}
        imageStyle={{
          width: WIDTH,
          height: HEIGHT,
        }}
        onComplete={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Story;
