/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableWithoutFeedback, View, SafeAreaView} from 'react-native';

import styles from './styles';

const IC_BACK = require('assets/icons/back.png');

import Image from '../Image';

const HeaderBack = ({style, titleStyle, title, onBack}) => (
  <View>
    <SafeAreaView />
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={onBack}>
        <View style={[styles.container, style]}>
          <View style={styles.wrapperIconBack}>
            <Image
              source={IC_BACK}
              style={styles.iconBack}
              resizeMode="contain"
              tintColor="#fff"
            />
          </View>

          <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{flex: 1}} />
    </View>
  </View>
);

export default HeaderBack;
