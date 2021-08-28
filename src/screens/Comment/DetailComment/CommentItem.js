import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import i18n from 'i18n';

import {Heart, HeartFill} from 'svg/common';

import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {API, graphqlOperation} from 'aws-amplify';
import {likeComment, unlikeComment} from 'graphqlLocal/mutations';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';

const CommentItem = ({item, currentUser}) => {
  const dispatch = useDispatch();
  const likeCommentHandler = async (itemComment) => {
    dispatch(commonActions.toggleLoading(true));
    try {
      await API.graphql(
        graphqlOperation(likeComment, {
          id: itemComment.id,
          userId: currentUser.attributes.sub,
        }),
      );
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

  const unLikeCommentHandler = async (itemComment) => {
    dispatch(commonActions.toggleLoading(true));
    try {
      await API.graphql(
        graphqlOperation(unlikeComment, {
          id: itemComment.id,
          userId: currentUser.attributes.sub,
        }),
      );
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

  const ButtonLike = ({
    isLikeByUser,
    action,
    likeSize = 20,
    unlikeSize = 16,
  }) => {
    return (
      <TouchableOpacity onPress={action}>
        {!isLikeByUser ? (
          <Heart width={unlikeSize} height={unlikeSize} />
        ) : (
          <HeartFill width={likeSize} height={likeSize} />
        )}
      </TouchableOpacity>
    );
  };

  const nameAvatar = item.ownerFullname ? item.ownerFullname.split('&') : [];
  const name = nameAvatar.length ? nameAvatar[0] : '';
  const avatar =
    nameAvatar?.length && nameAvatar.length > 1 ? nameAvatar[1] : '';
  const userLike =
    item.userIdLikes && item.userIdLikes.length
      ? item.userIdLikes.includes(currentUser?.attributes.sub)
      : false;
  const [isLikeByUser, setIsLikeByUser] = React.useState(userLike);
  const [likeNumber, setLikeNumber] = React.useState(item?.numberOfLikes || 0);
  const likeAction = () => {
    item.numberOfLikes = item?.numberOfLikes + 1;
    item.userIdLikes =
      item && item.length
        ? [...item.userIdLikes, currentUser?.attributes.sub]
        : [currentUser?.attributes.sub];
    setLikeNumber(likeNumber + 1);
    setIsLikeByUser(true);
  };
  const unLikeAction = () => {
    item.numberOfLikes =
      item.numberOfLikes > 0 ? item.numberOfLikes - 1 : item.numberOfLikes;
    item.userIdLikes = item.userIdLikes.filter(
      (likeUser) => likeUser !== currentUser?.attributes.sub,
    );
    setLikeNumber(
      item.numberOfLikes > 0 ? item.numberOfLikes - 1 : item.numberOfLikes,
    );
    setIsLikeByUser(false);
  };
  const action = () => {
    if (!isLikeByUser) {
      likeCommentHandler(item);
      likeAction();
    } else {
      unLikeCommentHandler(item);
      unLikeAction();
    }
  };

  return (
    <View style={styles.commentItem}>
      <View style={styles.itemAvatar}>
        {avatar ? (
          <Image
            style={styles.avatar}
            resizeMode={'cover'}
            source={{uri: avatar}}
          />
        ) : null}
      </View>
      <View style={styles.commentInfo}>
        <Text style={styles.commentUser}>{name}</Text>
        <Text style={styles.commentContent}>{item.content}</Text>
        <View style={styles.commentStatus}>
          <ButtonLike isLikeByUser={isLikeByUser} action={action} />
          <Text style={styles.commentLikeNum}>{likeNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
