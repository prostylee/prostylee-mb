import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  TouchableOpacity as Touch,
  View,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

import styles from './styles';

import InfoView from './InfoView';
import ProfileTab from './ProfileTab';
import SwitchBottom from './SwitchBottom';

import {userActions} from 'reducers';

import {ThemeView, HeaderAnimated, Colors} from 'components';

import {ChevronLeft} from 'svg/common';
import {More, Message} from 'svg/social';
import {getProfile, getStatistics} from 'services/api/userApi';

import {PAGE_DEFAULT, SUCCESS} from 'constants';

const heightShow = Platform.OS === 'ios' ? 280 : 300;

const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const route = useRoute();
  const userId = route?.params?.userId || 1;

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [statistics, setStatistics] = useState({});
  /*Animated*/
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );
  const opacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const marginTop = scrollAnimated.interpolate({
    inputRange: [0, heightShow * 0.2, heightShow],
    outputRange: [-30, 0, 0],
    extrapolate: 'clamp',
  });

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const resProfile = await getProfile(userId);
      const resStatistics = await getStatistics(userId);

      if (
        resProfile.ok &&
        resStatistics.ok &&
        resProfile.data.status === SUCCESS &&
        resStatistics.data.status === SUCCESS
      ) {
        setProfile(resProfile.data.data);
        setStatistics(resStatistics.data.data);
      }
    } catch (e) {
      console.log('error get data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
    dispatch(
      userActions.getUserPost({
        page: PAGE_DEFAULT,
        limit: PAGE_DEFAULT,
        userId: userId,
      }),
    );
    dispatch(
      userActions.getProductByUser({
        page: PAGE_DEFAULT,
        limit: PAGE_DEFAULT,
        userId: userId,
      }),
    );
  }, [dispatch]);

  const leftPress = () => {
    navigation.goBack();
  };

  const messagePress = () => {
    navigation.navigate('Comment');
  };

  const morePress = () => {};

  const scrollProfile = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.mid]}>
        <ActivityIndicator size={'large'} color={Colors['$pink']} />
      </View>
    );
  }

  return (
    <ThemeView style={styles.container} isFullView>
      <HeaderAnimated
        leftComponent={
          <Touch style={styles.leftTouch} onPress={leftPress}>
            <ChevronLeft color={Colors.$icon} />
          </Touch>
        }
        midComponent={
          <Touch onPress={scrollProfile} style={styles.mid}>
            <Avatar.Image
              size={24}
              source={
                profile?.avatar
                  ? {uri: profile?.avatar}
                  : require('assets/images/default.png')
              }
            />
            <Text numberOfLines={1} style={styles.textTitle}>
              {profile?.fullName}
            </Text>
          </Touch>
        }
        rightComponent={
          <View style={styles.rightView}>
            <Animated.View style={{opacity, marginTop}}>
              <Touch style={styles.touchRight} onPress={messagePress}>
                <Message />
              </Touch>
            </Animated.View>
            <Touch style={styles.touchRight} onPress={morePress}>
              <More />
            </Touch>
          </View>
        }
        heightShow={heightShow}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={onScrollEvent}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <InfoView statistics={statistics} profile={profile} />
        <ProfileTab />
      </Animated.ScrollView>
      <SwitchBottom />
    </ThemeView>
  );
};

UserProfile.defaultProps = {};

UserProfile.propTypes = {};

export default UserProfile;
