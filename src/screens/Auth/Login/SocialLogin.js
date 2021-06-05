import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {withOAuth} from 'aws-amplify-react-native';
import {AppleBlack, Facebook, Google, Zalo} from 'svg/common';

import styles from './styles';
import {Auth} from 'aws-amplify';

function SocialLogin(props) {
  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    facebookSignIn,
    googleSignIn,
    customProviderSignIn,
    signOut,
  } = props;

  const loginWithProvider = (provider) =>
    Auth.federatedSignIn({provider: provider});

  if (oAuthError) {
    console.log('Auth Error: ' + oAuthError);
  }
  if (oAuthUser) {
    console.log('Auth Success: ' + JSON.stringify(oAuthUser));
  }

  return (
    <View style={styles.socialLogin}>
      <TouchableOpacity
        onPress={facebookSignIn}
        style={styles.socialBtnWrapper}>
        <Facebook />
      </TouchableOpacity>
      <TouchableOpacity onPress={googleSignIn} style={styles.socialBtnWrapper}>
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
          <AppleBlack />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default withOAuth(SocialLogin);
