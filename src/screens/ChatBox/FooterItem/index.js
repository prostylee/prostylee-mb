import React, {useCallback, useState} from 'react';
import {Dimensions, View, Text, Image, TextInput} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const FooterItem = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  return (
    <View style={styles.footer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Để lại tin nhắn của bạn"
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.iconFooter}>
          <Icon name="ios-camera-outline" size={30} color="#333333" />
        </View>
        <View style={styles.iconFooter}>
          <MaterialIcon name="alternate-email" color="#333333" size={25} />
        </View>
        <View style={styles.iconFooter}>
          <IconFeather name="smile" color="#333333" size={25} />
        </View>
      </View>
    </View>
  );
};

export default FooterItem;
