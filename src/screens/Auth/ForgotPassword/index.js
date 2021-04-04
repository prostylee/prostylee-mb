import React, {useState} from 'react';
import {View} from 'react-native';
import {ButtonRounded, Container, HeaderBack, TextInputFloatingLabel,} from 'components';

import _ from 'lodash';

import {commonActions, userActions} from 'reducers';
import {useDispatch} from 'react-redux';

import styles from './styles';

import I18n from 'i18n';
import {emailRegex} from 'utils/common';

const Index = (props) => {

  const [email, setEmail] = useState({value: '', error: ''});
  const [disabledBtn, setDisabledBtn] = React.useState(true);

  //Dispatch Redux
  const dispatch = useDispatch();

  const onChangeEmail = async (value) => {
    if (_.isEmpty(value)) {
      setEmail({
        value: '',
        error: I18n.t('validation.required', {field: I18n.t('user.email')}),
      });
      setDisabledBtn(true);
    } else if (emailRegex.test(value) === false) {
      setEmail({
        value: value,
        error: I18n.t('validation.invalid', {field: I18n.t('user.email')}),
      });
      setDisabledBtn(true);
    } else {
      setEmail({value: value.toLowerCase(), error: ''});
      setDisabledBtn(false);
    }
  };

  //handle User signIn
  const onSubmitEmail = async () => {
    await dispatch(commonActions.toggleLoading(true));
    await dispatch(
      userActions.userForgotPassword({
        email: email.value,
        onSuccess: () => onUserForgotPasswordSuccess(),
      }),
    );
  };

  const onUserForgotPasswordSuccess = async () => {
    await dispatch(commonActions.toggleLoading(false));
    props.navigation.navigate('ResetPassword', {email: email.value});
  };

  const onGoBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <HeaderBack
            title={I18n.t('forgotPassword')}
            onBack={() => onGoBack()}
          />
          <View style={styles.form}>

            <TextInputFloatingLabel
              label={I18n.t('email')}
              value={email.value}
              onChangeText={onChangeEmail}
              error={!!email.error}
              errorText={email.error}
            />

            <View style={styles.btnWrapper}>
              <ButtonRounded
                label={I18n.t('next')}
                onPress={onSubmitEmail}
                disabled={disabledBtn}
              />
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Index;
