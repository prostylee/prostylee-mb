import React, { useRef, useState } from 'react';

import styles from './styles';

import {
  ScrollView,
  View,
  StatusBar,
  Platform,
  RefreshControl,
  Text,
  Image,
  Animated,
  Dimensions
} from 'react-native';

import {ThemeView, ButtonOutlined, ButtonRounded} from 'components';
import HeaderFeed from './HeaderFeed';
import I18n from 'i18n';
import {useDispatch} from 'react-redux';
import {commonActions, userActions} from 'reducers';
import {Auth} from 'aws-amplify';
import { reduce } from 'lodash';

import { Avatar } from 'react-native-paper';
import TabViewContainer from './TabView';

const HEADER_HEIGHT = 150;

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
    <ThemeView isFullView style={styles.container}>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <Image style={{
            width: 500, 
            height: 500,
            position: 'absolute',
            top: 0,
            alignSelf: 'center',
            backgroundColor: 'lightblue'
          }}
          source={{uri: 'https://reactjs.org/logo-og.png'}}
        />
        <Avatar.Image 
          source={{uri: 'https://reactjs.org/logo-og.png'}}
          size={80}
          style={{top: HEADER_HEIGHT-40, zIndex: 10, position: 'absolute', alignSelf: 'center'}}
        />
        <ScrollView 
          style={{top: HEADER_HEIGHT, backgroundColor: 'white', alignSelf: 'stretch', flex: 1, borderTopRightRadius: 8, borderTopLeftRadius: 8}}
          contentContainerStyle={{alignItems: 'center', flexGrow: 1}}
        >
          <Text style={{marginTop: 56, fontSize: 20}}>Alyssa Gardner</Text>
          <View style={{paddingHorizontal: 16}}>
            <Text style={{textAlign: 'center'}}>
              I’m only a morning person on Christmas morning
              {"\n"}
              You are not just a Follower. 
              {"\n"}
              📚 Bookaholic - ✈️ Travelholic
            </Text>
          </View>
          <View style={{paddingTop: 16}}>
            <ButtonRounded label={I18n.t('mypage.editProfile')}/>
          </View>
          <View style={{paddingTop: 16, flex: 3, flexDirection: 'row', justifyContent: "space-around"}}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <Text>1244</Text>
              <Text>{I18n.t('mypage.follower')}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <Text>275</Text>
              <Text>{I18n.t('mypage.following')}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <Text>275</Text>
              <Text>{I18n.t('mypage.posts')}</Text>
            </View>
          </View>
          
        </ScrollView>
        <TabViewContainer/>
                 
      </View>
      
      <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
      <ButtonOutlined label="Categories Screen" onPress={() => navigation.navigate("Categories")} />
    </ThemeView>
  );
};

export default Index;
