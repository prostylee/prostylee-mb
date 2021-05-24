import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import styles from './styles';
import {IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import Image from '../Image';

const IC_BACK = require('assets/icons/arrowLeft.png');

const HeaderBack = ({style, titleStyle, title, onBack}) => (
  <View>
    <SafeAreaView />
    <View style={[styles.header, style]}>
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

HeaderBack.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
};

export default HeaderBack;
