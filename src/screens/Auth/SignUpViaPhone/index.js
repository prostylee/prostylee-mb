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

import I18n from 'i18n';

import styles from './styles';

//ICONS
const IC_FACEBOOK = require('assets/icons/facebook.png');
const IC_GOOGLE = require('assets/icons/google.png');
const IC_ZALO = require('assets/icons/zalo.png');
const IC_APPLE = require('assets/icons/appleBlack.png');

const Index = (props) => {
  //State
  const [phone, setPhone] = React.useState('');
  const onGoBack = () => {
    props.navigation.goBack();
  };

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
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.labelDivider}>
              {I18n.t('otherLoginOptions')}
            </Text>
            <View style={styles.line} />
          </View>
          <View style={styles.socialLogin}>
            <TouchableOpacity style={styles.socialBtnWrapper}>
              <Image
                source={IC_FACEBOOK}
                resizeMode="contain"
                style={styles.socialBtn}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtnWrapper}>
              <Image
                source={IC_GOOGLE}
                resizeMode="contain"
                style={[styles.socialBtn, styles.btnBordered]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtnWrapper}>
              <Image
                source={IC_ZALO}
                resizeMode="contain"
                style={styles.socialBtn}
              />
            </TouchableOpacity>
            {Platform.OS === 'ios' && (
              <TouchableOpacity style={styles.socialBtnWrapper}>
                <Image
                  source={IC_APPLE}
                  resizeMode="contain"
                  style={styles.socialBtn}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.privacyWrapper}>
            <Text style={styles.noticeText}>{I18n.t('signUpPolicyNoti')}</Text>
            <View style={styles.btnRowWrapper}>
              <TextButton
                onPress={() => onGoToTerms()}
                label={I18n.t('policy1')}
                labelStyle={styles.privacyButton}
              />
              <Text style={styles.noticeText}>{I18n.t('and')}</Text>
              <TextButton
                onPress={() => onGoToPrivacy()}
                label={I18n.t('policy2')}
                labelStyle={styles.privacyButton}
              />
            </View>
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
