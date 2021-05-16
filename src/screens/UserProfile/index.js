import React, {useRef, useEffect} from 'react';
import {
  Animated,
  TouchableOpacity as Touch,
  View,
  Text,
  Platform,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';

import InfoView from './InfoView';
import ProfileTab from './ProfileTab';
import SwitchBottom from './SwitchBottom';

import {userActions} from 'reducers';

import {ThemeView, HeaderAnimated, Colors} from 'components';

import {ChevronLeft} from 'svg/common';
import {More, Message} from 'svg/social';

import {profileSelector, statisticsSelector} from 'redux/selectors/user';

import {PAGE_DEFAULT} from 'constants';

const heightShow = Platform.OS === 'ios' ? 280 : 300;

const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const profile = useSelector((state) => profileSelector(state));
  const statistics = useSelector((state) => statisticsSelector(state));

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

  useEffect(() => {
    dispatch(userActions.getProfile(1));
    dispatch(userActions.getStatistics(1));
    dispatch(
      userActions.getUserPost({
        page: PAGE_DEFAULT,
        limit: PAGE_DEFAULT,
        userId: 3,
      }),
    );
    dispatch(
      userActions.getProductByUser({
        page: PAGE_DEFAULT,
        limit: PAGE_DEFAULT,
        userId: 3,
      }),
    );
  }, [dispatch]);

  const leftPress = () => {
    navigation.goBack();
  };

  const messagePress = () => {
    navigation.navigate('Chat');
  };

  const morePress = () => {};

  const scrollProfile = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
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
