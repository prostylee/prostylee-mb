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
import {
  commonActions,
  commonSelectors,
  newFeedActions,
  newFeedSelectors,
} from 'reducers';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {listComments} from 'graphqlLocal/queries';
import {onCreateComment} from 'graphqlLocal/subscriptions';
import {showMessage} from 'react-native-flash-message';
import {FEED_TYPE, TYPE_USER, SUCCESS} from 'constants';
import {targetTypeSelector} from 'redux/selectors/common';
import {followStoreService, unFollowStoreService} from 'services/api/storeApi';
import {follow, unfollow} from 'services/api/socialApi';
import styles from './styles';

const Comment = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const targetType = useSelector((state) => targetTypeSelector(state));
  const isForeGround = useSelector((state) =>
    commonSelectors.isForeGroundSelector(state),
  );
  const newFeedItem = route?.params?.newFeedItem || {};
  const localFollowedStore = useSelector((state) =>
    newFeedSelectors.getLocalFollowedStore(state),
  );
  const localFollowedUser = useSelector((state) =>
    newFeedSelectors.getLocalFollowedUser(state),
  );
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

  let createCommentListener;

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
  }, []);

  React.useEffect(() => {
    if (isForeGround) {
      executeGetComment();
    }
  }, [isForeGround]);

  React.useEffect(() => {
    if (isForeGround) {
      subScribeToCommentChannel();
    }
    return () => {
      if (createCommentListener) {
        createCommentListener?.unsubscribe();
      }
    };
  }, [listComment, dispatch, isForeGround]);

  const subScribeToCommentChannel = async () => {
    try {
      createCommentListener = API.graphql(
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
        error: (error) => {
          console.warn(error);
        },
      });
    } catch (e) {
      console.log('error subscribe chat channel');
    }
  };

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

  const _handleFollowUser = async (followed) => {
    if (!followed) {
      const res = await follow({
        targetId: newFeedItem?.ownerId,
        targetType: TYPE_USER,
      });
      if (res.ok && res.data.status === SUCCESS) {
        // setFollowed(true);
        if (localFollowedUser && localFollowedUser?.length) {
          if (!localFollowedUser?.includes(newFeedItem?.ownerId)) {
            dispatch(
              newFeedActions.setLocalFollowedUser([
                ...localFollowedUser,
                newFeedItem?.ownerId,
              ]),
            );
          }
        } else {
          dispatch(newFeedActions.setLocalFollowedUser([newFeedItem?.ownerId]));
        }
      }
    } else {
      const res = await unfollow({
        targetId: newFeedItem?.ownerId,
        targetType: TYPE_USER,
      });
      if (res.ok && res.data.status === SUCCESS) {
        // setFollowed(false);
        if (localFollowedUser && localFollowedUser?.length) {
          if (localFollowedUser?.includes(newFeedItem?.ownerId)) {
            const itemIndex = localFollowedUser?.findIndex(
              (item) => item == newFeedItem?.ownerId,
            );
            dispatch(
              newFeedActions.setLocalFollowedUser([
                ...localFollowedUser.slice(0, itemIndex),
                ...localFollowedUser.slice(itemIndex + 1),
              ]),
            );
          }
        }
      }
    }
  };

  const _handleFollowStore = async (followed) => {
    let res = null;
    try {
      if (followed) {
        res = await unFollowStoreService(newFeedItem?.ownerId);
        if (localFollowedStore && localFollowedStore?.length) {
          if (localFollowedStore?.includes(newFeedItem?.ownerId)) {
            const itemIndex = localFollowedStore?.findIndex(
              (item) => item == newFeedItem?.ownerId,
            );
            dispatch(
              newFeedActions.setLocalFollowedStore([
                ...localFollowedStore.slice(0, itemIndex),
                ...localFollowedStore.slice(itemIndex + 1),
              ]),
            );
          }
        }
      } else {
        res = await followStoreService(newFeedItem?.ownerId);
        if (localFollowedStore && localFollowedStore?.length) {
          if (!localFollowedStore?.includes(newFeedItem?.ownerId)) {
            dispatch(
              newFeedActions.setLocalFollowedStore([
                ...localFollowedStore,
                newFeedItem?.ownerId,
              ]),
            );
          }
        } else {
          dispatch(
            newFeedActions.setLocalFollowedStore([newFeedItem?.ownerId]),
          );
        }
      }
      // setFollowed(!followed);
    } catch (err) {
      showMessage({
        message: `${res?.data?.status}: ${res?.data?.error}`,
        type: 'danger',
        position: 'top',
      });
    }
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
        showFollowText={false}
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
        title={targetType === TYPE_USER && userProfile ? null : 'Comment'}
        middleComponent={
          targetType === TYPE_USER && userProfile ? (
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
              followStatusOfUserLogin:
                targetType === TYPE_USER
                  ? localFollowedUser?.includes(newFeedItem?.ownerId)
                  : localFollowedStore?.includes(newFeedItem?.ownerId),
              id: newFeedItem?.ownerId || 0,
            }}
            addFollowAction={() => {
              if (targetType === TYPE_USER) {
                _handleFollowUser(false);
              } else {
                _handleFollowStore(false);
              }
            }}
            removeFollowAction={() => {
              if (targetType === TYPE_USER) {
                _handleFollowUser(true);
              } else {
                _handleFollowStore(true);
              }
            }}
            targetType={targetType}
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
          <ScrollView
            style={styles.scrollContainer}
            keyboardShouldPersistTaps={'handled'}>
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
