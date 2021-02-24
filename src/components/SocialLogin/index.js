import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

import styles from './styles';

import {Facebook, Google, AppleBlack, Zalo} from 'svg/common';
import I18n from 'i18n';

const Index = ({onLoginGoogle, onLoginFacebook, onLoginZalo, onLoginApple}) => (
  <View>
    <View style={styles.divider}>
      <View style={styles.line} />
      <Text style={styles.labelDivider}>{I18n.t('otherLoginOptions')}</Text>
      <View style={styles.line} />
    </View>
    <View style={styles.socialLogin}>
      <TouchableOpacity style={styles.socialBtnWrapper}>
        <Facebook />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtnWrapper}>
        <View style={styles.btnBordered}>
          <Google />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtnWrapper}>
        <Zalo />
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <TouchableOpacity style={styles.socialBtnWrapper}>
          <AppleBlack />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default Index;
