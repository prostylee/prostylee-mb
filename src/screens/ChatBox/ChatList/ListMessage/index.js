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
import {ChatListLoading} from 'components/Loading/contentLoader';

/******** chat aws ********/
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {updateChat} from 'graphqlLocal/mutations';
/******** chat aws ********/

const Item = ({item, index, userData, onPress}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const itemContent = JSON.parse(item.content) || {};
  // TODO update api so I can use field "childrens" to update check new messages
  const itemNewMessage = item.imageUrls;

  const [currentUserSub, setCurrentUserSub] = React.useState('');

  const setUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setCurrentUserSub(user.attributes.sub);
  };

  React.useEffect(() => {
    if (!item.currentUserId) {
      setUserData();
    }
  }, [item.currentUserId]);

  const checkNewMessage = () => {
    if (!itemNewMessage.length) {
      return false;
    } else {
      const newMessage = itemNewMessage[0];
      if (item.currentUserId === newMessage || currentUserSub === newMessage) {
        return false;
      } else {
        return true;
      }
    }
  };
  console.log(itemNewMessage, item.currentUserId, checkNewMessage());

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
  const checkReadMessage = async () => {
    await API.graphql(
      graphqlOperation(updateChat, {
        input: {
          id: item.id,
          imageUrls: [],
        },
      }),
    );
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
  const borderItemStyle = (itemIndex) => ({
    borderTopColor: itemIndex > 0 ? colors['$bgColor'] : 'transparent',
  });

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() => {
          if (checkNewMessage()) {
            checkReadMessage();
          }
          navigation.navigate('ChatBox', {
            chatId: item.id,
            otherChatUserId: userData.id,
            userName: userData.fullName,
            userPhone: userData.phoneNumber,
            productData: itemContent,
            fullItem: item,
          });
        }}>
        <View style={[styles.itemStyle, borderItemStyle(index)]}>
          <Image
            source={{
              uri: `${configEnv.api_url}/profile/${userData?.id}/avatar`,
            }}
            resizeMode={'cover'}
            style={styles.img}
          />
          <View style={styles.itemInfo}>
            <Text style={styles.Card}>{userData?.fullName}</Text>
            <Text style={styles.fomat} numberOfLines={2}>
              {`${itemContent.name} • ${getNewChatTime()}`}
            </Text>
          </View>
          <Icon
            name="ellipse-sharp"
            size={7}
            color={checkNewMessage() ? '#ed2727' : 'transparent'}
            style={styles.newMessageDot}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
const ListMessage = (props) => {
  const currentUser = props.currentUser ? props.currentUser : {};
  const chatList = props.chatList ? props.chatList : [];
  const userData = props.userData ? props.userData : {};
  const loading = props.loading ? props.loading : false;
  const refreshing = props.refreshing ? props.refreshing : false;
  const refreshChatList = props.refreshChatList
    ? props.refreshChatList
    : () => {};

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
          currentUserId={currentUser?.attributes.sub}
        />
      </View>
    );
  };
  if (loading && !refreshing) {
    return <ChatListLoading />;
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={chatList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.listContainer}
      contentContainerStyle={styles.listContent}
      refreshing={refreshing}
      onRefresh={refreshChatList}
    />
  );
};

export default ListMessage;
