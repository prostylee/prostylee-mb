import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width} = Dimensions.get('window');

const HeaderAnimated = ({
  heightShow,
  title,
  leftComponent,
  rightComponent,
  midComponent,
  scrollAnimated,
  Animated,
}) => {
  /*Dimension header*/
  const WIDTH_HEADER = width;
  const HEIGHT_HEADER = 50 + getStatusBarHeight();

  /*Animated*/
  const headerColor = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER],
    outputRange: ['transparent', '#fff'],
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

  return (
    <Animated.View
      style={{
        ...styles.container(WIDTH_HEADER, HEIGHT_HEADER),
        backgroundColor: headerColor,
        borderBottomColor,
      }}>
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          ...styles.content,
        }}>
        <View style={styles.left}>{leftComponent ? leftComponent : null}</View>
        <View style={styles.mid(WIDTH_HEADER)}>
          {midComponent ? (
            <Animated.View style={{opacity}}>{midComponent}</Animated.View>
          ) : null}
        </View>
        <View style={styles.right}>
          {rightComponent ? rightComponent : null}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: (WIDTH_HEADER, HEIGHT_HEADER) => ({
    width: WIDTH_HEADER,
    height: HEIGHT_HEADER,
    display: 'flex',
    position: 'absolute',
    borderBottomWidth: 1,
    zIndex: 100,
  }),
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'center',
    width: 80,
  },
  mid: (WIDTH_HEADER) => ({
    width: WIDTH_HEADER - 160,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  right: {
    alignItems: 'flex-end',
    width: 80,
  },
});

export default HeaderAnimated;
