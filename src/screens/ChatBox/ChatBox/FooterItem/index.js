import React from 'react';
import {
  View,
  Platform,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {ImageChat, EmojyChat, SendChat} from 'svg/social';
import EmojiBoard from 'react-native-emoji-board';
import {isIphoneX} from 'utils/ui';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionSheet} from 'components';
/******** chat aws ********/
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {createChat, updateChat} from 'graphqlLocal/mutations';
import {showMessage} from 'react-native-flash-message';
import * as ImageManipulator from '@pontusab/react-native-image-manipulator';
/******** chat aws ********/

const CANCEL_INDEX = 0;
// const DESTRUCTIVE_INDEX = 0;
const PICK_IMAGE_OPTIONS = [
  i18n.t('cancel'),
  i18n.t('selectInLibrary'),
  i18n.t('takePicture'),
];

const FooterItem = (props) => {
  const actionSheetRef = React.useRef();
  const user = props.user ? props.user : {};
  const chatId = props.chatId ? props.chatId : '';
  const otherChatUserId = props.otherChatUserId ? props.otherChatUserId : '';
  const fullItem = props.fullItem ? props.fullItem : {};

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
      const pngImageResult = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 1,
        format: ImageManipulator.SaveFormat.PNG,
      });
      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(pngImageResult.uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${user.attributes.sub}/chat/chat_${time}.png`;
      Storage.put(fileName, blob, {
        contentType: 'image/png',
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

  const openLibrary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
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
      />
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconFooter}
          onPress={() => {
            actionSheetRef.current.show();
          }}>
          <ImageChat />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconFooter}
          onPress={() => {
            Keyboard.dismiss();
            setEmojiShow(!emojiShow);
          }}>
          <EmojyChat />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconFooter} onPress={addChatHandler}>
          <SendChat />
        </TouchableOpacity>
      </View>
      <EmojiBoard
        showBoard={emojiShow}
        onClick={(item) => onChangeText((prev) => prev + ` ${item.code}`)}
        containerStyle={styles.emoji}
      />
      <ActionSheet
        ref={actionSheetRef}
        options={PICK_IMAGE_OPTIONS}
        cancelButtonIndex={CANCEL_INDEX}
        onPress={(value) => {
          if (value === 1) {
            setTimeout(() => openLibrary(), 200);
            return;
          }
          if (value === 2) {
            setTimeout(() => openCamera(), 200);
          }
        }}
      />
    </View>
  );
};

export default FooterItem;
