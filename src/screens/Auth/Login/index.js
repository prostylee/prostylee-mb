import React from 'react';
import {Text, View, Dimensions, Platform, TouchableOpacity} from 'react-native';

import {
  Container,
  ButtonRounded,
  TextButton,
  TextInputFloatingLabel,
} from 'components';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useKeyboard, useBackHandler} from '@react-native-community/hooks';

import styles from './styles';
import * as RootNavigator from 'navigator/rootNavigator';
import I18n from 'i18n';
import _ from 'lodash';

import {userActions, commonActions} from 'reducers';
import {useDispatch} from 'react-redux';
import {
  LogoBlack,
  Facebook,
  Google,
  AppleBlack,
  Eye,
  Phone,
  Zalo,
} from 'svg/common';

import {emailRegex, passwordRegex, fullNameRegex} from 'utils/common';

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
      <Container>
        <View style={styles.mainWrapper}>
          <View style={styles.logoWrapper}>
            <LogoBlack />
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
              {index === 1 && (
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
              )}
            </View>
          )}
        </View>
      </Container>
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
  const [isShowErrMsg, toggleShowErrMsg] = React.useState(false);
  const [isFocusEmailInput, setFocusEmailInput] = React.useState(false);
  const [isFocusPasswordInput, setFocusPasswordInput] = React.useState(false);
  const [isShowPasswordErrMsg, toggleShowPasswordErrMsg] = React.useState(
    false,
  );

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
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (emailRegex.test(value) === false) {
        setEmail(value);
        setInvalidEmail(true);
        setErrEmailMsg(I18n.t('invalidEmail'));
        toggleShowErrMsg(false);
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

  const onBlurEmailInput = () => {
    if (invalidEmail) {
      toggleShowErrMsg(true);
    }
    setFocusEmailInput(false);
  };

  const onFocusEmailInput = () => {
    setFocusEmailInput(true);
  };

  const onFocusPasswordInput = () => {
    setFocusPasswordInput(true);
  };

  const onBlurPasswordInput = () => {
    if (invalidPassword) {
      toggleShowPasswordErrMsg(true);
    }
    setFocusPasswordInput(false);
  };

  const onChangePassword = async (value) => {
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (passwordRegex.test(value) === false) {
        setPassword(value);
        setInvalidPassword(true);
        setErrPasswordMsg(I18n.t('invalidPassword'));
        toggleShowPasswordErrMsg(false);
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
  const onLoginWithPhone = () => {
    RootNavigator.navigate('LoginViaPhone');
  };
  const onForgotPw = () => {
    RootNavigator.navigate('ForgotPassword');
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

  const onLoginSuccess = async () => {
    dispatch(commonActions.toggleLoading(false));
  };

  return (
    <View style={styles.tabViewWrapper}>
      <View style={styles.form}>
        <TextInputFloatingLabel
          value={email}
          placeholder={I18n.t('email')}
          onChangeText={(text) => onChangeEmail(text)}
          keyboardType="email-address"
          onBlur={() => onBlurEmailInput()}
          onFocus={() => onFocusEmailInput()}
          isFocused={isFocusEmailInput}
        />
        {isShowErrMsg && invalidEmail && (
          <Text style={styles.errMsg}>{errEmailMsg}</Text>
        )}
        <TextInputFloatingLabel
          value={password}
          placeholder={I18n.t('password')}
          onChangeText={(text) => onChangePassword(text)}
          iconShow={<Eye />}
          iconHide={<Eye />}
          secureTextEntry={true}
          onBlur={() => onBlurPasswordInput()}
          onFocus={() => onFocusPasswordInput()}
          isFocused={isFocusPasswordInput}
        />
        {isShowPasswordErrMsg && invalidPassword && (
          <Text style={styles.errMsg}>{errPasswordMsg}</Text>
        )}
        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onLogin()}
            label={I18n.t('login')}
            disabled={disabledLoginBtn}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TextButton
            icon={({size, color}) => <Phone />}
            onPress={() => onLoginWithPhone()}
            labelStyle={styles.iconTextLabel}
            label={I18n.t('loginWithPhone')}
          />
        </View>
        <View>
          <TextButton
            onPress={() => onForgotPw()}
            labelStyle={styles.labelBtn}
            label={I18n.t('forgotPassword')}
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
  const [isShowFullNameErrMsg, toggleShowFullNameErrMsg] = React.useState(
    false,
  );
  const [isShowEmailErrMsg, toggleShowEmailErrMsg] = React.useState(false);
  const [isShowPasswordErrMsg, toggleShowPasswordErrMsg] = React.useState(
    false,
  );
  const [isFocusFullNameInput, setFocusFullNameInput] = React.useState(false);
  const [isFocusEmailInput, setFocusEmailInput] = React.useState(false);
  const [isFocusPasswordInput, setFocusPasswordInput] = React.useState(false);

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
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (fullNameRegex.test(value) === false) {
        setFullname(value);
        setInvalidFullname(true);
        setErrFullnameMsg(I18n.t('invalidFullname'));
        toggleShowFullNameErrMsg(false);
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

  const onBlurFullNameInput = () => {
    if (invalidFullname) {
      toggleShowFullNameErrMsg(true);
    }
    setFocusFullNameInput(false);
  };

  const onFocusFullNameInput = () => {
    setFocusFullNameInput(true);
  };

  const onChangeEmail = async (value) => {
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (emailRegex.test(value) === false) {
        setEmail(value);
        setInvalidEmail(true);
        setErrEmailMsg(I18n.t('invalidEmail'));
        toggleShowEmailErrMsg(false);
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

  const onBlurEmailInput = () => {
    if (invalidEmail) {
      toggleShowEmailErrMsg(true);
    }
    setFocusEmailInput(false);
  };

  const onFocusEmailInput = () => {
    setFocusEmailInput(true);
  };

  const onChangePassword = async (value) => {
    if (!_.isEmpty(value)) {
      //nếu textInput có giá trị khác rỗng
      if (passwordRegex.test(value) === false) {
        setPassword(value);
        setInvalidPassword(true);
        setErrPasswordMsg(I18n.t('invalidPassword'));
        toggleShowPasswordErrMsg(false);
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

  const onBlurPasswordInput = () => {
    if (invalidPassword) {
      toggleShowPasswordErrMsg(true);
    }
    setFocusPasswordInput(false);
  };

  const onFocusPasswordInput = () => {
    setFocusPasswordInput(true);
  };

  //handle funcs
  const onSignUpWithPhone = () => {
    RootNavigator.navigate('SignUpViaPhone');
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
        <TextInputFloatingLabel
          placeholder={I18n.t('fullname')}
          value={fullname}
          onChangeText={(text) => onChangeFullname(text)}
          textInputStyle={styles.textInput}
          onBlur={() => onBlurFullNameInput()}
          onFocus={() => onFocusFullNameInput()}
          isFocused={isFocusFullNameInput}
        />
        {isShowFullNameErrMsg && invalidFullname && (
          <Text style={styles.errMsg}>{errFullnameMsg}</Text>
        )}
        <TextInputFloatingLabel
          placeholder={I18n.t('email')}
          value={email}
          onChangeText={(text) => onChangeEmail(text)}
          textInputStyle={styles.textInput}
          keyboardType="email-address"
          onBlur={() => onBlurEmailInput()}
          onFocus={() => onFocusEmailInput()}
          isFocused={isFocusEmailInput}
        />
        {isShowEmailErrMsg && invalidEmail && (
          <Text style={styles.errMsg}>{errEmailMsg}</Text>
        )}
        <TextInputFloatingLabel
          placeholder={I18n.t('password')}
          value={password}
          onChangeText={(text) => onChangePassword(text)}
          textInputStyle={styles.textInput}
          iconShow={<Eye />}
          iconHide={<Eye />}
          secureTextEntry={true}
          onBlur={() => onBlurPasswordInput()}
          onFocus={() => onFocusPasswordInput()}
          isFocused={isFocusPasswordInput}
        />
        {isShowPasswordErrMsg && invalidPassword && (
          <Text style={styles.errMsg}>{errPasswordMsg}</Text>
        )}
        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={() => onSignUp()}
            label={I18n.t('signUp')}
            disabled={disabledSignUpBtn}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TextButton
            icon={({size, color}) => <Phone />}
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
