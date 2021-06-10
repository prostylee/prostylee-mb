import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import styles from './styles';
import {Header, ThemeView} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductItem from './ProductItem';
import FooterItem from './FooterItem';
import Chat from './Chat';
const ChatBox = ({navigation}) => {
  return (
    <ThemeView style={{flex: 1}} isFullView>
      <Header
        containerStyle={styles.headerContain}
        middleComponent={
          <View style={styles.leftHeader}>
            <Icon name="chevron-back-outline" size={20} color="white" />
            <View style={styles.title}>
              <Image
                style={styles.avatar}
                source={require('../../assets/images/avatar.jpg')}
              />
              <Text style={styles.name}>Minh Thi</Text>
            </View>
          </View>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <Icon name="call-outline" size={22} color="white" />
            <Icon
              style={styles.headerRightIcon}
              name="ellipsis-horizontal"
              size={22}
              color="white"
            />
          </View>
        }
      />
      <ProductItem />
      <View style={{flex: 1}}>
        <Chat />
      </View>
      <FooterItem />
    </ThemeView>
  );
};

export default ChatBox;
