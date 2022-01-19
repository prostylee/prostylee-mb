import React from 'react';
import {View, Alert} from 'react-native';
import styles from './style';
import {ThemeView, Header} from 'components';
import {Searchbar} from 'react-native-paper';
import i18n from 'i18n';
import ListMessage from './ListMessage';
import debounce from 'lodash/debounce';
/******** chat aws ********/
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {commonActions, userSelectors} from 'reducers';
import {updateChat} from 'graphqlLocal/mutations';
import {listChats} from 'graphqlLocal/queries';
import {onCreateChat, onUpdateChat} from 'graphqlLocal/subscriptions';
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

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

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
          return;
        }
        const updatedChats = [...chatList];
        getUserDataList([...chatList, addedChat], userProfile.id);
        updatedChats.push(addedChat);
        setChatList(updatedChats);
        setChatListDisplay(updatedChats);
      },
    });

    const updateChatListener = API.graphql(
      graphqlOperation(onUpdateChat),
    ).subscribe({
      next: (chatData) => {
        const updatedChat = chatData.value.data.onUpdateChat;
        if (updatedChat.participantUserIds.length === 2) {
          const updatedChatIndex = chatList.findIndex(
            (item) => item.id === updatedChat.id,
          );
          const newChatList = [
            ...chatList.slice(0, updatedChatIndex),
            updatedChat,
            ...chatList.slice(updatedChatIndex + 1),
          ];
          setChatList(newChatList);
          setChatListDisplay(newChatList);
        } else if (updatedChat.participantUserIds.length === 1) {
          if (updatedChat.participantUserIds[0] == userProfile.id) {
            const updatedChatIndex = chatList.findIndex(
              (item) => item.id === updatedChat.id,
            );
            const newChatList = [
              ...chatList.slice(0, updatedChatIndex),
              updatedChat,
              ...chatList.slice(updatedChatIndex + 1),
            ];
            setChatList(newChatList);
            setChatListDisplay(newChatList);
          } else {
            const updatedChatIndex = chatList.findIndex(
              (item) => item.id === updatedChat.id,
            );
            const newChatList = [
              ...chatList.slice(0, updatedChatIndex),
              ...chatList.slice(updatedChatIndex + 1),
            ];
            setChatList(newChatList);
            setChatListDisplay(newChatList);
          }
        } else {
          const updatedChatIndex = chatList.findIndex(
            (item) => item.id === updatedChat.id,
          );
          const newChatList = [
            ...chatList.slice(0, updatedChatIndex),
            ...chatList.slice(updatedChatIndex + 1),
          ];
          setChatList(newChatList);
          setChatListDisplay(newChatList);
        }
      },
    });

    dispatch(commonActions.toggleLoading(false));

    return () => {
      if (createChatListener) {
        createChatListener.unsubscribe();
      }
      if (updateChatListener) {
        updateChatListener.unsubscribe();
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
    let uniqueUser = [];
    list.forEach(async (e) => {
      const otherUserId = e.participantUserIds?.find((item) => item != userId);
      if (otherUserId) {
        if (!uniqueUser.includes(otherUserId)) {
          uniqueUser.push(otherUserId);
        }
      } else {
        if (!uniqueUser.includes(e.imageUrls[0])) {
          uniqueUser.push(e.imageUrls[0]);
        }
      }
    });
    uniqueUser.forEach(async (user) => {
      if (user) {
        try {
          const res = await getProfile(user);
          if (res.ok && res.data.status === SUCCESS && !res.data.error) {
            let thisUserId = '';
            if (user) {
              thisUserId = user;
            }
            userDataList[thisUserId] = res.data.data;
            userDataFilterList.push({
              id: res.data.data.id,
              name: res.data.data.fullName,
            });
          }
        } catch (err) {
          showMessage({
            message: i18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
          setLoading(false);
        } finally {
          if (Object.keys(userDataList).length === uniqueUser.length) {
            setUserData(userDataList);
            setUserFilterData(userDataFilterList);
          }
          setChatList(list);
          setChatListDisplay(list);
        }
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          .catch((_) => {
            showMessage({
              message: i18n.t('unknownMessage'),
              type: 'danger',
              position: 'top',
            });
            setLoading(false);
          });
      }
    } catch (_) {
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
      setLoading(false);
    }
  };

  const emptyUserFromChat = async (id) => {
    await API.graphql(
      graphqlOperation(updateChat, {
        input: {
          id: id,
          participantUserIds: [],
          imageUrls: [],
        },
      }),
    );
  };

  const removeUserFromChat = async (item) => {
    const remainUserList = item.participantUserIds.filter(
      (user) => user != userProfile.id,
    );
    await API.graphql(
      graphqlOperation(updateChat, {
        input: {
          id: item.id,
          participantUserIds: remainUserList,
          imageUrls: [userProfile.id],
        },
      }),
    );
  };

  const deleteChatHandler = async (item) => {
    dispatch(commonActions.toggleLoading(true));
    try {
      if (item.participantUserIds.length === 2) {
        await removeUserFromChat(item);
      } else {
        await emptyUserFromChat(item.id);
      }
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const deleteChatConfirm = async (item, itemRef) => {
    Alert.alert(i18n.t('caution'), i18n.t('chat.confirmDeleteChat'), [
      {
        text: i18n.t('confirm'),
        onPress: () => {
          deleteChatHandler(item);
        },
        style: 'destructive',
      },
      {
        text: i18n.t('cancel'),
        onPress: () => {
          closeChatItemSwipe(itemRef);
        },
        style: 'cancel',
      },
    ]);
  };

  const closeChatItemSwipe = (itemRef) => {
    if (itemRef && itemRef.current) {
      itemRef.current?.close();
    }
  };

  const filterSearchValue = debounce(
    (value) => {
      const searchValue = value.trim();
      if (searchValue === '') {
        setChatListDisplay(chatList);
        setLoading(false);
        return;
      }
      const searchList = [];
      userFilterData.forEach((item) => {
        const itemName = item.name?.toLowerCase();
        if (itemName?.includes(searchValue.toLowerCase())) {
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
      setLoading(false);
    },
    2000,
    {trailing: true, leading: false, maxWait: 4000},
  );

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterSearchValue(query);
    setLoading(true);
  };
  const chatListDateFilter = chatListDisplay.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );

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
        chatList={chatListDateFilter}
        currentUser={currentUser}
        deleteChatHandler={deleteChatConfirm}
        userData={userData}
        loading={loading}
        refreshing={refreshing}
        refreshChatList={refreshChatList}
      />
    </ThemeView>
  );
};
export default Message;
