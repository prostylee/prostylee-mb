import React from 'react';
import {Text, View, Image} from 'react-native';
import {Storage} from 'aws-amplify';

import styles from './stylesChatBubble';

const ChatBubble = (props) => {
  const {item, index, isUser, chatHistory, otherUserAvatar} = props;
  const itemContent = JSON.parse(item.content);
  const [imageHeight, setImageHeight] = React.useState(200);
  const [imageUri, setImageUri] = React.useState('');

  const priorMessage =
    index > 0 ? JSON.parse(chatHistory[index - 1].content) : {};
  const afterMessage =
    index < chatHistory.length - 1
      ? JSON.parse(chatHistory[index + 1].content)
      : {};
  const paddingTopCalc = () => {
    if (priorMessage && priorMessage.type_view) {
      return priorMessage.type_view === itemContent.type_view ? 2 : 24;
    } else {
      return 0;
    }
  };
  const borderTopRightCalc = () => {
    if (isUser && priorMessage && priorMessage.type_view) {
      return priorMessage.type_view === itemContent.type_view ? 6 : 21;
    } else {
      return 21;
    }
  };
  const borderBottomRightCalc = () => {
    if (isUser && afterMessage && afterMessage.type_view) {
      return afterMessage.type_view === itemContent.type_view ? 6 : 21;
    } else {
      return 21;
    }
  };
  const borderTopLeftCalc = () => {
    if (!isUser && priorMessage && priorMessage.type_view) {
      return priorMessage.type_view === itemContent.type_view ? 6 : 21;
    } else {
      return 21;
    }
  };
  const borderBottomLeftCalc = () => {
    if (!isUser && afterMessage && afterMessage.type_view) {
      return afterMessage.type_view === itemContent.type_view ? 6 : 21;
    } else {
      return 21;
    }
  };

  const getUrl = async (key) => {
    const signedURL = await Storage.get(key);
    setImageUri(signedURL);
  };

  React.useEffect(() => {
    if (itemContent.type_view === 'image') {
      getUrl(itemContent.content);
    }
  }, []);

  return (
    <View
      style={[
        styles.chatBubbleContainer,
        {
          alignItems: isUser ? 'flex-end' : 'flex-start',
          paddingLeft: isUser ? 60 : 20,
          paddingRight: isUser ? 0 : 60,
          paddingTop: paddingTopCalc(),
        },
      ]}>
      {itemContent.type_view === 'image' ? (
        <View
          style={[
            styles.chatBubbleImageContainer,
            {
              opacity: itemContent.disconnected ? 0.5 : 1,
              height: imageHeight,
            },
          ]}>
          <Image
            onLoadStart={async () => {
              await Image.getSize(imageUri, (width, height) => {
                setImageHeight((height / width) * 200);
              });
            }}
            containerStyle={[
              styles.chatBubbleImage,
              {
                height: imageHeight,
                backgroundColor: 'red',
              },
            ]}
            style={[
              styles.chatBubbleImage,
              {
                height: imageHeight,
              },
            ]}
            resizeMode={'contain'}
            source={{uri: imageUri}}
          />
        </View>
      ) : itemContent.type_view === 'text' ? (
        <>
          <View
            style={[
              styles.chatBubble,
              {
                backgroundColor: isUser ? '#E9E9E9' : '#303030',
                borderTopRightRadius: borderTopRightCalc(),
                borderBottomRightRadius: borderBottomRightCalc(),
                borderTopLeftRadius: borderTopLeftCalc(),
                borderBottomLeftRadius: borderBottomLeftCalc(),
                opacity: itemContent.disconnected ? 0.5 : 1,
              },
            ]}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 18,
                opacity: 0.6,
                color: isUser ? '#000000' : '#FFFFFF',
              }}>
              {itemContent?.content || ''}
            </Text>
          </View>
          {!isUser && afterMessage?.type_view !== itemContent.type_view ? (
            <View style={styles.chatSmallIcon}>
              <Image
                containerStyle={styles.chatSmallIconStyle}
                source={{uri: otherUserAvatar}}
              />
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default ChatBubble;
