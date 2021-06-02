import React from 'react';

import styles from './styles';

import {
  ScrollView,
  View,
  StatusBar,
  Platform,
  RefreshControl,
} from 'react-native';

import {ThemeView,ButtonOutlined} from 'components';
import HeaderFeed from './HeaderFeed';

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

  const onScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }

  return (
    <View style={styles.container}>
      <ScrollView onScroll={() => onScroll()}>
        {Platform.OS === 'android' && (
          <StatusBar barStyle="dark-content" translucent backgroundColor="#FFF" />
        )}
        <HeaderFeed/>
      </ScrollView>
      <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
      <ButtonOutlined label="Categories Screen" onPress={() => navigation.navigate("Categories")} />
    </View>
  );
};

export default Index;
