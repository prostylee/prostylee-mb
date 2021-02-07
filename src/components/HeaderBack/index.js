import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import styles from './styles';
import {IconButton} from 'react-native-paper';
import Image from '../Image';

const IC_BACK = require('assets/icons/arrowLeft.png');

const HeaderBack = ({style, titleStyle, title, onBack}) => (
  <View>
    <SafeAreaView />
    <View style={styles.header}>
      <View style={styles.btnWrapper}>
        <IconButton
          icon={({size, color}) => (
            <Image
              source={IC_BACK}
              style={{width: size, height: size, tintColor: color}}
            />
          )}
          onPress={onBack}
        />
      </View>
      <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
      <View style={styles.btnWrapper} />
    </View>
  </View>
);

export default HeaderBack;
