import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useTheme, useNavigation} from '@react-navigation/native';
import i18n from 'i18n';
import styles from './styles';
import configEnv from 'config';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import * as dateTime from 'utils/datetime';

const Item = ({item, index, userData, onPress}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const itemContent = JSON.parse(item.content) || {};
  const getNewChatTime = () => {
    if (
      dateTime.checkTimeBetween(
        item.updatedAt,
        dateTime.currentDate(),
        dateTime.currentDate().subtract(1, 'hour'),
      )
    ) {
      return i18n.t('chat.justNow');
    } else if (
      dateTime.checkTimeBetween(
        item.updatedAt,
        dateTime.currentDate(),
        dateTime.currentDate().subtract(1, 'day'),
      )
    ) {
      return i18n.t('chat.yesterday');
    } else {
      return dateTime.format(new Date(item.updatedAt), 'DD MMM');
    }
  };
  const renderRightActions = () => {
    return (
      <RectButton
        style={styles.actionButton}
        onPress={() => {
          onPress(item);
        }}>
        <AntIcon name="delete" size={20} color="white" />
      </RectButton>
    );
  };
  const borderItemStyle = (index) => ({
    borderTopColor: index > 0 ? colors['$bgColor'] : 'transparent',
  });

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatBox', {
            chatId: item.id,
            otherChatUserId: userData.id,
            userName: userData.fullName,
            userPhone: userData.phoneNumber,
            productData: itemContent,
          });
        }}>
        <View style={[styles.itemStyle, borderItemStyle(index)]}>
          <Image
            source={{
              uri: `${configEnv.api_url}/profile/${userData.id}/avatar`,
            }}
            resizeMode={'cover'}
            style={styles.img}
          />
          <View style={styles.itemInfo}>
            <Text style={styles.Card}>{userData.fullName}</Text>
            <Text style={styles.fomat} numberOfLines={2}>
              {`${itemContent.name} • ${getNewChatTime()}`}
            </Text>
          </View>
          <Icon name="ellipse-sharp" size={7} style={styles.newMessageDot} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
const ListMessage = (props) => {
  const currentUser = props.currentUser ? props.currentUser : {};
  const chatList = props.chatList ? props.chatList : [];
  const userData = props.userData ? props.userData : {};

  const deleteChatHandler = props.deleteChatHandler
    ? props.deleteChatHandler
    : () => {};
  const renderItem = ({item, index}) => {
    const otherUserId = item.participantUserIds?.find(
      (userId) => userId !== currentUser.attributes['custom:userId'],
    );
    return (
      <View style={styles.itemContainer}>
        <Item
          item={item}
          userData={userData[otherUserId]}
          index={index}
          onPress={deleteChatHandler}
        />
      </View>
    );
  };
  return (
    <FlatList
      data={chatList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.listContainer}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default ListMessage;
