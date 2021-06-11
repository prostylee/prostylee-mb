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
import {createChat, deleteChat} from 'graphQL/mutations';
import {getChat, listChats} from 'graphQL/queries';
import {onCreateChat, onDeleteChat} from 'graphQL/subscriptions';
import {getUserAWSAvatar} from 'services/api/userApi';
const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER
/******** chat aws ********/

const Message = (props) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentUserName, setCurrentUserName] = React.useState('');
  const [chatList, setChatList] = React.useState([]);

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

  const executeListChats = async () => {
    dispatch(commonActions.toggleLoading(true));
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user.username) {
        // console.log('USER ' + JSON.stringify(user, null, 4));
        setCurrentUserName(user.username);
        API.graphql(
          graphqlOperation(listChats, {
            filter: {
              parentId: {eq: DEFAULT_CHAT_GROUP_ID},
              participantUserIds: {contains: user.attributes.sub},
              // ownerFullname: {contains: 'Loc Nguyen'}, // TODO used for search
            },
            // limit: 4, // paging
            // nextToken: null, // fill token to get data of next page
          }),
        )
          .then((result) => {
            setChatList(result.data.listChats.items);
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
        currentUserName={currentUserName}
        deleteChatHandler={deleteChatHandler}
      />
    </ThemeView>
  );
};
export default Message;
