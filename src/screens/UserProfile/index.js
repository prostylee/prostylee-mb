import React, {useRef, useEffect} from 'react';
import {
  Animated,
  TouchableOpacity as Touch,
  Dimensions,
  View,
  Text,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';

import InfoView from './InfoView';
import ProfileTab from './ProfileTab';
import SwitchBottom from './SwitchBottom';

import {userActions} from 'reducers';

import {ThemeView, HeaderAnimated} from 'components';

import {ChevronLeft} from 'svg/common';
import {More, Message} from 'svg/social';

import {profileSelector, statisticsSelector} from 'redux/selectors/user';

const {height} = Dimensions.get('window');

const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => profileSelector(state));
  const statistics = useSelector((state) => statisticsSelector(state));

  /*Animated*/
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    dispatch(userActions.getProfile(1));
    dispatch(userActions.getStatistics(1));
    dispatch(userActions.getUserPost(1));
  }, [dispatch]);

  const leftPress = () => {
    navigation.goBack();
  };
  const scrollProfile = () => {};
  return (
    <ThemeView style={styles.container} isFullView>
      <HeaderAnimated
        leftComponent={
          <Touch style={styles.leftTouch} onPress={leftPress}>
            <ChevronLeft />
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
            <Touch style={styles.touchRight} onPress={leftPress}>
              <Message />
            </Touch>
            <Touch style={styles.touchRight} onPress={leftPress}>
              <More />
            </Touch>
          </View>
        }
        heightShow={height * 0.35}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />
      <Animated.ScrollView
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
