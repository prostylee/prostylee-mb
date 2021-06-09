import styles from './styles';
import React from 'react';
import {View, TouchableOpacity, Animated, Dimensions, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import {Setting, ChevronLeft} from 'svg/common';
import {Message} from 'svg/social';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width, height} = Dimensions.get('window');

const HeaderFeed = ({scrollAnimated, heightShow}) => {
  const navigation = useNavigation();

  const onNavigateSetting = () => {
    navigation.navigate('Setting');
  };

  /*Animated*/
  const translateY = scrollAnimated.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 60],
    extrapolate: 'clamp',
  });

  const headerColor = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER],
    outputRange: ['#F4F5F5', '#ffffff'],
    extrapolate: 'clamp',
  });
  const borderBottomColor = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER],
    outputRange: ['transparent', '#F4F5F5'],
    extrapolate: 'clamp',
  });

  const opacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const translateWidth = scrollAnimated.interpolate({
    inputRange: [0, 0],
    outputRange: [0, width],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor: headerColor,
        borderBottomColor,
        width: translateWidth,
      }}>
      <Animated.View
        style={{
          paddingTop: getStatusBarHeight(),
          ...styles.content,
        }}>
        <View style={styles.left}>
          <Animated.View style={{...styles.leftHeader, opacity}}>
            <TouchableOpacity style={styles.leftHeader}>
              <ChevronLeft />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.mid}>
          <Animated.View style={{...styles.midHeader, opacity}}>
            <View style={styles.midBorder}>
              <View style={styles.headerUser}>
                <Avatar.Image
                  source={{uri: 'https://reactjs.org/logo-og.png'}}
                  size={24}
                  style={styles.avatarStyle}
                />
                <Text style={styles.labelUserName}>&nbsp;Alyssa Gardner</Text>
              </View>
            </View>
          </Animated.View>
        </View>
        <View style={styles.right}>
          <Animated.View style={{...styles.rightHeader, opacity}}>
            <TouchableOpacity style={styles.touch}>
              <Message />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={onNavigateSetting}>
              <Setting />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

HeaderFeed.defaultProps = {};

HeaderFeed.propTypes = {};

export default HeaderFeed;
