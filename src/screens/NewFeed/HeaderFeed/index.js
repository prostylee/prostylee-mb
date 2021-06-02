import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';

import {Header} from 'components';

import {Search, Bag, FeedStore, DubHeart} from 'svg/common';
import {Message} from 'svg/social';
import {useNavigation} from '@react-navigation/native';

const HeaderFeed = ({changeTabStore, changeTabUser, targetType}) => {
  const navigation = useNavigation();

  const onNavigateCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <Header
      leftIcon={
        <TouchableOpacity
          style={styles.leftHeader}
          onPress={() => navigation.navigate('Search')}>
          <Search />
        </TouchableOpacity>
      }
      middleComponent={
        <View style={styles.midHeader}>
          <View style={styles.midBorder}>
            <TouchableOpacity
              onPress={changeTabStore}
              style={[
                styles.midTouch,
                targetType === 'STORE' && styles.grayBg,
              ]}>
              <FeedStore />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changeTabUser}
              style={[styles.midTouch, targetType === 'USER' && styles.grayBg]}>
              <DubHeart />
            </TouchableOpacity>
          </View>
        </View>
      }
      rightComponent={
        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.touch}>
            <Message />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={onNavigateCart}>
            <Bag />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

HeaderFeed.defaultProps = {};

HeaderFeed.propTypes = {};

export default HeaderFeed;
