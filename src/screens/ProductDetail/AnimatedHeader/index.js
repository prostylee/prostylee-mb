import React from 'react';
import {View, Dimensions, TouchableOpacity, Animated} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import IconIcons from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Bag} from 'svg/common';
import EStyleSheet from 'react-native-extended-stylesheet';
import TabNav from './TabNav';
import {useTheme, useNavigation} from '@react-navigation/native';

const {width: WIDTH_HEADER} = Dimensions.get('window');

const AnimatedHeader = ({
  image: productImages,
  heightShow,
  scrollAnimated,
  scrollToTop,
  scrollToComment,
  scrollToRelated,
  activeTabProps = 'product',
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  /*Dimension header*/
  const HEIGHT_HEADER = (WIDTH_HEADER * 4) / 3;

  /*Animated*/
  const headerColor = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER - 50],
    outputRange: ['transparent', '#fff'],
    extrapolate: 'clamp',
  });
  const opacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER - 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const reverseOpacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER - 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: headerColor,
        },
      ]}>
      <Animated.View
        style={[
          styles.headerTop,
          {
            // backgroundColor: headerColor,
          },
        ]}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <IconIcons
            name="chevron-back-outline"
            color={colors['$black']}
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.topCenterImg}>
          <Animated.Image
            source={{uri: productImages[0]}}
            style={[
              styles.centerImgStyle,
              {
                opacity: reverseOpacity,
              },
            ]}
          />
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.bagIcon}>
            <Bag color={colors['$black']} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={navigation.goBack}
            style={styles.ellipsisIcon}>
            <Feather
              name="more-horizontal"
              color={colors['$black']}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.headerTopPlaceholder,
          {
            opacity: opacity,
          },
        ]}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <IconIcons
            name="chevron-back-outline"
            color={colors['$white']}
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.topCenterImg}>
          <Animated.Image
            source={{uri: productImages[0]}}
            style={[styles.centerImgStyle, {opacity: 0}]}
          />
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.bagIcon}>
            <Bag color={colors['$white']} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={navigation.goBack}
            style={styles.ellipsisIcon}>
            <Feather
              name="more-horizontal"
              color={colors['$white']}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TabNav
        opacity={reverseOpacity}
        scrollToTop={scrollToTop}
        scrollToComment={scrollToComment}
        scrollToRelated={scrollToRelated}
        activeTabProps={activeTabProps}
      />
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: WIDTH_HEADER,
    height: 50 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  headerTop: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    height: 50,
    width: WIDTH_HEADER,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  headerTopPlaceholder: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    height: 50,
    width: WIDTH_HEADER,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  backButton: {
    width: 80,
    height: 50,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topCenterImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  centerImgStyle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  rightIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagIcon: {
    height: 50,
    paddingLeft: 16,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsisIcon: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedHeader;
