import React, {useRef, useState} from 'react';

import styles from './styles';

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import configEnv from 'config';
import isEmpty from 'lodash/isEmpty';
import {ThemeView, ButtonRounded, ChatIcon, Colors} from 'components';
import HeaderFeed from './HeaderFeed';
import I18n from 'i18n';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  commonActions,
  myPageActions,
  userActions,
  userSelectors,
} from 'reducers';
import {Auth} from 'aws-amplify';
import {Grid, Full, Setting} from 'svg/common';

import {Avatar, ToggleButton} from 'react-native-paper';
import TabViewContainer from './TabView';
import {ScrollView} from 'react-native';

const heightShow = 334;
let scrollFlag = true;
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 150;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [viewType, setViewType] = useState('grid');
  const [activeTab, setActivedTab] = useState('menu');
  const scrollViewRef = useRef();

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const userStatistics = useSelector((state) =>
    userSelectors.getUserStatistics(state),
  );
  const userAvatar = `${configEnv.api_url}/profile/${userProfile?.id}/avatar`;
  const statisticsData = !isEmpty(userStatistics) ? userStatistics : {};

  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const opacity = scrollAnimated.interpolate({
    inputRange: [100, heightShow],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {
      listener: (event) => {
        const {contentOffset} = event.nativeEvent;
        if (isCloseToBottom(event.nativeEvent) && scrollFlag) {
          scrollFlag = false;
          scrollViewRef.current.scrollToEnd({animated: true});
          setScrollEnabled(false);
        }
        if (contentOffset.y === 0) {
          scrollFlag = true;
        }
      },
      useNativeDriver: false,
    },
  );
  const restoreScrollTop = () => {
    scrollViewRef.current.scrollTo({
      y: 0,
      animated: true,
    });
    setScrollEnabled(true);
  };

  React.useEffect(() => {
    // TODO remove
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch(userActions.getProfile(user.attributes['custom:userId']));
      })
      .catch((err) => console.log(err));
    dispatch(commonActions.toggleLoading(false));
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      dispatch(userActions.getStatistics(userProfile?.id));
    }
  }, [isFocused]);

  React.useEffect(() => {
    dispatch(myPageActions.getUserOrdersStatusList());
  }, []);

  React.useEffect(() => {
    if (userProfile?.id) {
      dispatch(
        myPageActions.getListUserPost({
          userId: userProfile?.id,
          page: 0,
          limit: 12,
        }),
      );
    }
  }, [userProfile]);

  return (
    <ThemeView isFullView style={styles.container}>
      <HeaderFeed
        heightShow={heightShow}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
        restoreScrollTop={restoreScrollTop}
      />
      <Animated.View
        style={[
          styles.headerFull,
          {
            opacity: opacity,
          },
        ]}>
        <TouchableOpacity style={{paddingRight: 16}}>
          <ChatIcon color={Colors['$white']} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Setting color={Colors['$white']} />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScrollEvent}
        scrollEnabled={scrollEnabled}
        scrollEventThrottle={1}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.viewScroll}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: scrollAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            styles.headerProfile,
          ]}>
          <View style={styles.wrapScroll}>
            <ImageBackground
              style={styles.backgroundImageStyle}
              source={
                userProfile?.avatar
                  ? {uri: userProfile?.avatar}
                  : require('assets/images/default.png')
              }
              blurRadius={10}>
              <View style={styles.scrollViewStyle}>
                <View style={styles.wrapAvatar}>
                  <Avatar.Image
                    source={{uri: userAvatar}}
                    size={80}
                    style={styles.avatarStyle}
                  />
                </View>
                <View style={styles.viewInfoUser}>
                  <View style={styles.wrapUserNameText}>
                    <Text style={styles.userNameText}>
                      {userProfile?.fullName}
                    </Text>
                  </View>
                  {userProfile?.bio ? (
                    <View style={{paddingHorizontal: 16}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          lineHeight: 20,
                          fontSize: 14,
                          color: '#333333',
                        }}>
                        {userProfile?.bio}
                      </Text>
                    </View>
                  ) : null}
                  <View style={{paddingTop: 16}}>
                    <ButtonRounded
                      style={styles.editButton}
                      labelStyle={styles.editLabelButton}
                      label={I18n.t('mypage.editProfile')}
                      onPress={() => navigation.navigate('SettingMyAccount')}
                    />
                  </View>
                  <View style={styles.followParentView}>
                    <View style={styles.followChildView}>
                      <Text style={styles.valueFollowChild}>
                        {statisticsData.followers || 0}
                      </Text>
                      <Text style={styles.labelFollowChild}>
                        {I18n.t('mypage.follower')}
                      </Text>
                    </View>
                    <View style={styles.followChildView}>
                      <Text style={styles.valueFollowChild}>
                        {statisticsData.followings || 0}
                      </Text>
                      <Text style={styles.labelFollowChild}>
                        {I18n.t('mypage.following')}
                      </Text>
                    </View>
                    <View style={styles.followChildView}>
                      <Text style={styles.valueFollowChild}>
                        {statisticsData.posts || 0}
                      </Text>
                      <Text style={styles.labelFollowChild}>
                        {I18n.t('mypage.posts')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Animated.View>
        <View style={styles.wrapTabView}>
          <TabViewContainer
            scrollAnimated={scrollAnimated}
            viewType={viewType}
            scrollEnabled={!scrollEnabled}
            setActivedTab={setActivedTab}
          />
        </View>
      </ScrollView>
      {activeTab === 'menu' && (
        <View style={styles.viewType}>
          <ToggleButton.Row
            value={viewType}
            style={{padding: 9, justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => setViewType('grid')}>
              <Grid
                color={viewType == 'grid' ? '#333333' : '#8B9399'}
                fill={viewType == 'grid' ? '#333333' : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewType('full')}>
              <Full
                color={viewType == 'full' ? '#333333' : '#8B9399'}
                fill={viewType == 'full' ? '#333333' : 'none'}
              />
            </TouchableOpacity>
          </ToggleButton.Row>
        </View>
      )}
    </ThemeView>
  );
};

export default Index;
