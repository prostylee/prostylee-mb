import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {Header, ThemeView, CustomTextInput, ButtonRounded} from 'components';
import {Camera} from 'svg/common';
import styles from './styles';
import I18n from 'i18n';
import {Field, Formik} from 'formik';
import {
  validateEmail,
  validateFullname,
  validatePassword,
} from '../../../utils/validatorUtils';

const SettingMyAccount = () => {
  return (
    <ThemeView isFullView style={styles.container}>
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
            name: '',
            bio: '',
            gender: '',
            birthday: '',
            phone: '',
            email: '',
          }}
          onSubmit={(values) => console.log(values)}>
          {({handleSubmit, values, isValid}) => (
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

              <View style={styles.viewDivider}></View>

              <Field
                component={CustomTextInput}
                name="gender"
                label={I18n.t('settingProfile.gender')}
              />
              <Field
                component={CustomTextInput}
                name="birthday"
                label={I18n.t('settingProfile.birthday')}
              />
              <Field
                component={CustomTextInput}
                name="phone"
                label={I18n.t('settingProfile.phone')}
              />
              <Field
                component={CustomTextInput}
                validate={validateEmail}
                name="email"
                label={I18n.t('settingProfile.email')}
              />

              <View style={styles.viewDivider}></View>

              <Field
                component={CustomTextInput}
                name="changePass"
                label={I18n.t('settingProfile.changePass')}
              />

              <View style={styles.viewDivider}></View>
              <View style={styles.viewDivider}></View>

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
            </View>
          )}
        </Formik>
      </ScrollView>
    </ThemeView>
  );
};

export default SettingMyAccount;
