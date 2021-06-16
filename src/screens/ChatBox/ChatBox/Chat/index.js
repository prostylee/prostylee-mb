import React from 'react';
import {FlatList} from 'react-native';
import {ChatDetailLoading} from 'components/Loading/contentLoader';
import ChatBubble from './ChatBubble';
import styles from './styles';

const ChatScreen = (props) => {
  const user = props.user ? props.user : {};
  const otherUserAvatar = props.otherUserAvatar ? props.otherUserAvatar : '';
  const loading = props.loading ? props.loading : false;
  const refreshing = props.refreshing ? props.refreshing : false;
  const refreshChatList = props.refreshChatList
    ? props.refreshChatList
    : () => {};

  const messageListRef = React.useRef();

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 50;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  if (!props.chatData?.length) {
    return null;
  }
  if (loading && !refreshing) {
    return <ChatDetailLoading />;
  }
  return (
    <FlatList
      ref={messageListRef}
      style={styles.listContainer}
      contentContainerStyle={styles.listContent}
      data={props.chatData}
      renderItem={(itemData) => (
        <ChatBubble
          item={itemData.item}
          index={itemData.index}
          isUser={user.attributes.sub === itemData.item.ownerId}
          chatHistory={props.chatData}
          otherUserAvatar={otherUserAvatar}
        />
      )}
      keyExtractor={(_, index) => `text_${index}`}
      maxToRenderPerBatch={10}
      initialNumToRender={40}
      onContentSizeChange={() => {
        messageListRef.current.scrollToEnd({animated: false});
      }}
      scrollEventThrottle={400}
      refreshing={refreshing}
      onRefresh={refreshChatList}
    />
  );
};
export default ChatScreen;
