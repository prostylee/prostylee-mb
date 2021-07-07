import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {commonActions, userActions} from 'reducers';
import {Auth} from 'aws-amplify';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
const Index = ({navigation}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // TODO remove
    Auth.currentAuthenticatedUser()
      .then((user) => {})
      .catch((err) => {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
    dispatch(commonActions.toggleLoading(false));
  }, []);

  //funcs
  const onSignOut = async () => {
    await dispatch(commonActions.setInitialRouteName('SignInOptions'));
    await dispatch(userActions.userLogout());
  };
  return (
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
      <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
      <ButtonOutlined
        label="Categories Screen"
        onPress={() => navigation.navigate('Categories')}
      />
    </View>
  );
};

export default Index;
