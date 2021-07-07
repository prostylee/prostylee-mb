import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  Header,
  ThemeView,
  CustomTextInput,
  ButtonRounded,
  RnDateTimePicker,
} from 'components';
import {showMessage} from 'react-native-flash-message';
import RNPickerSelect from 'react-native-picker-select';
import {Camera} from 'svg/common';
import styles from './styles';
import I18n from 'i18n';
import {Field, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {userSelectors, userActions} from 'reducers';
import ImagePicker from 'react-native-image-crop-picker';
import {
  validateEmail,
  validateFullname,
  validatePhone,
} from 'utils/validatorUtils';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import {Storage} from 'aws-amplify';

import {updateAvatar} from 'services/api/myPageApi';

const SettingMyAccount = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const [userAvatar, setUserAvatar] = React.useState({
    name: '',
    path: userProfile?.avatar || '',
  });

  const name = userProfile.fullName ? userProfile.fullName : '';

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

  const birthdayRef = React.useRef();

  const phoneRef = React.useRef();

  const genderRef = React.useRef();

  const updateUserProfile = async (payload) => {
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
      await showMessage({
        message: I18n.t('error.formError'),
        type: 'danger',
        position: 'top',
      });
      return;
    }
    const hasNewAvatar = userProfile?.avatar !== userAvatar?.path;
    if (hasNewAvatar) {
      uploadToStorage(userAvatar?.path, payload.name);
    }

    dispatch(
      userActions.updateUserProfile({
        fullName: payload.name,
        gender: userGender,
        bio: payload.bio,
        phoneNumber: payload.phone,
        email: payload.email,
        ...birthdayData,
      }),
    );
    navigation.goBack();
  };

  const onChangeAvaterPress = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      maxFiles: 1,
      cropping: true,
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
        showMessage({
          message: I18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
  };

  const updateUserAvatar = async (key, name, userName = '') => {
    const signedURL = await Storage.get(key);
    const newImg = {
      name: name,
      path: signedURL,
    };
    const res = await updateAvatar({
      fullName: userName,
      avatarImageInfo: {
        name: name,
        path: signedURL,
      },
    });
    if (res.data.status !== 200) {
      showMessage({
        message: I18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
      return;
    }
    setUserAvatar({...userAvatar, ...newImg});
  };
  const uploadToStorage = async (uri, fullName = '') => {
    try {
      if (!uri) {
        return;
      }

      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${userProfile?.id}/avatar/avatar_${time}.jpg`;
      Storage.put(fileName, blob, {
        contentType: 'image/jpeg',
      })
        .then(async (result) => {
          const name = `avatar_${time}.jpg`;
          await updateUserAvatar(result?.key, name, fullName);
        })
        .catch((err) => {
          console.log('PUT ERROR', err);
          showMessage({
            message: I18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
        });
    } catch (err) {
      console.log('UPLOAD ERR', err);
      showMessage({
        message: I18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  };

  return (
    <ThemeView isFullView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header title={I18n.t('setting.profile')} isDefault />
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
                onPress={onChangeAvaterPress}>
                <Camera color="#FFFFFF" />
                <Text style={styles.imageViewButtonText}>
                  {I18n.t('settingProfile.changeImage')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Formik
            validateOnMount={true}
            initialValues={{
              name,
              bio,
              gender,
              birthday,
              phone,
              email,
            }}
            enableReinitialize={true}
            onSubmit={(values) => updateUserProfile(values)}>
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
                <View style={styles.inputView}>
                  <Field
                    component={CustomTextInput}
                    name="name"
                    validate={validateFullname}
                    label={I18n.t('settingProfile.name')}
                  />
                  <Field
                    component={CustomTextInput}
                    name="bio"
                    label={I18n.t('settingProfile.bio')}
                  />

                  <View style={styles.viewDivider} />

                  <Field
                    component={CustomTextInput}
                    name="gender"
                    label={I18n.t('settingProfile.gender')}
                    onFocus={() => {
                      genderRef.current.togglePicker(true);
                    }}
                  />
                  <Field
                    component={CustomTextInput}
                    name="birthday"
                    label={I18n.t('settingProfile.birthday')}
                    onFocus={() => setShowDatePicker(true)}
                    innerRef={birthdayRef}
                    onPress={() => setShowDatePicker(true)}
                  />
                  <Field
                    component={CustomTextInput}
                    validate={validatePhone}
                    name="phone"
                    innerRef={phoneRef}
                    onValueChange={(value) => {
                      values.phone = value;
                    }}
                    label={I18n.t('settingProfile.phone')}
                  />
                  <Field
                    component={CustomTextInput}
                    validate={validateEmail}
                    name="email"
                    label={I18n.t('settingProfile.email')}
                  />

                  <View style={styles.viewDivider} />

                  <Field
                    component={CustomTextInput}
                    name="changePass"
                    label={I18n.t('settingProfile.changePass')}
                  />
                  <View style={styles.viewDivider} />
                  <View style={styles.viewDivider} />

                  <View style={styles.buttonSave}>
                    <ButtonRounded
                      label={I18n.t('settingProfile.buttonSave')}
                      onPress={handleSubmit}
                      disabled={
                        !isValid ||
                        values.fullname === '' ||
                        values.email === '' ||
                        values.password === ''
                      }
                    />
                  </View>
                  <View style={styles.pickerContainer}>
                    <RNPickerSelect
                      ref={genderRef}
                      onValueChange={(value) => {
                        setFieldValue('gender', value);
                      }}
                      items={[
                        {value: I18n.t('male'), label: I18n.t('male')},
                        {value: I18n.t('female'), label: I18n.t('female')},
                      ]}
                      style={styles.pickerContainer}
                    />
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
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemeView>
  );
};

SettingMyAccount.defaultProps = {};

export default SettingMyAccount;
