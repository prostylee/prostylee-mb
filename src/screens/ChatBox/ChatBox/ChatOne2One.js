import React from 'react';
import {FlatList, View} from 'react-native';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {TextButton, TextInputBorderBottom} from 'components';
import {createChat, deleteChat} from 'graphQL/mutations';
import {getChat, listChats} from 'graphQL/queries';
import {onCreateChat, onDeleteChat} from 'graphQL/subscriptions';
import {formatTime} from 'utils/datetime';
import {
  Button,
  Divider,
  List,
  overlay,
  Text,
  useTheme,
} from 'react-native-paper';

const DEFAULT_CHAT_GROUP_ID = 'USER_2_USER'; // Rule: USER_2_USER
import demoData from './demodata.json';

const ChatOne2One = (props) => {
  const theme = useTheme();
  const backgroundColor = overlay(2, theme.colors.surface);
  const dispatch = useDispatch();
  const [chat, setChat] = React.useState('');
  const [parentChat, setParentChat] = React.useState('');
  const [chats, setChats] = React.useState([]);
  const [childrenChats, setChildrenChats] = React.useState([]);
  const [currentUserName, setCurrentUserName] = React.useState('');

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('USER ' + JSON.stringify(user, null, 4));
        setCurrentUserName(user.username);
      })
      .catch((err) => console.log(err));
    executeListChats();
  }, [currentUserName]);

  const executeListChats = async () => {
    dispatch(commonActions.toggleLoading(true));
    const user = await Auth.currentAuthenticatedUser();
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
        console.log('Chats ' + JSON.stringify(result));
        setChats(result.data.listChats.items);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(commonActions.toggleLoading(false));
  };

  const executeGetChat = (chatId) => {
    console.log('executeGetChat ' + chatId);
    dispatch(commonActions.toggleLoading(true));
    API.graphql(
      graphqlOperation(getChat, {
        id: chatId,
      }),
    )
      .then((result) => {
        console.log('Chat ' + JSON.stringify(result));
        setChildrenChats(result.data.getChat.childrens.items);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(commonActions.toggleLoading(false));
  };

  React.useEffect(() => {
    const createChatListener = API.graphql(
      graphqlOperation(onCreateChat),
    ).subscribe({
      next: (chatData) => {
        const addedChat = chatData.value.data.onCreateChat;
        console.log('addedChat ' + JSON.stringify(addedChat));

        if (addedChat.parentId !== DEFAULT_CHAT_GROUP_ID) {
          console.log('NEW child');
          const updatedChats = [...childrenChats];
          updatedChats.push(addedChat);
          setChildrenChats(updatedChats);
        } else {
          console.log('NEW root');
          const updatedChats = [...chats];
          updatedChats.push(addedChat);
          setChats(updatedChats);
        }
      },
    });

    const deleteChatListener = API.graphql(
      graphqlOperation(onDeleteChat),
    ).subscribe({
      next: (chatData) => {
        const deletedChat = chatData.value.data.onDeleteChat;
        console.log('deletedChat ' + JSON.stringify(deletedChat));

        if (deletedChat.parentId !== DEFAULT_CHAT_GROUP_ID) {
          const updatedChats = childrenChats.filter(
            (cmt) => cmt.id !== deletedChat.id,
          );
          setChildrenChats(updatedChats);
        } else {
          const updatedChats = chats.filter((cmt) => cmt.id !== deletedChat.id);
          setChats(updatedChats);
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
  }, [chats, childrenChats, dispatch]);

  const onChangeChat = (text) => {
    setChat(text);
  };

  const addChatHandler = async () => {
    console.log('addChatHandler ' + chat);
    if (!chat) {
      return;
    }

    const user = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(createChat, {
        input: {
          parentId: parentChat ? parentChat.id : DEFAULT_CHAT_GROUP_ID,
          ownerId: user.attributes.sub,
          owner: user.username,
          ownerFullname: user.username,
          participantUserIds: ['191', '30'], // ['created-user-id', 'participant-user-id'], // TODO fill user id would like to chat
          imageUrls: [
            'https://pbs.twimg.com/profile_images/3390520999/c167795c6ab9ccad370ce53dbe85fd05.jpeg',
            'https://s3.amazonaws.com/ionic-marketplace/m-fashion/icon.jpg',
          ], // TODO fill image urls if user attached images in chat
          content: JSON.stringify(demoData),
          createdAt: new Date().toISOString(), // "2021-02-18T15:41:16Z"
        },
      }),
    );
    console.log(
      'Submit chat successfully with response' + JSON.stringify(response),
    );
    setChat('');
  };

  const replyChatHandler = (item) => {
    console.log('replyChatHandler ' + JSON.stringify(item));
    setParentChat(item);
    executeGetChat(item.id);
  };

  const deleteChatHandler = async (item) => {
    console.log('deleteChatHandler ' + item.id);
    dispatch(commonActions.toggleLoading(true));
    const res = await API.graphql(
      graphqlOperation(deleteChat, {input: {id: item.id}}),
    );
    dispatch(commonActions.toggleLoading(false));
    console.log('Delete successfully with response ' + JSON.stringify(res));
  };

  const _renderItem = ({item, index}) => {
    return (
      <List.Item
        title={formatTime(item.createdAt)}
        description={item.content + '-' + item.owner}
        left={(props) => (
          <List.Icon
            {...props}
            icon={
              item.owner === currentUserName ? 'chevron-left' : 'chevron-right'
            }
            color={item.owner === currentUserName ? '#205da0' : '#01ab01'}
          />
        )}
        right={(props) => (
          <>
            {item.owner === currentUserName && (
              <Button icon="delete" onPress={() => deleteChatHandler(item)} />
            )}
            <Button icon="reply" onPress={() => replyChatHandler(item)} />
          </>
        )}
      />
    );
  };

  return (
    <React.Fragment>
      <View style={{padding: 20}}>
        <TextInputBorderBottom
          hint={'Enter your chat here'}
          value={chat}
          onChangeText={(text) => onChangeChat(text)}
          style={{width: '100%'}}
          autoFocus={true}
        />
      </View>

      <ButtonOutlined onPress={addChatHandler} label={'Add'} />

      <View style={{height: '70%', width: '100%', padding: 20}}>
        <View style={{flex: 1}}>
          {chats && chats.length > 0 && (
            <FlatList
              contentContainerStyle={[
                {backgroundColor: theme.colors.background},
                {backgroundColor},
              ]}
              ItemSeparatorComponent={() => <Divider />}
              data={chats}
              renderItem={_renderItem}
              keyExtractor={(item, index) => `${item.id}`}
            />
          )}
        </View>

        <View style={{flex: 1}}>
          <View style={{paddingBottom: 20}} />
          <TextButton
            onPress={() => {
              setParentChat(null);
              setChildrenChats([]);
            }}
            label={'Back to parent'}
          />

          <Text>
            {parentChat ? 'Parent: ' + parentChat.content : 'No parent'}
          </Text>
          {childrenChats && childrenChats.length > 0 && (
            <FlatList
              contentContainerStyle={[
                {backgroundColor: theme.colors.background},
                {backgroundColor},
              ]}
              ItemSeparatorComponent={() => <Divider />}
              data={childrenChats}
              renderItem={_renderItem}
              keyExtractor={(item, index) => `${item.id}`}
            />
          )}
        </View>
      </View>
    </React.Fragment>
  );
};

export default ChatOne2One;
