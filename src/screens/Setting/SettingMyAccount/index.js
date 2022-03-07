import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {
  Header,
  ThemeView,
  CustomTextInput,
  RnDateTimePicker,
  ActionSheet,
} from 'components';
import {showMessage} from 'react-native-flash-message';
import {Camera} from 'svg/common';
import styles from './styles';
import I18n from 'i18n';
import {Field, Formik} from 'formik';
import {useBackHandler} from '@react-native-community/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {userSelectors, userActions, commonActions} from 'reducers';
import ImagePicker from 'react-native-image-crop-picker';
import {userTokenSelector} from 'redux/selectors/user';
import * as ImageManipulator from '@pontusab/react-native-image-manipulator';

import {
  validateEmail,
  validateFullname,
  validatePhone,
  validateUsername,
} from 'utils/validatorUtils';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import {Storage} from 'aws-amplify';

const CANCEL_INDEX = 0;
// const DESTRUCTIVE_INDEX = 0;
const PICK_IMAGE_OPTIONS = ['Huỷ', 'Chọn từ bộ sưu tập ảnh', 'Chụp hình'];
const PICK_GENDER_OPTIONS_ANDROID = ['Huỷ', I18n.t('male'), I18n.t('female')];

const SettingMyAccount = () => {
  const navigation = useNavigation();

  const actionSheetRef = React.useRef();

  const profile = useSelector((state) => userTokenSelector(state));

  const sub = profile?.signInUserSession?.idToken?.payload?.sub;

  const dispatch = useDispatch();

  const userProfile =
    useSelector((state) => userSelectors.getUserProfile(state)) || {};

  const [userAvatar, setUserAvatar] = React.useState({
    name: '',
    path: userProfile?.avatar || '',
  });

  const name = userProfile.fullName ? userProfile.fullName : '';

  const username = userProfile.username ? userProfile.username : '';

  const bio = userProfile.bio ? userProfile.bio : '';

  const gender = userProfile.gender
    ? userProfile.gender == 'M'
      ? I18n.t('male')
      : userProfile.gender == 'F'
      ? I18n.t('female')
      : ''
    : '';
  const phone = userProfile.phoneNumber ? userProfile.phoneNumber : '';

  const email = userProfile.email ? userProfile.email : '';

  let birthday = '';

  if (userProfile.date && userProfile.month && userProfile.year) {
    birthday = `${userProfile.date}/${userProfile.month}/${userProfile.year}`;
  }

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [isChange, setisChange] = React.useState(false);

  const birthdayRef = React.useRef();

  const phoneRef = React.useRef();

  const genderRef = React.useRef();

  const updateUserProfile = async (payload) => {
    navigation.goBack();
    try {
      const birthdayValue = payload.birthday;
      const listDate = birthdayValue.split('/');
      const birthdayData = {
        date: Number(listDate[0]),
        month: Number(listDate[1]),
        year: Number(listDate[2]),
      };
      let userGender = '';
      if (payload.gender === I18n.t('male')) {
        userGender = 'M';
      } else if (payload.gender === I18n.t('female')) {
        userGender = 'F';
      } else {
        showMessage({
          message: I18n.t('error.formError'),
          type: 'danger',
          position: 'top',
        });
        return;
      }
      const hasNewAvatar = userProfile?.avatar !== userAvatar?.path;
      if (hasNewAvatar) {
        uploadToStorage(userAvatar?.path, {
          ...payload,
          userGender,
          birthdayData,
        });
        return;
      }
      dispatch(
        userActions.updateUserProfile({
          fullName: payload.name,
          gender: userGender,
          bio: payload.bio,
          phoneNumber: payload.phone,
          email: payload.email,
          username: payload.username,
          ...birthdayData,
        }),
      );
    } catch (e) {
      showMessage({
        message: I18n.t('error.formError'),
        type: 'danger',
        position: 'top',
      });
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  };
  const onCaptureImagePress = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 600,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((res) => {
        let image = {
          path: res?.path,
          name: res.filename,
          id: `${new Date().valueOf()}-${res?.filename}`,
        };
        setUserAvatar(image);
      })
      .catch((e) => {
        // showMessage({
        //   message: I18n.t('unknownMessage'),
        //   type: 'danger',
        //   position: 'top',
        // });
      });
  };

  const onPickImagePress = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      maxFiles: 1,
      cropping: true,
      width: 600,
      height: 600,
    })
      .then((res) => {
        let image = {
          path: res?.path,
          name: res.filename,
          id: `${new Date().valueOf()}-${res?.filename}`,
        };
        setUserAvatar(image);
      })
      .catch((e) => {
        // showMessage({
        //   message: I18n.t('unknownMessage'),
        //   type: 'danger',
        //   position: 'top',
        // });
      });
  };

  const updateUserAvatar = async (name, payload = {}, path = '') => {
    dispatch(
      userActions.updateUserProfile({
        fullName: payload.name,
        gender: payload.userGender,
        bio: payload.bio,
        phoneNumber: payload.phone,
        email: payload.email,
        ...payload.birthdayData,
        avatarImageInfo: {
          name: name,
          path: path,
        },
      }),
    );
    navigation.goBack();
  };
  const uploadToStorage = async (uri, payload = {}) => {
    try {
      if (!uri) {
        return;
      }
      const pngImageResult = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 1,
        format: ImageManipulator.SaveFormat.PNG,
      });
      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(pngImageResult.uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${sub}/avatar/avatar_${time}.png`;
      Storage.put(fileName, blob, {
        contentType: 'image/png',
      })
        .then(async (result) => {
          const path = 'public/';

          await updateUserAvatar(result?.key, payload, path);
        })
        .catch((_) => {
          showMessage({
            message: I18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
        });
    } catch (err) {
      showMessage({
        message: I18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  };

  React.useEffect(() => {
    return () => {
      ImagePicker.clean()
        .then((res) => {})
        .catch((err) => {});
    };
  }, []);

  //add *
  const setLabelTextInput = (text, target) => {
    return (
      <Text>
        {text}
        {target ? <Text style={{color: 'red'}}>{'  *'}</Text> : ''}
      </Text>
    );
  };

  const onSubmitResetPass = async (formValues) => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userForgotPassword({
        email: formValues.email,
        onSuccess: () => onUserForgotPasswordSuccess(formValues),
      }),
    );
  };

  const onUserForgotPasswordSuccess = async (formValues) => {
    await dispatch(commonActions.toggleLoading(false));
    navigation.navigate('ResetPassword', {email: formValues.email});
  };

  //BackHandler handle
  useBackHandler(() => {
    isChange || userAvatar.name !== '' ? showAlert() : navigation.goBack();
    return true;
  });

  function showAlert() {
    Alert.alert(
      I18n.t('settingProfile.alertTitle'),
      I18n.t('settingProfile.alert'),
      [
        {
          text: I18n.t('settingProfile.alertOK'),
          onPress: () => {
            navigation.goBack();
          },
        },
        {text: I18n.t('settingProfile.alertCancel'), onPress: () => {}},
      ],
    );
  }

  return (
    <ThemeView isFullView style={styles.container}>
      <Formik
        validateOnMount={true}
        initialValues={{
          name,
          username,
          bio,
          gender,
          birthday,
          phone,
          email,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          dispatch(commonActions.toggleLoading(true));
          setTimeout(() => {
            updateUserProfile(values);
          }, 500);
        }}>
        {({handleSubmit, setFieldValue, values, isValid}) => {
          const changeBirthday = (value) => {
            const dateTime = moment(value);
            const year = dateTime.get('year');
            const month = dateTime.get('month') + 1;
            const date = dateTime.get('date');
            setFieldValue('birthday', `${date}/${month}/${year}`);
            setTimeout(() => {
              phoneRef.current.forceFocus();
            }, 500);
          };
          const birthDayValue = moment(values.birthday, 'DD/MM/YYYY');
          return (
            <>
              <KeyboardAvoidingView
                style={styles.contentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Header
                  title={I18n.t('setting.profile')}
                  titleStyle={styles.titleStyle}
                  leftComponent={
                    <TouchableOpacity
                      onPress={navigation.goBack}
                      style={styles.headerLeft}>
                      <Text style={styles.headerText}>{I18n.t('cancel')}</Text>
                    </TouchableOpacity>
                  }
                  rightComponent={
                    <TouchableOpacity
                      onPress={handleSubmit}
                      disabled={
                        !isValid ||
                        values.fullname === '' ||
                        values.email === '' ||
                        values.password === ''
                      }
                      style={styles.headerRight}>
                      <Text
                        style={
                          !isValid ||
                          values.fullname === '' ||
                          values.email === '' ||
                          values.password === ''
                            ? styles.headerTextDisabled
                            : styles.headerText
                        }>
                        {I18n.t('done')}
                      </Text>
                    </TouchableOpacity>
                  }
                  preventGobackFunction={
                    isChange || userAvatar.name !== '' ? showAlert : ''
                  }
                />
                <ScrollView>
                  <View style={styles.imageView}>
                    <Image
                      source={
                        userAvatar?.path
                          ? {uri: userAvatar?.path}
                          : require('assets/images/default.png')
                      }
                      style={styles.avatar}
                    />
                    <View style={styles.imageViewButton}>
                      <TouchableOpacity
                        style={styles.buttonView}
                        onPress={() => {
                          actionSheetRef.current.show();
                        }}>
                        <Camera color="#FFFFFF" />
                        <Text style={styles.imageViewButtonText}>
                          {I18n.t('settingProfile.changeImage')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.inputView}>
                    <Field
                      component={CustomTextInput}
                      name="name"
                      validate={validateFullname}
                      label={setLabelTextInput(
                        I18n.t('settingProfile.name'),
                        true,
                      )}
                      onChange={() => {
                        setisChange(true);
                      }}
                    />
                    <Field
                      component={CustomTextInput}
                      editable={false}
                      name="username"
                      // validate={validateUsername}
                      label={setLabelTextInput(
                        I18n.t('settingProfile.username'),
                        true,
                      )}
                      onChange={() => {
                        setisChange(true);
                      }}
                    />
                    <Field
                      component={CustomTextInput}
                      name="bio"
                      label={setLabelTextInput(
                        I18n.t('settingProfile.bio'),
                        false,
                      )}
                      onChange={() => {
                        setisChange(true);
                      }}
                    />

                    <Field
                      component={CustomTextInput}
                      name="gender"
                      label={setLabelTextInput(
                        I18n.t('settingProfile.gender'),
                        true,
                      )}
                      onFocus={() => {
                        genderRef.current.show();
                      }}
                      onChange={() => {
                        setisChange(true);
                      }}
                    />
                    <Field
                      component={CustomTextInput}
                      name="birthday"
                      label={setLabelTextInput(
                        I18n.t('settingProfile.birthday'),
                        true,
                      )}
                      onFocus={() => setShowDatePicker(true)}
                      innerRef={birthdayRef}
                      onPress={() => setShowDatePicker(true)}
                      onChange={() => {
                        setisChange(true);
                      }}
                    />
                    <Field
                      component={CustomTextInput}
                      validate={validatePhone}
                      name="phone"
                      innerRef={phoneRef}
                      onValueChange={(value) => {
                        values.phone = value;
                        setisChange(true);
                      }}
                      label={setLabelTextInput(
                        I18n.t('settingProfile.phone'),
                        true,
                      )}
                      onChange={() => {
                        setisChange(true);
                      }}
                    />
                    <Field
                      component={CustomTextInput}
                      validate={validateEmail}
                      name="email"
                      label={setLabelTextInput(
                        I18n.t('settingProfile.email'),
                        true,
                      )}
                      onValueChange={() => setisChange(true)}
                      onChange={() => {
                        setisChange(true);
                      }}
                      editable={email ? false : true}
                    />

                    <View style={styles.bottomActions}>
                      <TouchableOpacity
                        style={styles.bottomActionsBtn}
                        onPress={() => onSubmitResetPass({email: email})}>
                        <Text style={styles.bottomActionsText}>
                          {I18n.t('settingProfile.changePass')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.bottomActionsBtn, styles.paddingTop12]}
                        onPress={() => navigation.navigate('SettingAddress')}>
                        <Text style={styles.bottomActionsText}>
                          {I18n.t('settingProfile.manageAddress')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <RnDateTimePicker
                      visible={showDatePicker}
                      maxDate={new Date()}
                      onClose={() => {
                        changeBirthday(birthDayValue);
                        setShowDatePicker(false);
                      }}
                      mode={'date'}
                      onValueChange={(value) => {
                        changeBirthday(value);
                        setShowDatePicker(false);
                      }}
                    />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
              <ActionSheet
                ref={actionSheetRef}
                options={PICK_IMAGE_OPTIONS}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(value) => {
                  setTimeout(() => {
                    if (value === 1) {
                      onPickImagePress();
                      return;
                    }
                    if (value === 2) {
                      onCaptureImagePress();
                    }
                  }, 500);
                }}
              />
              <ActionSheet
                ref={genderRef}
                options={PICK_GENDER_OPTIONS_ANDROID}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(value) => {
                  if (value === 0) {
                    birthdayRef.current.forceFocus();
                    return;
                  }
                  if (value === 1) {
                    setFieldValue('gender', I18n.t('male'));
                    birthdayRef.current.forceFocus();
                    return;
                  }
                  if (value === 2) {
                    setFieldValue('gender', I18n.t('female'));
                    birthdayRef.current.forceFocus();
                  }
                }}
              />
            </>
          );
        }}
      </Formik>
    </ThemeView>
  );
};

SettingMyAccount.defaultProps = {};

export default SettingMyAccount;
