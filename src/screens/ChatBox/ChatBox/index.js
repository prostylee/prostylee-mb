import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import {Header, ThemeView} from 'components';
import i18n from 'i18n';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductItem from './ProductItem';
import FooterItem from './FooterItem';
/******** chat aws ********/
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {getChat} from 'graphqlLocal/queries';
import {onCreateChat, onDeleteChat} from 'graphqlLocal/subscriptions';
const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER
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
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setCurrentUser(user);
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

  const refreshChatList = async () => {
    setRefreshing(true);
    try {
      await executeGetChat();
    } finally {
      setRefreshing(false);
    }
  };

  const executeGetChat = async () => {
    setLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(getChat, {
          id: chatId,
        }),
      );
      if (result) {
        setChatDataList(result.data.getChat.childrens.items);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const callUser = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert(i18n.t('common.textNoPhoneNumber'));
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
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {loading && !refreshing ? null : (
          <ProductItem data={productData} navigation={navigation} />
        )}
        <Chat
          user={currentUser}
          chatData={chatDataList}
          otherUserAvatar={otherUserAvatar}
          loading={loading}
          refreshing={refreshing}
          refreshChatList={refreshChatList}
        />
        <FooterItem user={currentUser} chatId={chatId} />
      </KeyboardAvoidingView>
    </ThemeView>
  );
};

export default ChatBox;
