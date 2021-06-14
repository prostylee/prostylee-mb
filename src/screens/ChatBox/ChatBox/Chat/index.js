import React from 'react';
import {View, FlatList} from 'react-native';
import ChatBubble from './ChatBubble';
import styles from './styles';

const ChatScreen = (props) => {
  const user = props.user ? props.user : {};
  const otherUserAvatar = props.otherUserAvatar ? props.otherUserAvatar : '';
  const [hasMore, setHasMore] = React.useState(true);
  const messageListRef = React.useRef();

  const ChatMessageList = React.useMemo(() => {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 50;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };
    const lastReadMessage = props.chatData.findIndex((item) => {
      return item.type_message === 'user' && item.status_read;
    });
    if (!props.chatData?.length) {
      return null;
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
      />
    );
  }, [props.chatData, hasMore]);

  return ChatMessageList;
};
export default ChatScreen;
