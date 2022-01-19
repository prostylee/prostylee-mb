import React from 'react';
import {View, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {useTheme} from '@react-navigation/native';
import {EmojyChat, SendChat} from 'svg/social';
import EmojiBoard from 'react-native-emoji-board';
import {isIphoneX} from 'utils/ui';
import {STORY_TYPE} from 'constants';
/******** chat aws ********/
import {API, graphqlOperation} from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {createComment} from 'graphqlLocal/mutations';
import {commonActions, userSelectors} from 'reducers';
/******** chat aws ********/

const FooterInput = (props) => {
  const user = props.user ? props.user : {};
  const storyId = props.storyId ? props.storyId : '';
  const DEFAULT_PARENT_COMMENT_ID = `${STORY_TYPE}_${storyId}`; // Rule: <targetType>_<targetId>

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

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

  const addCommentHandler = async () => {
    if (!text) {
      return;
    }

    dispatch(commonActions.toggleLoading(true));
    try {
      await API.graphql(
        graphqlOperation(createComment, {
          input: {
            parentId: DEFAULT_PARENT_COMMENT_ID,
            ownerId: user?.attributes?.sub,
            owner: user.username,
            ownerFullname: userProfile?.avatar
              ? `${user?.attributes.name}&${userProfile.avatar}`
              : user?.attributes?.name,
            targetId: storyId,
            targetType: STORY_TYPE,
            content: text,
            numberOfLikes: 0,
            createdAt: new Date().toISOString(), // "2021-02-18T15:41:16Z"
          },
        }),
      );
    } catch (error) {
      console.log('error comment', error);
    } finally {
      onChangeText('');
      dispatch(commonActions.toggleLoading(false));
    }
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
        }}
        value={text}
        placeholder={i18n.t('chat.inputPlaceholder')}
      />
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconFooter}
          onPress={() => {
            Keyboard.dismiss();
            setEmojiShow(!emojiShow);
          }}>
          <EmojyChat />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconFooter} onPress={addCommentHandler}>
          <SendChat />
        </TouchableOpacity>
      </View>
      <EmojiBoard
        showBoard={emojiShow}
        onClick={(item) => onChangeText((prev) => prev + ` ${item.code}`)}
        containerStyle={styles.emoji}
      />
    </View>
  );
};

export default FooterInput;
