import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const deviceWidth = Dimensions.get('window').width;

export const NewFeedContentLoading = ({
  width,
  height,
  backgroundColor,
  foregroundColor,
  style,
  speed,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height}
        width={width}
        speed={speed}
        viewBox="0 0 380 150"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect x="18" y="8" rx="50" ry="50" width="56" height="56" />
        <Rect x="95" y="13" rx="4" ry="4" width="70%" height="6" />
        <Rect x="95" y="31" rx="4" ry="4" width="30%" height="5" />
        <Rect x="95" y="49" rx="4" ry="4" width="20%" height="5" />
        <Rect x="25" y="85" rx="4" ry="4" width="85%" height="4" />
        <Rect x="25" y="100" rx="4" ry="4" width="60%" height="4" />
        <Rect x="25" y="115" rx="4" ry="4" width="40%" height="4" />
        <Rect x="25" y="130" rx="4" ry="4" width="20%" height="4" />
      </ContentLoader>
    </View>
  );
};

export const NewFeedTrendingContentLoading = ({
  width,
  height,
  backgroundColor,
  foregroundColor,
  style,
  speed,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height}
        width={width}
        speed={speed}
        viewBox="0 0 380 150"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect x="25" y="13" rx="4" ry="4" width="65%" height="6" />
        <Rect x="80%" y="13" rx="4" ry="4" width="65%" height="6" />
        <Rect x="25%" y="31" rx="4" ry="4" width="30%" height="5" />
        <Rect x="80%" y="31" rx="4" ry="4" width="8%" height="5" />
        <Rect x="25" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="82%" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="113" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="200" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="25" y="150" rx="4" ry="4" width="65%" height="4" />
        <Rect x="80%" y="150" rx="4" ry="4" width="65%" height="4" />
      </ContentLoader>
    </View>
  );
};

NewFeedContentLoading.defaultProps = {
  height: 190,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

NewFeedTrendingContentLoading.defaultProps = {
  height: 250,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
