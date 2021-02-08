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
import {useKeyboard, useBackHandler} from '@react-native-community/hooks';

import styles from './styles';
import * as RootNavigator from 'navigator/rootNavigator';
import I18n from 'i18n';
import _ from 'lodash';

import {userActions, commonActions} from 'reducers';
import {useDispatch} from 'react-redux';

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

const Index = (props) => {
  const [index, setIndex] = React.useState(0);
  const keyboard = useKeyboard();

  //UseEffect
  React.useEffect(() => {
    const tabIndex = props.route.params?.index;
    if (tabIndex === 1) {
      setIndex(tabIndex);
    }
  }, []);

  //BackHandler handle
  useBackHandler(() => {
    if (props.route.name === 'Login') {
      props.navigation.goBack();
      return true;
    }
  });

  //initial Tabs
  const [routes] = React.useState([
    {key: 'login', title: I18n.t('login')},
    {key: 'signup', title: I18n.t('signUp')},
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
                    {I18n.t('signUpPolicyNoti')}
                  </Text>
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
              )}
            </View>
          )}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

const LoginTab = () => {
  //Initial States
  const [email, setEmail] = React.useState('');
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [errEmailMsg, setErrEmailMsg] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [errPasswordMsg, setErrPasswordMsg] = React.useState('');
  const [disabledLoginBtn, setDisabledLoginBtn] = React.useState(false);
  const [isVisiblePw, setVisiblePw] = React.useState(true);

  //useEffect
  React.useEffect(() => {
    if (
      invalidEmail ||
      invalidPassword ||
      _.isEmpty(email) ||
      _.isEmpty(password)
    ) {
      setDisabledLoginBtn(true);
    } else {
      setDisabledLoginBtn(false);
    }
  }, [invalidEmail, invalidPassword, email, password]);

  //Dispatch Redux
  const dispatch = useDispatch();

  //textInput
  const onChangeEmail = async (value) => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (reg.test(value) === false) {
        setEmail(value.toLowerCase());
        setInvalidEmail(true);
        setErrEmailMsg('Email không hợp lệ');
        return false;
      } else {
        //email hợp lệ
        setEmail(value.toLowerCase());
        setInvalidEmail(false);
        setErrEmailMsg('');
      }
    } else {
      //nếu textInput rỗng
      setEmail(value);
      setInvalidEmail(false);
      setErrEmailMsg('');
    }
  };
  const onChangePassword = async (value) => {
    setPassword(value);
    setInvalidPassword(false);
    setErrPasswordMsg('');
  };

  //handle funcs
  const onLoginWithPhone = () => {
    RootNavigator.navigate('LoginViaPhone');
  };
  const onForgotPw = () => {
    RootNavigator.navigate('ForgotPassword');
  };

  const onTogglePasswordVisibility = () => {
    setVisiblePw(!isVisiblePw);
  };

  //handle User login
  const onLogin = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userLogin({
        email,
        password,
        onSuccess: () => onLoginSuccess(),
      }),
    );
  };

  const onLoginSuccess = async (data) => {
    dispatch(commonActions.toggleLoading(false));
  };

  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputBorderBottom
          hint={I18n.t('email')}
          value={email}
          onChangeText={(text) => onChangeEmail(text)}
          textInputStyle={styles.textInput}
          keyboardType="email-address"
        />
        {invalidEmail && <Text style={styles.errMsg}>{errEmailMsg}</Text>}
        <TextInputBorderBottom
          hint={I18n.t('password')}
          value={password}
          onChangeText={(text) => onChangePassword(text)}
          textInputStyle={styles.textInput}
          icon={IC_EYE}
          secureTextEntry={isVisiblePw}
          onPressIcon={() => onTogglePasswordVisibility()}
        />
        {invalidPassword && <Text style={styles.errMsg}>{errPasswordMsg}</Text>}
        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onLogin()}
            label={I18n.t('login')}
            disabled={disabledLoginBtn}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TextButton
            onPress={() => onLoginWithPhone()}
            labelStyle={styles.textBtnLabel}
            label={I18n.t('loginWithPhone')}
          />
        </View>
        <View>
          <TextButton
            onPress={() => onForgotPw()}
            labelStyle={styles.labelBtn}
            label={I18n.t('forgotPw')}
          />
        </View>
      </View>
    </View>
  );
};

const SignupTab = () => {
  //Initial States
  const [fullname, setFullname] = React.useState('');
  const [invalidFullname, setInvalidFullname] = React.useState(false);
  const [errFullnameMsg, setErrFullnameMsg] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [errEmailMsg, setErrEmailMsg] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [errPasswordMsg, setErrPasswordMsg] = React.useState('');
  const [disabledSignUpBtn, setDisabledSignUpBtn] = React.useState(false);
  const [isVisiblePw, setVisiblePw] = React.useState(true);

  //useEffect
  React.useEffect(() => {
    if (
      invalidEmail ||
      invalidPassword ||
      invalidFullname ||
      _.isEmpty(email) ||
      _.isEmpty(fullname) ||
      _.isEmpty(password)
    ) {
      setDisabledSignUpBtn(true);
    } else {
      setDisabledSignUpBtn(false);
    }
  }, [
    invalidEmail,
    invalidPassword,
    invalidFullname,
    fullname,
    email,
    password,
  ]);

  //Dispatch Redux
  const dispatch = useDispatch();

  //textInput
  const onChangeFullname = async (value) => {
    let reg = /^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ"+"ụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s]{1,50}$/;
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (reg.test(value) === false) {
        setFullname(value);
        setInvalidFullname(true);
        setErrFullnameMsg('Họ tên không hợp lệ');
        return false;
      } else {
        //email hợp lệ
        setFullname(value);
        setInvalidFullname(false);
        setErrFullnameMsg('');
      }
    } else {
      //nếu textInput rỗng
      setFullname(value);
      setInvalidFullname(false);
      setErrFullnameMsg('');
    }
  };

  const onChangeEmail = async (value) => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (reg.test(value) === false) {
        setEmail(value.toLowerCase());
        setInvalidEmail(true);
        setErrEmailMsg('Email không hợp lệ');
        return false;
      } else {
        //email hợp lệ
        setEmail(value.toLowerCase());
        setInvalidEmail(false);
        setErrEmailMsg('');
      }
    } else {
      //nếu textInput rỗng
      setEmail(value);
      setInvalidEmail(false);
      setErrEmailMsg('');
    }
  };
  const onChangePassword = async (value) => {
    let reg = /^.{4,50}$/;
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (reg.test(value) === false) {
        setPassword(value);
        setInvalidPassword(true);
        setErrPasswordMsg('Mật khẩu không được ít hơn 4 kí tự');
        return false;
      } else {
        //email hợp lệ
        setPassword(value);
        setInvalidPassword(false);
        setErrPasswordMsg('');
      }
    } else {
      //nếu textInput rỗng
      setPassword(value);
      setInvalidPassword(false);
      setErrPasswordMsg('');
    }
  };

  //handle funcs
  const onSignUpWithPhone = () => {
    RootNavigator.navigate('SignUpViaPhone');
  };

  const onTogglePasswordVisibility = () => {
    setVisiblePw(!isVisiblePw);
  };

  //handle User login
  const onSignUp = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userSignUp({
        fullname,
        email,
        password,
        onSuccess: () => onSignUpSuccess(),
      }),
    );
  };

  const onSignUpSuccess = async () => {
    dispatch(commonActions.toggleLoading(false));
  };
  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputBorderBottom
          hint={I18n.t('fullname')}
          value={fullname}
          onChangeText={(text) => onChangeFullname(text)}
          textInputStyle={styles.textInput}
        />
        {invalidFullname && <Text style={styles.errMsg}>{errFullnameMsg}</Text>}
        <TextInputBorderBottom
          hint={I18n.t('email')}
          value={email}
          onChangeText={(text) => onChangeEmail(text)}
          textInputStyle={styles.textInput}
        />
        {invalidEmail && <Text style={styles.errMsg}>{errEmailMsg}</Text>}
        <TextInputBorderBottom
          hint={I18n.t('password')}
          value={password}
          onChangeText={(text) => onChangePassword(text)}
          textInputStyle={styles.textInput}
          icon={IC_EYE}
          secureTextEntry={isVisiblePw}
          onPressIcon={() => onTogglePasswordVisibility()}
        />
        {invalidPassword && <Text style={styles.errMsg}>{errPasswordMsg}</Text>}
        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onSignUp()}
            label={I18n.t('signUp')}
            disabled={disabledSignUpBtn}
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
            label={I18n.t('signUpWithPhone')}
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
