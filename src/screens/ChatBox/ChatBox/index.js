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
import {createChat, deleteChat} from 'graphQL/mutations';
import {getChat, listChats} from 'graphQL/queries';
import {onCreateChat, onDeleteChat} from 'graphQL/subscriptions';
import {getUserAWSAvatar} from 'services/api/userApi';
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

  const dispatch = useDispatch();
  const [chatData, setChatData] = React.useState([]);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('USER ' + JSON.stringify(user, null, 4));
        // setCurrentUserName(user.username);
      })
      .catch((err) => console.log(err));
    executeGetChat();
  }, []);

  const executeGetChat = () => {
    dispatch(commonActions.toggleLoading(true));
    API.graphql(
      graphqlOperation(getChat, {
        id: chatId,
      }),
    )
      .then((result) => {
        setChatData(result.data.getChat.childrens.items);
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
  console.log('chatData', JSON.stringify(chatData, null, 4));
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
                  uri: `${configEnv.api_url}/profile/${otherChatUserId}/avatar`,
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
              onPress={() => callUser('')}>
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
      <ProductItem />
      <View style={{flex: 1}}>
        <Chat />
      </View>
      <FooterItem />
    </ThemeView>
  );
};

export default ChatBox;
