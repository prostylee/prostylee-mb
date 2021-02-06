import React from 'react';
import {Text, View, Dimensions, Platform, TouchableOpacity} from 'react-native';

import {
  ContainerWithoutScrollView,
  Image,
  TextInputBorderBottom,
  ButtonRounded,
  TextButton,
} from 'components';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import styles from './styles';
import * as RootNavigator from 'navigator/rootNavigator';

//IMG
const IMG_LOGO = require('assets/images/logoBlack.png');

//ICONS
const IC_EYE = require('assets/icons/eye.png');
const IC_FACEBOOK = require('assets/icons/facebook.png');
const IC_GOOGLE = require('assets/icons/google.png');
const IC_ZALO = require('assets/icons/zalo.png');
const IC_APPLE = require('assets/icons/appleBlack.png');
const IC_PHONE = require('assets/icons/phone-outline.png');

const initialLayout = {width: Dimensions.get('window').width};

const Index = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'login', title: 'Đăng Nhập'},
    {key: 'signup', title: 'Đăng Ký'},
  ]);

  //handle funcs
  const onGoToTerms = () => {};
  const onGoToPrivacy = () => {};

  const renderScene = SceneMap({
    login: LoginTab,
    signup: SignupTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      labelStyle={styles.labelStyle}
      renderLabel={renderLabel}
    />
  );

  const renderLabel = ({route, focused, color}) => (
    <View style={styles.labelWrapper}>
      <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>
        {route.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <View style={styles.logoWrapper}>
            <Image source={IMG_LOGO} style={styles.logo} resizeMode="contain" />
          </View>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
          />
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.labelDivider}>Hoặc đăng nhập bằng</Text>
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
          {index === 1 && (
            <View style={styles.privacyWrapper}>
              <Text style={styles.noticeText}>
                Bằng việc đăng kí, bạn đã đồng ý với chúng tôi về
              </Text>
              <View style={styles.btnRowWrapper}>
                <TextButton
                  onPress={() => onGoToTerms()}
                  label="Điều khoản dịch vụ"
                  labelStyle={styles.privacyButton}
                />
                <Text style={styles.noticeText}>và</Text>
                <TextButton
                  onPress={() => onGoToPrivacy()}
                  label="Chính sách bảo mật"
                  labelStyle={styles.privacyButton}
                />
              </View>
            </View>
          )}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

const LoginTab = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  //textInput
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };

  //handle funcs
  const onLogin = () => {};
  const onLoginWithPhone = () => {
    RootNavigator.navigate('LoginViaPhone');
  };
  const onForgotPw = () => {};

  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputBorderBottom
          hint="Email"
          value={email}
          onChangeText={(text) => onChangeEmail(text)}
          textInputStyle={styles.textInput}
        />
        <TextInputBorderBottom
          hint="Mật khẩu"
          value={password}
          onChangeText={(text) => onChangePassword(text)}
          textInputStyle={styles.textInput}
          icon={IC_EYE}
          secureTextEntry={true}
        />
        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onLogin()}
            label="Đăng Nhập"
            disabled={false}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TextButton
            onPress={() => onLoginWithPhone()}
            labelStyle={styles.textBtnLabel}
            label="Đăng nhập bằng số điện thoại"
          />
        </View>
        <View>
          <TextButton
            onPress={() => onForgotPw()}
            labelStyle={styles.labelBtn}
            label="Quên mật khẩu?"
          />
        </View>
      </View>
    </View>
  );
};

const SignupTab = () => {
  const [email, setEmail] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [activeBtnSignUp, setActiveBtnSignUp] = React.useState(false);

  //textInput
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };
  const onChangeFullname = (value) => {
    setFullname(value);
  };

  //handle funcs
  const onSignUp = () => {};
  const onSignUpWithPhone = () => {};
  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputBorderBottom
          hint="Họ tên"
          value={fullname}
          onChangeText={(text) => onChangeFullname(text)}
          textInputStyle={styles.textInput}
        />
        <TextInputBorderBottom
          hint="Email"
          value={email}
          onChangeText={(text) => onChangeEmail(text)}
          textInputStyle={styles.textInput}
        />
        <TextInputBorderBottom
          hint="Mật khẩu"
          value={password}
          onChangeText={(text) => onChangePassword(text)}
          textInputStyle={styles.textInput}
          icon={IC_EYE}
          secureTextEntry={true}
        />
        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onSignUp()}
            label="Đăng Ký"
            disabled={true}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TextButton
            icon={({size, color}) => (
              <Image
                source={IC_PHONE}
                style={{width: size, height: size, tintColor: color}}
              />
            )}
            onPress={() => onSignUpWithPhone()}
            labelStyle={styles.iconTextLabel}
            label="Đăng ký bằng số điện thoại"
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
