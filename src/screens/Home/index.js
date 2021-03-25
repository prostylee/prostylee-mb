import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {userActions, commonActions} from 'reducers';

const Index = () => {
  const dispatch = useDispatch();

  //funcs
  const onSignOut = async () => {
    await dispatch(commonActions.setInitialRouteName('SignInOptions'));
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
