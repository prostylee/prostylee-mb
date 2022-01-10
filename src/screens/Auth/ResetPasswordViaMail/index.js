import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ContainerWithoutScrollView, ButtonOutlined} from 'components';
import {commonActions, cartActions, userActions, userSelectors} from 'reducers';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';

import I18n from 'i18n';

import styles from './styles';

import {Success} from 'svg/common';

const Index = (props) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => userSelectors.getUserToken(state));

  const onBackToSignIn = () => {
    props.navigation.navigate('SignIn');
  };
  const onSignOut = async () => {
    await dispatch(commonActions.setInitialRouteName('SignInOptions'));
    await dispatch(cartActions.resetListCart());
    await dispatch(userActions.userLogout());
    showMessage({
      message: i18n.t('logOutSuccess'),
      type: 'success',
      position: 'top',
    });
  };
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView>
        <View style={styles.mainWrapper}>
          <Success />
          <Text style={styles.label}>{I18n.t('pwChangeSuccess')}</Text>
          <Text style={styles.content}>{I18n.t('pwChangeSuccessNoti')}</Text>
          <ButtonOutlined
            label={I18n.t('backToSignIn')}
            contentStyle={styles.contentButton}
            style={styles.button}
            onPress={userToken ? onSignOut : onBackToSignIn}
          />
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
