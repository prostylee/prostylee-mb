import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {HeartSolid, ChatSolid, ArrowSolid} from 'svg/common';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute} from 'theme/style';

const Footer = ({openChatModal, story}) => {
  console.log('story', story);
  return (
    <View style={styles.storyAction}>
      <TouchableOpacity style={styles.touch}>
        <ArrowSolid />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={openChatModal} style={styles.touch}>
        <ChatSolid />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.touch}>
        <HeartSolid />
      </TouchableOpacity>
    </View>
  );
};
const styles = EStyleSheet.create({
  storyAction: {
    ...absolute(null, 80, null, 16),
    width: 44,
    paddingRight: 8,
    paddingLeft: 4,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  touch: {
    paddingVertical: 12,
    marginLeft: 3,
  },
  line: {
    width: 20,
    height: 1,
    marginLeft: 3,
    backgroundColor: '$lightGray',
  },
});

export default Footer;
