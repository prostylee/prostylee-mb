import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '@react-navigation/native';
import FooterInput from './FooterInput';
import CommentItem from './CommentItem';
import DetailComment from './DetailComment';

import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {listComments} from 'graphqlLocal/queries';
import {onCreateComment} from 'graphqlLocal/subscriptions';
import {showMessage} from 'react-native-flash-message';
import {STORY_TYPE} from 'constants';

import styles from './styles';

const Comment = (props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {closeCommentModal, story} = props;

  const CommentRef = React.useRef();
  const [currentUser, setCurrentUser] = React.useState();
  const [listComment, setListComment] = React.useState([]);

  const [parentComment, setParentComment] = React.useState({});
  const [goToChild, setGoToChild] = React.useState(false);

  const storyId = story && story.id ? story.id : '';
  const DEFAULT_PARENT_COMMENT_ID = `${STORY_TYPE}_${storyId}`; // Rule: <targetType>_<targetId>

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
    executeGetComment();
  }, []);

  React.useEffect(() => {
    const createCommentListener = API.graphql(
      graphqlOperation(onCreateComment),
    ).subscribe({
      next: (commentData) => {
        const addedComment = commentData.value.data.onCreateComment;

        console.log('addedComment', addedComment);
        if (addedComment.parentId === DEFAULT_PARENT_COMMENT_ID) {
          const updatedComments = [...listComment];
          updatedComments.push(addedComment);
          setListComment(updatedComments);
        } else {
        }
      },
    });

    return () => {
      if (createCommentListener) {
        createCommentListener.unsubscribe();
      }
    };
  }, [listComment, dispatch]);

  const executeGetComment = async () => {
    dispatch(commonActions.toggleLoading(true));
    try {
      API.graphql(
        graphqlOperation(listComments, {
          filter: {
            parentId: {eq: DEFAULT_PARENT_COMMENT_ID},
          },
          targetType: {eq: STORY_TYPE},
          // limit: 4,
          // nextToken: null,
        }),
      )
        .then((result) => {
          setListComment(result.data.listComments.items);
        })
        .catch(() => {
          showMessage({
            message: i18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
        });
    } catch (err) {
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const moveToCommentDetail = (item) => {
    if (CommentRef && CommentRef.current) {
      CommentRef.current.scrollToEnd();
    }
    setParentComment(item);
    setGoToChild(true);
  };

  const ListComment = () => {
    return (
      <>
        <FlatList
          style={styles.list}
          renderItem={({item}) => (
            <CommentItem
              item={item}
              currentUser={currentUser}
              moveToCommentDetail={moveToCommentDetail}
            />
          )}
          data={listComment}
        />
        <FooterInput user={currentUser} storyId={storyId} />
      </>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {i18n.t('storyBoard.commentTitle')}
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={closeCommentModal}>
          <IonIcons name={'ios-close'} size={24} color={colors.$black} />
        </TouchableOpacity>
      </View>
      {goToChild ? (
        <DetailComment
          item={parentComment}
          currentUser={currentUser}
          goBack={() => setGoToChild(false)}
        />
      ) : (
        <ListComment />
      )}
    </KeyboardAvoidingView>
  );
};

Comment.propTypes = {};

export default Comment;
