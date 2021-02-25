import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Avatar} from 'react-native-paper';

import styles from './styles';

import {Close, AddFriend} from 'svg/common';

const StoryHeader = ({imgUrl, name, onPress}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Avatar.Image
          size={32}
          source={imgUrl ? {uri: imgUrl} : require('assets/images/default.png')}
        />
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity>
          <AddFriend />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.touchClose}>
        <Close />
      </TouchableOpacity>
    </View>
  );
};

export default StoryHeader;
