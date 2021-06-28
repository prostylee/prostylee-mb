import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Header,
  ThemeView,
  CustomTextInput,
  ButtonRounded,
  RnDateTimePicker,
} from 'components';
import RNPickerSelect from 'react-native-picker-select';
import {Camera} from 'svg/common';
import styles from './styles';
import I18n from 'i18n';
import {Field, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {userSelectors} from 'reducers';
import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePhone,
} from '../../../utils/validatorUtils';
import moment from 'moment';
let rerenderGender = 0;

const SettingMyAccount = ({data}) => {
  const {birthday} = data;
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const name = userProfile.fullName ? userProfile.fullName : '';
  const bio = userProfile.bio ? userProfile.bio : '';
  const gender = userProfile.gender
    ? userProfile.gender == 'M'
      ? 'nam'
      : userProfile.gender == 'F'
      ? 'nữ'
      : ''
    : '';
  const phone = userProfile.phone ? userProfile.phone : '';
  const email = userProfile.email ? userProfile.email : '';
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [genderLabel, setGenderLabel] = React.useState(gender);

  const birthdayRef = React.useRef();
  const phoneRef = React.useRef();
  const genderRef = React.useRef();

  console.log('userProfile', JSON.stringify(userProfile, null, 4));

  return (
    <ThemeView isFullView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header title={I18n.t('setting.profile')} isDefault />
        <ScrollView>
          <View style={styles.imageView}>
            <View style={styles.imageViewButton}>
              <TouchableOpacity style={styles.buttonView}>
                <Camera color="white" />
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
            onSubmit={(values) => console.log(JSON.stringify(values, null, 4))}>
            {({handleSubmit, handleChange, values, isValid}) => {
              const changeBirthday = (value) => {
                setShowDatePicker(false);
                const dateTime = moment(value);
                const year = dateTime.get('year');
                const month = dateTime.get('month');
                const date = dateTime.get('date');
                values.birthday = `${date}/${month}/${year}`;
                setTimeout(() => {
                  phoneRef.current.forceFocus();
                }, 500);
              };
              return (
                <View
                  style={styles.inputView}
                  key={`rerender_gender_${rerenderGender}`}>
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
                    value={values.gender}
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
                      label="Lưu thay đổi"
                      onPress={handleSubmit}
                      disabled={
                        !isValid ||
                        values.fullname === '' ||
                        values.email === '' ||
                        values.password === ''
                      }
                    />
                  </View>
                  <RNPickerSelect
                    ref={genderRef}
                    onValueChange={(value) => {
                      handleChange(value);
                    }}
                    items={[
                      {value: 'M', label: 'nam'},
                      {value: 'F', label: 'nữ'},
                    ]}
                    onDonePress={(value) => {
                      handleChange(value);
                    }}
                    style={styles.pickerContainer}
                  />
                  <RnDateTimePicker
                    visible={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    mode={'date'}
                    onValueChange={(value) => {
                      changeBirthday(value);
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

SettingMyAccount.defaultProps = {
  data: {
    name: 'Vũ Nguyễn',
    bio: 'I’m only a morning person on Christmas morning You are not just a Follower.',
    gender: 'Nam',
  },
};

export default SettingMyAccount;
