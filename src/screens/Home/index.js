import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {commonActions, userActions} from 'reducers';
import {Auth} from 'aws-amplify';

const Index = ({navigation}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // TODO remove
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('USER ' + JSON.stringify(user));
      })
      .catch((err) => console.log(err));
    dispatch(commonActions.toggleLoading(false));
  }, []);

  //funcs
  const onSignOut = async () => {
    console.log('onSignOut');
    await dispatch(commonActions.setInitialRouteName('SignInOptions'));
    await dispatch(userActions.userLogout());
  };
  return (
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
      <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
      <ButtonOutlined label="Categories Screen" onPress={() => navigation.navigate("Categories")} />
    </View>
  );
};

export default Index;
