import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import styles from './styles';
import img from 'assets/images/avatar.jpg';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messLeft}>
        <View style={styles.messContentLeft}>
          <View
            style={{
              paddingLeft: 10,

              justifyContent: 'flex-end',
            }}>
            <Image source={img} resizeMode={'cover'} style={styles.img}></Image>
          </View>
          <View style={{paddingLeft: 5}}>
            <View style={styles.contentLeft}>
              <Text>Class aptent taciti sociosqu</Text>
            </View>
            <Image
              source={img}
              resizeMode={'cover'}
              style={styles.imgContent}
            />
          </View>
        </View>
      </View>
      <View style={styles.messRight}>
        <View style={styles.contentRight}>
          <Text>Class aptent taciti sociosqu</Text>
        </View>
      </View>
    </View>
  );
};
export default ChatScreen;
