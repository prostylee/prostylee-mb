import React from 'react';
import {View, Platform, TextInput, Keyboard, Alert} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import EmojiBoard from 'react-native-emoji-board';
import {isIphoneX} from 'utils/ui';
import ImagePicker from 'react-native-image-crop-picker';
/******** chat aws ********/
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {createChat, updateChat} from 'graphqlLocal/mutations';
import {showMessage} from 'react-native-flash-message';
/******** chat aws ********/

const FooterItem = (props) => {
  const user = props.user ? props.user : {};
  const chatId = props.chatId ? props.chatId : '';
  const otherChatUserId = props.otherChatUserId ? props.otherChatUserId : '';
  const fullItem = props.fullItem ? props.fullItem : {};

  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [text, onChangeText] = React.useState('');
  const [emojiShow, setEmojiShow] = React.useState(false);

  const _keyboardDidShow = () => {
    if (emojiShow) {
      setEmojiShow(false);
    }
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardDidShow);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardDidShow);
    };
  }, []);

  const uploadToStorage = async (uri) => {
    try {
      if (!uri) {
        return;
      }
      dispatch(commonActions.toggleLoading(true));
      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${user.attributes.sub}/chat/chat_${time}.jpg`;
      Storage.put(fileName, blob, {
        contentType: 'image/jpeg',
      })
        .then((result) => {
          addChatImageHandler(result.key);
        })
        .catch((_) => {
          Alert.alert(i18n.t('error.cannotUploadImage'));
        });
    } catch (err) {
      Alert.alert(i18n.t('error.cannotGetImage'));
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const addChatImageHandler = async (key) => {
    if (!key) {
      return;
    }
    await API.graphql(
      graphqlOperation(createChat, {
        input: {
          parentId: chatId,
          ownerId: user.attributes.sub,
          owner: user.username,
          ownerFullname: user.attributes.name,
          participantUserIds: [
            otherChatUserId,
            user.attributes['custom:userId'],
          ], // ['created-user-id', 'participant-user-id'], // TODO fill user id would like to chat
          imageUrls: [key], // TODO fill image urls if user attached images in chat
          content: JSON.stringify({
            type_view: 'image',
            content: key,
          }),
          createdAt: new Date().toISOString(), // "2021-02-18T15:41:16Z"
        },
      }),
    );
    onChangeText('');
    if (fullItem.participantUserIds.length === 2) {
      await API.graphql(
        graphqlOperation(updateChat, {
          input: {
            id: fullItem.id,
            imageUrls: [user.attributes.sub],
          },
        }),
      );
    }
  };

  const addChatHandler = async () => {
    if (!text) {
      return;
    }
    const newChatMessage = {
      parentId: chatId,
      ownerId: user.attributes.sub,
      owner: user.username,
      ownerFullname: user.attributes.name,
      participantUserIds: [otherChatUserId, user.attributes['custom:userId']], // ['created-user-id', 'participant-user-id'], // TODO fill user id would like to chat
      imageUrls: [], // TODO fill image urls if user attached images in chat
      content: JSON.stringify({
        type_view: 'text',
        content: text,
      }),
      createdAt: new Date().toISOString(), // "2021-02-18T15:41:16Z"
    };
    await API.graphql(
      graphqlOperation(createChat, {
        input: newChatMessage,
      }),
    );
    onChangeText('');
    if (fullItem.participantUserIds.length === 2) {
      await API.graphql(
        graphqlOperation(updateChat, {
          input: {
            id: fullItem.id,
            imageUrls: [user.attributes.sub],
          },
        }),
      );
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: false,
    })
      .then((res) => {
        uploadToStorage(Platform.OS === 'ios' ? res.sourceURL : res.path);
      })
      .catch((e) => {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
  };

  return (
    <View
      style={[
        styles.footer,
        {paddingBottom: emojiShow ? (isIphoneX() ? 300 : 290) : 25},
      ]}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onTouchStart={async () => {
          setEmojiShow(false);
          if (fullItem.participantUserIds.length === 2) {
            await API.graphql(
              graphqlOperation(updateChat, {
                input: {
                  id: fullItem.id,
                  imageUrls: [],
                },
              }),
            );
          }
        }}
        value={text}
        placeholder={i18n.t('chat.inputPlaceholder')}
        onSubmitEditing={() => {
          addChatHandler();
        }}
      />
      <View style={styles.iconRow}>
        <View style={styles.iconFooter}>
          <Icon
            name="ios-camera-outline"
            size={30}
            color={colors['$black']}
            onPress={openCamera}
          />
        </View>
        <View style={styles.iconFooter}>
          <IconFeather
            name="smile"
            color={colors['$black']}
            size={25}
            onPress={() => {
              Keyboard.dismiss();
              setEmojiShow(!emojiShow);
            }}
          />
        </View>
      </View>
      <EmojiBoard
        showBoard={emojiShow}
        onClick={(item) => onChangeText((prev) => prev + ` ${item.code}`)}
        containerStyle={styles.emoji}
      />
    </View>
  );
};

export default FooterItem;
