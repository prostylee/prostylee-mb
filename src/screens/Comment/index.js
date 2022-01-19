import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeView, Header, FollowTextButton} from 'components';
import FeedItem from 'screens/NewFeed/VerticalFeed/item';
import {useRoute} from '@react-navigation/native';
import i18n from 'i18n';

import FooterInput from './FooterInput';
import CommentItem from './CommentItem';
import DetailComment from './DetailComment';

import {useSelector, useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {listComments} from 'graphqlLocal/queries';
import {onCreateComment} from 'graphqlLocal/subscriptions';
import {showMessage} from 'react-native-flash-message';
import {FEED_TYPE, TYPE_USER} from 'constants';
import {targetTypeSelector} from 'redux/selectors/common';

import styles from './styles';

const Comment = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const targetType = useSelector((state) => targetTypeSelector(state));
  const newFeedItem = route?.params?.newFeedItem || {};

  const [currentUser, setCurrentUser] = React.useState();
  const [listComment, setListComment] = React.useState([]);

  const [parentComment, setParentComment] = React.useState({});
  const [goToChild, setGoToChild] = React.useState(false);

  const feedId = newFeedItem && newFeedItem.id ? newFeedItem.id : '';
  const userProfile = newFeedItem?.userResponseLite
    ? newFeedItem?.userResponseLite
    : null;
  const commentTargetType = newFeedItem.type || FEED_TYPE;
  const DEFAULT_PARENT_COMMENT_ID = `${commentTargetType}_${feedId}`; // Rule: <targetType>_<targetId>

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
          targetType: {eq: commentTargetType},
          // limit: 4,
          // nextToken: null,
        }),
      )
        .then((result) => {
          const listCommentsResult = result.data.listComments.items;
          const filterListComments =
            listCommentsResult && listCommentsResult?.length
              ? listCommentsResult?.sort(
                  (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                )
              : [];
          setListComment(filterListComments);
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
    setParentComment(item);
    setGoToChild(true);
  };

  const EmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{i18n.t('storyBoard.noComment')}</Text>
      </View>
    );
  };

  const MemoFeed = React.useMemo(() => {
    return (
      <FeedItem
        newFeedItem={newFeedItem}
        targetType={targetType}
        showHeader={false}
      />
    );
  }, []);

  const ListComment = () => {
    return (
      <>
        {listComment && listComment.length ? (
          <View style={styles.list}>
            {listComment.map((item, index) => {
              return (
                <CommentItem
                  key={`comment_${index}`}
                  item={item}
                  currentUser={currentUser}
                  moveToCommentDetail={moveToCommentDetail}
                />
              );
            })}
          </View>
        ) : (
          <EmptyList />
        )}
        <FooterInput
          user={currentUser}
          feedId={feedId}
          commentTargetType={commentTargetType}
        />
      </>
    );
  };

  return (
    <ThemeView isFullView>
      <Header
        isDefault
        title={userProfile ? null : 'Comment'}
        middleComponent={
          userProfile ? (
            <View style={styles.title}>
              <Image
                style={styles.avatar}
                source={{
                  uri: userProfile?.avatar,
                }}
              />
              <Text style={styles.name}>{userProfile?.fullName}</Text>
            </View>
          ) : null
        }
        titleStyle={styles.headerTitle}
        rightComponent={
          <FollowTextButton
            item={{
              followStatusOfUserLogin: newFeedItem?.followStatusOfUserLogin,
              id: userProfile?.id || 0,
            }}
            targetType={TYPE_USER}
          />
        }
        containerStyle={styles.header}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {goToChild ? (
          <DetailComment
            item={parentComment}
            currentUser={currentUser}
            goBack={() => setGoToChild(false)}
            commentTargetType={commentTargetType}
          />
        ) : (
          <ScrollView style={styles.scrollContainer}>
            {MemoFeed}
            <ListComment />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </ThemeView>
  );
};

Comment.defaultProps = {};

Comment.propTypes = {};

export default Comment;
