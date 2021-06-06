import React, {useRef, useState} from 'react';

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
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {ThemeView, ButtonOutlined, ButtonRounded} from 'components';
import HeaderFeed from './HeaderFeed';
import I18n from 'i18n';
import {useDispatch} from 'react-redux';
import {commonActions, userActions} from 'reducers';
import {Auth} from 'aws-amplify';
import {reduce} from 'lodash';
import {Grid, Full, Setting} from 'svg/common';
import {Message} from 'svg/social';

import {Avatar, ToggleButton} from 'react-native-paper';
import TabViewContainer from './TabView';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const [viewType, setViewType] = useState('left');

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
  console.log(styles);
  return (
    <ThemeView isFullView style={styles.container}>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <View style={styles.headerFull}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Message />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Setting />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.backgroundImageStyle}
          source={{uri: 'https://reactjs.org/logo-og.png'}}
        />
        <Avatar.Image
          source={{uri: 'https://reactjs.org/logo-og.png'}}
          size={80}
          style={styles.avatarStyle}
        />
        <View
          style={styles.scrollViewStyle}
          contentContainerStyle={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                marginTop: 56,
                fontSize: 20,
                lineHeight: 28,
                fontWeight: '500',
              }}>
              Alyssa Gardner
            </Text>
            <View style={{paddingHorizontal: 16}}>
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 14,
                  color: '#333333',
                }}>
                I’m only a morning person on Christmas morning
                {'\n'}
                You are not just a Follower.
                {'\n'}
                📚 Bookaholic - ✈️ Travelholic
              </Text>
            </View>
            <View style={{paddingTop: 16}}>
              <ButtonRounded label={I18n.t('mypage.editProfile')} />
            </View>
            <View style={styles.followParentView}>
              <View style={styles.followChildView}>
                <Text style={styles.valueFollowChild}>1244</Text>
                <Text style={styles.labelFollowChild}>
                  {I18n.t('mypage.follower')}
                </Text>
              </View>
              <View style={styles.followChildView}>
                <Text style={styles.valueFollowChild}>275</Text>
                <Text style={styles.labelFollowChild}>
                  {I18n.t('mypage.following')}
                </Text>
              </View>
              <View style={styles.followChildView}>
                <Text style={styles.valueFollowChild}>275</Text>
                <Text style={styles.labelFollowChild}>
                  {I18n.t('mypage.posts')}
                </Text>
              </View>
            </View>
          </View>
          <TabViewContainer style={{borderTopWidth: 0.3}} />
        </View>

        <View style={styles.viewType}>
          <ToggleButton.Row
            value={viewType}
            style={{padding: 9, justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => setViewType('left')}>
              <Grid
                color={viewType == 'left' ? '#333333' : '#8B9399'}
                fill={viewType == 'left' ? '#333333' : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewType('right')}>
              <Full
                color={viewType == 'right' ? '#333333' : '#8B9399'}
                fill={viewType == 'right' ? '#333333' : 'none'}
              />
            </TouchableOpacity>
          </ToggleButton.Row>
        </View>
      </View>

      {/* <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
      <ButtonOutlined label="Categories Screen" onPress={() => navigation.navigate("Categories")} /> */}
    </ThemeView>
  );
};

export default Index;
