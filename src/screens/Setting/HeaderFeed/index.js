import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

import {Header} from 'components';

import {Setting, FeedStore, ChevronLeft} from 'svg/common';
import {Message} from 'svg/social';
import {useNavigation} from '@react-navigation/native';

import i18n from 'i18n';

const HeaderFeed = () => {
  const navigation = useNavigation();

  const onNavigateSetting = (screen) => {
    screen?navigation.navigate(screen):navigation.goBack();;
  };

  return (
    <Header
      leftIcon={
        <TouchableOpacity style={styles.leftHeader} onPress={() => onNavigateSetting()}>
          <ChevronLeft/>
        </TouchableOpacity>
      }
      middleComponent={
        <View style={styles.midHeader}>
          <Text>{i18n.t('setting.myaccount')}</Text>
        </View>
      }
      rightComponent={
        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.touch}>
            <Message />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

HeaderFeed.defaultProps = {};

HeaderFeed.propTypes = {};

export default HeaderFeed;
