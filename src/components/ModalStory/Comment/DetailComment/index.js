import React from 'react';
import {View, Image, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import {IconButton} from 'react-native-paper';

import FooterInput from '../FooterInput';
import CommentItem from './CommentItem';

import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {API, graphqlOperation} from 'aws-amplify';
import {listComments} from 'graphqlLocal/queries';
import {onCreateComment} from 'graphqlLocal/subscriptions';
import {showMessage} from 'react-native-flash-message';
import {STORY_TYPE} from 'constants';

import styles from './styles';

const IC_BACK = require('assets/icons/arrowLeft.png');

const Comment = (props) => {
  const {item, currentUser, goBack} = props;
  const dispatch = useDispatch();

  const [listComment, setListComment] = React.useState([]);

  const commentId = item && item.id ? item.id : '';
  const COMMENT_PARENT = `${STORY_TYPE}_${commentId}`; // Rule: <targetType>_<targetId>

  React.useEffect(() => {
    executeGetComment();
  }, [item?.id]);

  React.useEffect(() => {
    const createCommentListener = API.graphql(
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
            parentId: {eq: COMMENT_PARENT},
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

  return (
    <View style={styles.container}>
      <IconButton
        icon={({size, color}) => (
          <Image
            source={IC_BACK}
            style={{width: size, height: size, tintColor: color}}
          />
        )}
        onPress={goBack}
      />
      <CommentItem item={item} currentUser={currentUser} />
      <FlatList
        style={styles.list}
        renderItem={({item}) => (
          <CommentItem item={item} currentUser={currentUser} />
        )}
        data={listComment}
      />
      <FooterInput user={currentUser} storyId={commentId} />
    </View>
  );
};

Comment.propTypes = {};

export default Comment;
