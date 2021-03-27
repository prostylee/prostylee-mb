import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Close, AddFriend} from 'svg/common';

import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow, center} from 'theme/style';

const HeaderView = (props) => {
  return (
    <View style={styles.userView}>
      <View style={styles.leftHeader}>
        <Image
          source={
            props.profile
              ? {uri: props.profile}
              : require('assets/images/default.png')
          }
          style={styles.image}
        />
        <Text style={styles.name}>{props.name}</Text>
        <TouchableOpacity>
          <AddFriend />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.close} onPress={props.onClosePress}>
        <Close />
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  image: {
    width: 32,
    height: 32,
    borderRadius: 25,
    marginLeft: 2,
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeader: {
    ...flexRow,
    ...center,
    height: 40,
    paddingRight: 8,
    paddingLeft: 4,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  close: {
    paddingRight: 8,
  },
  name: {
    color: '$white',
    fontFamily: '$font1Bold',
    fontWeight: '500',
    fontSize: '$mediumText',
    paddingHorizontal: 8,
  },
});

export default HeaderView;
