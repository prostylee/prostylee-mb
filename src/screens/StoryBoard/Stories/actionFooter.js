import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import styles from './styles';

import {HeartSolid, ChatSolid, ArrowSolid} from 'svg/common';

const StoryFooterAction = () => {
  return (
    <View style={styles.storyAction}>
      <TouchableOpacity style={styles.touch}>
        <ArrowSolid />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.touch}>
        <ChatSolid />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.touch}>
        <HeartSolid />
      </TouchableOpacity>
    </View>
  );
};

export default StoryFooterAction;
