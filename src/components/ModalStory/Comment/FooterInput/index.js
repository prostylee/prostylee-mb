import React from 'react';
import {View, TextInput, Keyboard} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {useTheme} from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';
import EmojiBoard from 'react-native-emoji-board';
import {isIphoneX} from 'utils/ui';
import {STORY_TYPE} from 'constants';
/******** chat aws ********/
import {API, graphqlOperation} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {createComment} from 'graphqlLocal/mutations';
import {commonActions} from 'reducers';
/******** chat aws ********/

const FooterInput = (props) => {
  const user = props.user ? props.user : {};
  const storyId = props.storyId ? props.storyId : '';
  const DEFAULT_PARENT_COMMENT_ID = `${STORY_TYPE}_${storyId}`; // Rule: <targetType>_<targetId>

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

    console.log('ojbec', {
      parentId: DEFAULT_PARENT_COMMENT_ID,
      ownerId: user?.attributes?.sub,
      owner: user?.username,
      ownerFullname: user?.attributes?.name,
      targetId: storyId,
      targetType: STORY_TYPE,
      content: text,
      numberOfLikes: 0,
      createdAt: new Date().toISOString(), // "2021-02-18T15:41:16Z"
    });

    dispatch(commonActions.toggleLoading(true));
    // try {
    const res = await API.graphql(
      graphqlOperation(createComment, {
        input: {
          parentId: DEFAULT_PARENT_COMMENT_ID,
          ownerId: user?.attributes?.sub,
          owner: user.username,
          ownerFullname: user?.attributes?.name,
          targetId: storyId,
          targetType: STORY_TYPE,
          content: text,
          numberOfLikes: 0,
          createdAt: new Date().toISOString(), // "2021-02-18T15:41:16Z"
        },
      }),
    );
    //   console.log('res', res);
    // } catch (error) {
    //   console.log('error comment', error);
    // } finally {
    //   onChangeText('');
    //   dispatch(commonActions.toggleLoading(false));
    // }
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
          // if (fullItem.participantUserIds.length === 2) {
          //   await API.graphql(
          //     graphqlOperation(updateChat, {
          //       input: {
          //         id: fullItem.id,
          //         imageUrls: [],
          //       },
          //     }),
          //   );
          // }
        }}
        value={text}
        placeholder={i18n.t('chat.inputPlaceholder')}
        onSubmitEditing={() => {
          addCommentHandler();
        }}
      />
      <View style={styles.iconRow}>
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

export default FooterInput;
