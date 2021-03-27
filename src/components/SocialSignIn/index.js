import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

import styles from './styles';

import {Facebook, Google, AppleBlack, Zalo, AppleWhite} from 'svg/common';
import I18n from 'i18n';
import PropTypes from 'prop-types';

const Index = ({
  onSignInGoogle,
  onSignInFacebook,
  onSignInZalo,
  onSignInApple,
  useWhiteAppleIcon,
}) => (
  <View>
    <View style={styles.divider}>
      <View style={styles.line} />
      <Text style={styles.labelDivider}>{I18n.t('otherSignInOptions')}</Text>
      <View style={styles.line} />
    </View>
    <View style={styles.socialSignIn}>
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
          {useWhiteAppleIcon ? <AppleWhite /> : <AppleBlack />}
        </TouchableOpacity>
      )}
    </View>
  </View>
);

Index.defaultProps = {
  useWhiteAppleIcon: false,
};

Index.propTypes = {
  onSignInGoogle: PropTypes.func,
  onSignInFacebook: PropTypes.func,
  onSignInZalo: PropTypes.func,
  onSignInApple: PropTypes.func,
  useWhiteAppleIcon: PropTypes.bool,
};

export default Index;
