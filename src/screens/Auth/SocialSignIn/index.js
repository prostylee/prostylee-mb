import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';

import {AppleBlack, AppleWhite, Facebook, Google, Zalo} from 'svg/common';
import I18n from 'i18n';
import PropTypes from 'prop-types';
import {Auth} from 'aws-amplify';
import {withOAuth} from 'aws-amplify-react-native';
import {put} from 'redux-saga/effects';
import {userActions} from '../../../redux/reducers';
import {useDispatch} from 'react-redux';

const Index = ({
  oAuthUser,
  oAuthError,
  hostedUISignIn,
  facebookSignIn,
  googleSignIn,
  customProviderSignIn,
  signOut,
  useWhiteAppleIcon,
}) => {
  const dispatch = useDispatch();

  const loginWithProvider = (provider) =>
    Auth.federatedSignIn({provider: provider});

  if (oAuthError) {
    console.log('Auth Error: ' + oAuthError);
  }
  if (oAuthUser) {
    console.log('Auth Success');
    // console.log('Auth Success: ' + JSON.stringify(oAuthUser));
  }

  React.useEffect(() => {
    console.log('Update oAuthUser');
    dispatch(userActions.userSignInSuccess(oAuthUser));
  }, [oAuthUser]);

  return (
    <View>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.labelDivider}>{I18n.t('otherSignInOptions')}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialSignIn}>
        <TouchableOpacity
          onPress={facebookSignIn}
          style={styles.socialBtnWrapper}>
          <Facebook />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={googleSignIn}
          style={styles.socialBtnWrapper}>
          <View style={styles.btnBordered}>
            <Google />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => customProviderSignIn('Zalo')}
          style={styles.socialBtnWrapper}>
          <Zalo />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            onPress={() => loginWithProvider('SignInWithApple')}
            style={styles.socialBtnWrapper}>
            {useWhiteAppleIcon ? <AppleWhite /> : <AppleBlack />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

Index.defaultProps = {
  useWhiteAppleIcon: false,
};

Index.propTypes = {
  useWhiteAppleIcon: PropTypes.bool,
};

export default withOAuth(Index);
