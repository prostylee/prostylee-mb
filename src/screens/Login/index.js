import React from 'react';
import {Text, View, Dimensions, Platform, TouchableOpacity} from 'react-native';

import {
  ContainerWithoutScrollView,
  Image,
  TextInputBorderBottom,
} from 'components';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {Button} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

import styles from './styles';

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
  const [email, setEmail] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [activeBtnSignUp, setActiveBtnSignUp] = React.useState(false);
  const [routes] = React.useState([
    {key: 'login', title: 'Đăng Nhập'},
    {key: 'signup', title: 'Đăng Ký'},
  ]);

  //Theme
  const {colors} = useTheme();

  //textInput
  const onChangeEmail = (value) => {
    // setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };
  const onChangeFullname = (value) => {
    setFullname(value);
  };

  //handle funcs
  const onLogin = () => {};
  const onLoginWithPhone = () => {};
  const onSignUp = () => {};
  const onSignUpWithPhone = () => {};
  const onForgotPw = () => {};

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
  const onLoginWithPhone = () => {};
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
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => onLogin()}
            style={styles.loginBtn}
            labelStyle={styles.loginBtnLabel}>
            Đăng nhập
          </Button>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            mode="text"
            uppercase={false}
            onPress={() => onLoginWithPhone()}
            labelStyle={styles.textBtnLabel}>
            Đăng nhập bằng số điện thoại
          </Button>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            mode="text"
            uppercase={false}
            onPress={() => onForgotPw()}
            style={styles.textBtn}
            labelStyle={styles.labelBtn}>
            Quên mật khẩu?
          </Button>
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

  //Theme
  const {colors} = useTheme();

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

  //CONST
  const backgroundColor = activeBtnSignUp ? colors['$purple'] : colors['$line'];
  const color = activeBtnSignUp ? colors['$white'] : colors['$lightGray'];
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
          <Button
            mode="contained"
            uppercase={false}
            disabled={!activeBtnSignUp}
            onPress={() => onSignUp()}
            style={[styles.loginBtn, {backgroundColor}]}
            labelStyle={[styles.loginBtnLabel, {color}]}>
            Đăng ký
          </Button>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            mode="text"
            icon={({size, color}) => (
              <Image
                source={IC_PHONE}
                style={{width: size, height: size, tintColor: color}}
              />
            )}
            uppercase={false}
            onPress={() => onSignUpWithPhone()}
            labelStyle={styles.iconTextLabel}>
            Đăng ký bằng số điện thoại
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Index;
