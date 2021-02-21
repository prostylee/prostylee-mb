/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';

import styles from './styles';

import {Image} from 'components';

const Story = ({story}) => {
  const insets = useSafeAreaInsets();
  const marSafeArea = (ins) => ({
    marginTop: -ins.top,
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={
            story?.image
              ? {uri: story?.image}
              : require('assets/images/default.png')
          }
          resizeMode="cover"
          style={[styles.image, marSafeArea(insets)]}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    </SafeAreaView>
  );
};

Story.defaultProps = {};

Story.propTypes = {};

export default Story;
