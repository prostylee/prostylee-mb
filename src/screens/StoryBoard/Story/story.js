/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import StoryContainer from 'components/StoryContainer/Stories/StoryContainer';

import {
  BAR_ACTIVE_COLOR,
  BAR_INACTIVE_COLOR,
} from 'components/StoryContainer/Utils/colors';

const Story = ({story}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StoryContainer
        visible={true}
        enableProgress={false}
        images={story.storyLargeImageUrls}
        duration={5}
        containerStyle={{
          flex: 1,
        }}
        barStyle={{
          barActiveColor: BAR_ACTIVE_COLOR,
          barInActiveColor: BAR_INACTIVE_COLOR,
          barWidth: 100,
          barHeight: 4,
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

export default React.memo(Story);
