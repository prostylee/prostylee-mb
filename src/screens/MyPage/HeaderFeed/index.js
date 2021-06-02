import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';

import {Header} from 'components';

import {Setting, FeedStore, ChevronLeft} from 'svg/common';
import {Message} from 'svg/social';
import {useNavigation} from '@react-navigation/native';

const HeaderFeed = () => {
  const navigation = useNavigation();

  const onNavigateSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <Header
      leftIcon={
        <TouchableOpacity style={styles.leftHeader}>
          <ChevronLeft/>
        </TouchableOpacity>
      }
      middleComponent={
        <View style={styles.midHeader}>
          <View style={styles.midBorder}>
            <TouchableOpacity
              style={[
                styles.midTouch,
                styles.grayBg,
              ]}>
              <FeedStore />
            </TouchableOpacity>
          </View>
        </View>
      }
      rightComponent={
        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.touch}>
            <Message />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={onNavigateSetting}>
            <Setting />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

HeaderFeed.defaultProps = {};

HeaderFeed.propTypes = {};

export default HeaderFeed;
