import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  TextInputBorderBottom,
  HeaderBack,
  Image,
  TextButton,
} from 'components';

import {useKeyboard} from '@react-native-community/hooks';

import I18n from 'i18n';

import styles from './styles';

import {Facebook, Google, AppleBlack, Zalo} from 'svg/common';

//ICONS
const IC_ZALO = require('assets/icons/zaloIcon.png');

const Index = (props) => {
  //State
  const [phone, setPhone] = React.useState('');
  const onGoBack = () => {
    props.navigation.goBack();
  };

  //keyboard
  const keyboard = useKeyboard();

  //input
  const onChangePhone = (text) => {
    setPhone(text);
  };
  const onGoToTerms = () => {};
  const onGoToPrivacy = () => {};
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title={I18n.t('signUpWithPhone')}
            onBack={() => onGoBack()}
          />
          <View style={styles.form}>
            {/* <Text style={styles.label}>Số điện thoại của bạn</Text> */}
            <TextInputBorderBottom
              hint={I18n.t('fullname')}
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              style={styles.textInput}
              autoFocus={true}
            />
            <TextInputBorderBottom
              hint={I18n.t('yourPhone')}
              value={phone}
              onChangeText={(text) => onChangePhone(text)}
              style={styles.textInput}
              autoFocus={true}
              keyboardType="phone-pad"
            />
            <ButtonRounded
              label={I18n.t('signUp')}
              style={styles.button}
              disabled={true}
            />
          </View>
          {!keyboard.keyboardShown && (
            <View>
              <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.labelDivider}>
                  {I18n.t('otherLoginOptions')}
                </Text>
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
                  <Image
                    source={IC_ZALO}
                    resizeMode="contain"
                    style={styles.socialBtn}
                  />
                  <Zalo />
                </TouchableOpacity>
                {Platform.OS === 'ios' && (
                  <TouchableOpacity style={styles.socialBtnWrapper}>
                    <AppleBlack />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.privacyWrapper}>
                <Text style={styles.noticeText}>
                  {I18n.t('signUpPolicyNoti')}
                </Text>
                <View style={styles.btnRowWrapper}>
                  <TextButton
                    onPress={() => onGoToTerms()}
                    label={I18n.t('termOfUse')}
                    labelStyle={styles.privacyButton}
                  />
                  <Text style={styles.noticeText}>{I18n.t('and')}</Text>
                  <TextButton
                    onPress={() => onGoToPrivacy()}
                    label={I18n.t('privacyPolicy')}
                    labelStyle={styles.privacyButton}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
