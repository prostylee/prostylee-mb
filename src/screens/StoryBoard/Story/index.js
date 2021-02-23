/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Close} from 'svg/common';

import styles from './styles';

import {Image} from 'components';

const Story = ({story}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const marSafeArea = (ins) => ({
    marginTop: -ins.top,
  });
  const _close = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Text />
          </View>
          <TouchableOpacity onPress={_close} style={styles.touchClose}>
            <Close />
          </TouchableOpacity>
        </View>
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
