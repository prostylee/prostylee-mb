import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {ThemeView, Header} from 'components';
import {Searchbar} from 'react-native-paper';
import i18n from 'i18n';
import ListMessage from './ListMessage';
import debounce from 'lodash/debounce';
/******** chat aws ********/
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {deleteChat} from 'graphqlLocal/mutations';
import {listChats} from 'graphqlLocal/queries';
import {onCreateChat, onDeleteChat} from 'graphqlLocal/subscriptions';
import {getProfile} from 'services/api/userApi';
import {SUCCESS} from 'constants';
import {showMessage} from 'react-native-flash-message';
const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER
/******** chat aws ********/

const Message = (props) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [chatList, setChatList] = React.useState([]);
  const [chatListDisplay, setChatListDisplay] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const [userFilterData, setUserFilterData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    executeListChats();
  }, []);

  React.useEffect(() => {
    const createChatListener = API.graphql(
      graphqlOperation(onCreateChat),
    ).subscribe({
      next: (chatData) => {
        const addedChat = chatData.value.data.onCreateChat;
        const updatedChats = [...chatList];
        updatedChats.push(addedChat);
        setChatList(updatedChats);
        setChatListDisplay(updatedChats);
      },
    });

    const deleteChatListener = API.graphql(
      graphqlOperation(onDeleteChat),
    ).subscribe({
      next: (chatData) => {
        const deletedChat = chatData.value.data.onDeleteChat;
        const updatedChats = chatList.filter(
          (cmt) => cmt.id !== deletedChat.id,
        );
        setChatList(updatedChats);
        setChatListDisplay(updatedChats);
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

  const refreshChatList = async () => {
    setRefreshing(true);
    try {
      await executeListChats();
    } finally {
      setRefreshing(false);
    }
  };

  const getUserDataList = async (list, userId) => {
    let userDataList = {};
    let userDataFilterList = [];
    list.forEach(async (e) => {
      const otherUserId = e.participantUserIds?.find((item) => item !== userId);
      try {
        const res = await getProfile(otherUserId);
        if (res.ok && res.data.status === SUCCESS && !res.data.error) {
          userDataList[otherUserId] = res.data.data;
          userDataFilterList.push({
            id: res.data.data.id,
            name: res.data.data.fullName,
          });
          // setUserData((prev) => ({
          //   ...prev,
          //   [otherUserId]: res.data.data,
          // }));
        }
      } catch (err) {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      } finally {
        setUserData(userDataList);
        setUserFilterData(userDataFilterList);
        setChatList(list);
        setChatListDisplay(list);
      }
    });
  };

  const executeListChats = async () => {
    setLoading(true);
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
            showMessage({
              message: i18n.t('unknownMessage'),
              type: 'success',
              position: 'top',
            });
          });
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteChatHandler = async (item) => {
    dispatch(commonActions.toggleLoading(true));
    await API.graphql(graphqlOperation(deleteChat, {input: {id: item.id}}));
    dispatch(commonActions.toggleLoading(false));
  };

  const filterSearchValue = debounce(
    (value) => {
      const searchValue = value.trim();
      if (searchValue === '') {
        setChatListDisplay(chatList);
        return;
      }
      const searchList = [];
      userFilterData.forEach((item) => {
        if (item.name?.includes(searchValue)) {
          searchList.push(`${item.id}`);
        }
      });
      const filterResult = chatList.filter((item) => {
        const otherChatUserId = item.participantUserIds.find(
          (userId) => userId != currentUser.attributes['custom:userId'],
        );
        return searchList.includes(otherChatUserId);
      });
      setChatListDisplay(filterResult);
    },
    2000,
    {trailing: true, leading: false, maxWait: 4000},
  );

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterSearchValue(query);
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
        chatList={chatListDisplay}
        currentUser={currentUser}
        deleteChatHandler={deleteChatHandler}
        userData={userData}
        loading={loading}
        refreshing={refreshing}
        refreshChatList={refreshChatList}
      />
    </ThemeView>
  );
};
export default Message;
