import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import styles from './styles';
import {Header, ThemeView} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductItem from './ProductItem';
import FooterItem from './FooterItem';
/******** chat aws ********/
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {createChat, deleteChat} from 'graphqlLocal/mutations';
import {getChat, listChats} from 'graphqlLocal/queries';
import {onCreateChat, onDeleteChat} from 'graphqlLocal/subscriptions';
import {getUserAWSAvatar} from 'services/api/userApi';
const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER
import ChatOne2One from './ChatOne2One';
import configEnv from 'config';
/******** chat aws ********/
import Chat from './Chat';
const ChatBox = ({navigation, route}) => {
  const chatId = route?.params?.chatId ? route.params.chatId : '';
  const otherChatUserId = route?.params?.otherChatUserId
    ? route.params.otherChatUserId
    : '';
  const userName = route?.params?.userName ? route.params.userName : '';
  const userPhone = route?.params?.userPhone ? route.params.userPhone : '';
  const productData = route?.params?.productData
    ? route.params.productData
    : {};

  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = React.useState();
  const [chatDataList, setChatDataList] = React.useState([]);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setCurrentUser(user);
        console.log(JSON.stringify(user, null, 4));
      })
      .catch((err) => console.log(err));
    executeGetChat();
  }, []);

  React.useEffect(() => {
    const createChatListener = API.graphql(
      graphqlOperation(onCreateChat),
    ).subscribe({
      next: (chatData) => {
        const addedChat = chatData.value.data.onCreateChat;

        if (addedChat.parentId !== DEFAULT_CHAT_GROUP_ID) {
          const updatedChats = [...chatDataList];
          updatedChats.push(addedChat);
          setChatDataList(updatedChats);
        }
      },
    });

    const deleteChatListener = API.graphql(
      graphqlOperation(onDeleteChat),
    ).subscribe({
      next: (chatData) => {
        const deletedChat = chatData.value.data.onDeleteChat;
        if (deletedChat.parentId !== DEFAULT_CHAT_GROUP_ID) {
          const updatedChats = chatData.filter(
            (cmt) => cmt.id !== deletedChat.id,
          );
          setChatDataList(updatedChats);
        }
      },
    });

    dispatch(commonActions.toggleLoading(false));

    return () => {
      if (createChatListener) {
        createChatListener.unsubscribe();
      }
      if (deleteChatListener) {
        deleteChatListener.unsubscribe();
      }
    };
  }, [chatDataList, dispatch]);

  const executeGetChat = () => {
    dispatch(commonActions.toggleLoading(true));
    API.graphql(
      graphqlOperation(getChat, {
        id: chatId,
      }),
    )
      .then((result) => {
        setChatDataList(result.data.getChat.childrens.items);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(commonActions.toggleLoading(false));
  };

  const callUser = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('User do note have phone number!');
    }
  };

  const otherUserAvatar = `${configEnv.api_url}/profile/${otherChatUserId}/avatar`;

  return (
    <ThemeView style={styles.wrapper} isFullView>
      <Header
        containerStyle={styles.headerContain}
        middleComponent={
          <View style={styles.leftHeader}>
            <TouchableOpacity
              style={styles.headerLeftBackIcon}
              onPress={navigation.goBack}>
              <Icon name="chevron-back-outline" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.title}>
              <Image
                style={styles.avatar}
                source={{
                  uri: otherUserAvatar,
                }}
              />
              <Text style={styles.name}>{userName}</Text>
            </View>
          </View>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerRightCallIcon}
              onPress={() => callUser(userPhone)}>
              <Icon name="call-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerRightDotIcon}
              onPress={() => {}}>
              <Icon name="ellipsis-horizontal" size={22} color="white" />
            </TouchableOpacity>
          </View>
        }
      />
      <ProductItem data={productData} navigation={navigation} />
      <View style={{flex: 1, width: '100%'}}>
        <Chat
          user={currentUser}
          chatData={chatDataList}
          otherUserAvatar={otherUserAvatar}
        />
      </View>
      <FooterItem user={currentUser} chatId={chatId} />
    </ThemeView>
  );
};

export default ChatBox;
