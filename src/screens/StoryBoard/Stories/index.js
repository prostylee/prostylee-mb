/* eslint-disable react-hooks/rules-of-hooks */
import React, {useRef} from 'react';
import {View, Animated, StyleSheet, Platform, Dimensions} from 'react-native';

import styles from './styles';

import Story from '../Story/story';
import StoryHeader from './header';
import StoryFooterAction from './actionFooter';

import {TYPE_STORE} from 'constants';

const {width} = Dimensions.get('window');
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

const Stories = ({stories, navigation, targetType}) => {
  if (!stories.length) {
    return null;
  }
  const x = new Animated.Value(0);
  const scroll = useRef(null);

  const getStyle = (index) => {
    const offset = index * width;

    const inputRange = [offset - width, offset + width];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${angle}rad`, `-${angle}rad`],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const extra = width / ratio / Math.cos(angle / 2) - width / ratio;
    const translateX2 = x.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        {perspective},
        {translateX},
        {rotateY},
        {translateX: translateX1},
        {translateX: translateX2},
      ],
    };
  };

  const getMaskStyle = (index) => {
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [0.75, 0, 0.75],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
    return {
      backgroundColor: 'black',
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  };

  const _close = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {stories.map((story, i) => {
        let name = null;
        let imgUrl = null;
        if (targetType === TYPE_STORE) {
          const storyTypeRes = story.storeForStoryResponse;
          imgUrl = storyTypeRes?.logoUrl;
          name = storyTypeRes.name;
        } else {
          const storyTypeRes = story.userForStoryResponse;
          imgUrl = storyTypeRes?.avatar;
          name = storyTypeRes.fullName;
        }
        return (
          <Animated.View
            style={getStyle(i)}
            key={'storyboard' + targetType + i}>
            <StoryHeader name={name} imgUrl={imgUrl} onPress={_close} />
            <Story story={story} />
            <StoryFooterAction />
            <Animated.View style={getMaskStyle(i)} />
          </Animated.View>
        );
      })}
      <Animated.ScrollView
        ref={scroll}
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        contentContainerStyle={{width: width * stories.length}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x},
              },
            },
          ],
          {useNativeDriver: false},
        )}
        decelerationRate={0.99}
        horizontal
      />
    </View>
  );
};

Stories.defaultProps = {
  stories: [],
};

Stories.propTypes = {};

export default Stories;
