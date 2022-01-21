import React from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import {IconButton} from 'react-native-paper';

import FooterInput from '../FooterInput';
import CommentItem from './CommentItem';
import {ChevronLeft} from 'svg/common';

import {useDispatch, useSelector} from 'react-redux';
import {commonActions, commonSelectors} from 'reducers';
import {API, graphqlOperation} from 'aws-amplify';
import {listComments} from 'graphqlLocal/queries';
import {onCreateComment} from 'graphqlLocal/subscriptions';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';

const IC_BACK = require('assets/icons/arrowLeft.png');

const Comment = (props) => {
  const {item, currentUser, goBack, commentTargetType} = props;
  const dispatch = useDispatch();

  const [listComment, setListComment] = React.useState([]);
  const isForeGround = useSelector((state) =>
    commonSelectors.isForeGroundSelector(state),
  );

  const commentId = item && item.id ? item.id : '';
  const COMMENT_PARENT = `${commentTargetType}_${commentId}`; // Rule: <targetType>_<targetId>

  let createCommentListener;
  React.useEffect(() => {
    if (isForeGround) {
      executeGetComment();
    }
  }, [item?.id, isForeGround]);

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
          if (addedComment.parentId === COMMENT_PARENT) {
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
            parentId: {eq: COMMENT_PARENT},
          },
          targetType: {eq: commentTargetType},
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

  const EmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{i18n.t('storyBoard.noReply')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.parentCommentContainer}>
        <IconButton
          style={styles.backButton}
          icon={({size, color}) => <ChevronLeft />}
          onPress={goBack}
        />
        <CommentItem item={item} currentUser={currentUser} isParent={true} />
      </View>
      <FlatList
        style={styles.list}
        renderItem={({item}) => (
          <CommentItem item={item} currentUser={currentUser} />
        )}
        data={listComment}
        ListEmptyComponent={<EmptyList />}
      />
      <FooterInput
        user={currentUser}
        feedId={commentId}
        commentTargetType={commentTargetType}
      />
    </View>
  );
};

Comment.propTypes = {};

export default Comment;
