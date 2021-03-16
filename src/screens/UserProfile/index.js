import React, {useRef} from 'react';
import {
  Animated,
  TouchableOpacity as Touch,
  Dimensions,
  View,
  Text,
} from 'react-native';
import {Avatar} from 'react-native-paper';

import styles from './styles';

import InfoView from './InfoView';
import ProfileTab from './ProfileTab';

import {ThemeView, HeaderAnimated} from 'components';

import {ChevronLeft} from 'svg/common';
import {More, Message} from 'svg/social';

const {width} = Dimensions.get('window');

const UserProfile = ({navigation}) => {
  /*Animated*/
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

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
              source={require('assets/images/default.png')}
            />
            <Text numberOfLines={1} style={styles.textTitle}>
              Alyssa Gardner
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
        heightShow={width}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />
      <Animated.ScrollView
        onScroll={onScrollEvent}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <InfoView />
        <ProfileTab />
      </Animated.ScrollView>
    </ThemeView>
  );
};

UserProfile.defaultProps = {};

UserProfile.propTypes = {};

export default UserProfile;
