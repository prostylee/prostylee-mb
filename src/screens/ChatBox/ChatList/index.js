import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {ThemeView, Header} from 'components';
import {Searchbar} from 'react-native-paper';
import i18n from 'i18n';
import ListMessage from './ListMessage';
/******** chat aws ********/
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {createChat, deleteChat} from 'graphqlLocal/mutations';
import {getChat, listChats} from 'graphqlLocal/queries';
import {onCreateChat, onDeleteChat} from 'graphqlLocal/subscriptions';
import {getUserAWSAvatar} from 'services/api/userApi';
import {getProfile} from 'services/api/userApi';
import {SUCCESS} from 'constants';
const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER
/******** chat aws ********/

const Message = (props) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [chatList, setChatList] = React.useState([]);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    executeListChats();
  }, []);

  React.useEffect(() => {
    const createChatListener = API.graphql(
      graphqlOperation(onCreateChat),
    ).subscribe({
      next: (chatData) => {
        const addedChat = chatData.value.data.onCreateChat;

        if (addedChat.parentId !== DEFAULT_CHAT_GROUP_ID) {
          // console.log('NEW child');
          // const updatedChats = [...childrenChats];
          // updatedChats.push(addedChat);
          // setChildrenChats(updatedChats);
        } else {
          const updatedChats = [...chatList];
          updatedChats.push(addedChat);
          setChatList(updatedChats);
        }
      },
    });

    const deleteChatListener = API.graphql(
      graphqlOperation(onDeleteChat),
    ).subscribe({
      next: (chatData) => {
        const deletedChat = chatData.value.data.onDeleteChat;
        if (deletedChat.parentId !== DEFAULT_CHAT_GROUP_ID) {
          // const updatedChats = childrenChats.filter(
          //   (cmt) => cmt.id !== deletedChat.id,
          // );
          // setChildrenChats(updatedChats);
        } else {
          const updatedChats = chatList.filter(
            (cmt) => cmt.id !== deletedChat.id,
          );
          setChatList(updatedChats);
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
  }, [chatList, dispatch]);

  const getUserDataList = async (list, userId) => {
    list.forEach(async (e) => {
      const otherUserId = e.participantUserIds?.find((item) => item !== userId);
      try {
        const res = await getProfile(otherUserId);
        if (res.ok && res.data.status === SUCCESS && !res.data.error) {
          setUserData((prev) => ({
            ...prev,
            [otherUserId]: res.data.data,
          }));
        }
      } catch (err) {
        console.log(`cannot get profile ${otherUserId}`, err);
      } finally {
        setChatList(list);
      }
    });
  };

  const executeListChats = async () => {
    dispatch(commonActions.toggleLoading(true));
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user.username) {
        setCurrentUser(user);
        API.graphql(
          graphqlOperation(listChats, {
            filter: {
              parentId: {eq: DEFAULT_CHAT_GROUP_ID},
              participantUserIds: {
                contains: `${user.attributes['custom:userId']}`,
              },
              // ownerFullname: {contains: 'Loc Nguyen'}, // TODO used for search
            },
            // limit: 4, // paging
            // nextToken: null, // fill token to get data of next page
          }),
        )
          .then(async (result) => {
            getUserDataList(
              result.data.listChats.items,
              user.attributes['custom:userId'],
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const deleteChatHandler = async (item) => {
    dispatch(commonActions.toggleLoading(true));
    await API.graphql(graphqlOperation(deleteChat, {input: {id: item.id}}));
    dispatch(commonActions.toggleLoading(false));
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        title={i18n.t('chat.chatListTitle')}
        containerStyle={styles.header}
      />
      <View style={styles.searchContainer}>
        <Searchbar
          style={styles.searchBarStyle}
          inputStyle={styles.searchBarInput}
          placeholder={i18n.t('chat.searchPlaceholder')}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ListMessage
        chatList={chatList}
        currentUser={currentUser}
        deleteChatHandler={deleteChatHandler}
        userData={userData}
      />
    </ThemeView>
  );
};
export default Message;
