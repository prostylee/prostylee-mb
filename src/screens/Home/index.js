import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {commonActions, userActions} from 'reducers';
import {Auth} from 'aws-amplify';

const Index = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('USER ' + JSON.stringify(user));
      })
      .catch((err) => console.log(err));
    dispatch(commonActions.toggleLoading(false));
  }, []);

  //funcs
  const onSignOut = async () => {
    await dispatch(commonActions.setInitialRouteName('LoginOptions'));
    dispatch(userActions.userLogOutSuccess());
  };
  return (
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
      <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
    </View>
  );
};

export default Index;
