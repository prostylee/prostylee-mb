import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';

import styles from './stylesChatBubble';

const ChatBubble = ({item, index, isUser, chatHistory}) => {
  const [imageHeight, setImageHeight] = React.useState(200);
  const priorMessage = chatHistory[index - 1];
  const afterMessage = chatHistory[index + 1];
  const paddingTopCalc = () => {
    if (priorMessage && priorMessage.type_message) {
      return priorMessage.type_message === item.type_message ? 2 : 24;
    } else {
      return 0;
    }
  };
  const borderTopRightCalc = () => {
    if (isUser && priorMessage && priorMessage.type_message) {
      return priorMessage.type_message === item.type_message ? 6 : 21;
    } else {
      return 21;
    }
  };
  const borderBottomRightCalc = () => {
    if (isUser && afterMessage && afterMessage.type_message) {
      return afterMessage.type_message === item.type_message ? 6 : 21;
    } else {
      return 21;
    }
  };
  const borderTopLeftCalc = () => {
    if (!isUser && priorMessage && priorMessage.type_message) {
      return priorMessage.type_message === item.type_message ? 6 : 21;
    } else {
      return 21;
    }
  };
  const borderBottomLeftCalc = () => {
    if (!isUser && afterMessage && afterMessage.type_message) {
      return afterMessage.type_message === item.type_message ? 6 : 21;
    } else {
      return 21;
    }
  };
  return (
    <View
      style={[
        styles.chatBubbleContainer,
        {
          alignItems: isUser ? 'flex-end' : 'flex-start',
          paddingLeft: isUser ? 60 : 0,
          paddingRight: isUser ? 0 : 60,
          paddingTop: paddingTopCalc(),
        },
      ]}>
      {item.type_view === 'image' ? (
        <View
          style={[
            styles.chatBubbleImageContainer,
            {
              opacity: item.disconnected ? 0.5 : 1,
              height: imageHeight,
            },
          ]}>
          <Image
            onLoadStart={async () => {
              await Image.getSize(item.message, (width, height) => {
                setImageHeight((height / width) * 200);
              });
            }}
            containerStyle={[
              styles.chatBubbleImage,
              {
                height: imageHeight,
              },
            ]}
            style={[
              styles.chatBubbleImage,
              {
                height: imageHeight,
              },
            ]}
            resizeMode={'contain'}
            source={{uri: item.message}}
          />
        </View>
      ) : item.type_view === 'text' ? (
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
                opacity: item.disconnected ? 0.5 : 1,
              },
            ]}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 18,
                opacity: 0.6,
                color: isUser ? '#000000' : '#FFFFFF',
              }}>
              {item?.content || ''}
            </Text>
          </View>
          {!isUser && afterMessage?.type_message !== item.type_message ? (
            <View style={styles.chatSmallIcon}>
              <Image
                containerStyle={styles.chatSmallIconStyle}
                source={{uri: ''}}
              />
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default ChatBubble;
