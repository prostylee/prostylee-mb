import React from 'react';
import {FlatList, View} from 'react-native';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {TextButton, TextInputBorderBottom} from '../../components';
import {createComment, deleteComment, likeComment, unlikeComment} from '../../graphql/mutations';
import {getComment, listComments} from '../../graphql/queries';
import {onCreateComment, onDeleteComment} from '../../graphql/subscriptions';
import {formatTime} from '../../utils/datetime';
import {Button, Divider, List, overlay, Text, useTheme} from 'react-native-paper';

const DEFAULT_PARENT_COMMENT_ID = 'PROD_1'; // Rule: <targetType>_<targetId>

const Comment = (props) => {
  const theme = useTheme();
  const backgroundColor = overlay(2, theme.colors.surface);
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState('');
  const [parentComment, setParentComment] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [childrenComments, setChildrenComments] = React.useState([]);
  const [currentUserName, setCurrentUserName] = React.useState('');

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        // console.log('USER ' + JSON.stringify(user));
        setCurrentUserName(user.username);
      })
      .catch((err) => console.log(err));

    executeListComments();
  }, [currentUserName]);

  const executeListComments = () => {
    dispatch(commonActions.toggleLoading(true));
    API.graphql(
      graphqlOperation(listComments, {
        filter: {
          parentId: {eq: DEFAULT_PARENT_COMMENT_ID},
        },
        targetType: {eq: 'PRODUCT'},
        // limit: 4,
        // nextToken: null,
      }),
    )
      .then((result) => {
        console.log('Comments ' + JSON.stringify(result));
        setComments(result.data.listComments.items);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(commonActions.toggleLoading(false));
  };

  const executeGetComment = (commentId) => {
    console.log('executeGetComment ' + commentId);
    dispatch(commonActions.toggleLoading(true));
    API.graphql(
      graphqlOperation(getComment, {
        id: commentId,
      }),
    )
      .then((result) => {
        console.log('Comment ' + JSON.stringify(result));
        setChildrenComments(result.data.getComment.childrens.items);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(commonActions.toggleLoading(false));
  };

  React.useEffect(() => {
    const createCommentListener = API.graphql(
      graphqlOperation(onCreateComment),
    ).subscribe({
      next: (commentData) => {
        const addedComment = commentData.value.data.onCreateComment;
        console.log('addedComment ' + JSON.stringify(addedComment));

        if (addedComment.parentId !== DEFAULT_PARENT_COMMENT_ID) {
          console.log('NEW child');
          const updatedComments = [...childrenComments];
          updatedComments.push(addedComment);
          setChildrenComments(updatedComments);
        } else {
          console.log('NEW root');
          const updatedComments = [...comments];
          updatedComments.push(addedComment);
          setComments(updatedComments);
        }
      },
    });

    const deleteCommentListener = API.graphql(
      graphqlOperation(onDeleteComment),
    ).subscribe({
      next: (commentData) => {
        const deletedComment = commentData.value.data.onDeleteComment;
        console.log('deletedComment ' + JSON.stringify(deletedComment));

        if (deletedComment.parentId !== DEFAULT_PARENT_COMMENT_ID) {
          const updatedComments = childrenComments.filter(
            (cmt) => cmt.id !== deletedComment.id,
          );
          setChildrenComments(updatedComments);
        } else {
          const updatedComments = comments.filter(
            (cmt) => cmt.id !== deletedComment.id,
          );
          setComments(updatedComments);
        }
      },
    });

    dispatch(commonActions.toggleLoading(false));

    return () => {
      if (createCommentListener) {
        createCommentListener.unsubscribe();
      }
      if (deleteCommentListener) {
        deleteCommentListener.unsubscribe();
      }
    };
  }, [comments, childrenComments, dispatch]);

  const onChangeComment = (text) => {
    setComment(text);
  };

  const addCommentHandler = async () => {
    console.log('addCommentHandler ' + comment);
    if (!comment) {
      return;
    }

    const user = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(createComment, {
        input: {
          parentId: parentComment
            ? parentComment.id
            : DEFAULT_PARENT_COMMENT_ID,
          ownerId: user.attributes.sub,
          owner: user.username,
          ownerFullname: 'Giang Phan',
          targetId: '1',
          targetType: 'PRODUCT',
          content: comment,
          numberOfLikes: 0,
          createdAt: new Date().toISOString(), // "2021-02-18T15:41:16Z"
        },
      }),
    );
    console.log(
      'Submit comment successfully with response' + JSON.stringify(response),
    );
    setComment('');
  };

  const replyCommentHandler = (item) => {
    console.log('replyCommentHandler ' + JSON.stringify(item));
    setParentComment(item);
    executeGetComment(item.id);
  };

  const deleteCommentHandler = async (item) => {
    console.log('deleteCommentHandler ' + item.id);
    dispatch(commonActions.toggleLoading(true));
    const res = await API.graphql(
      graphqlOperation(deleteComment, {input: {id: item.id}}),
    );
    dispatch(commonActions.toggleLoading(false));
    console.log('Delete successfully with response ' + JSON.stringify(res));
  };

  const likeCommentHandler = async (item) => {
    console.log('likeCommentHandler ' + item.id);
    dispatch(commonActions.toggleLoading(true));
    const user = await Auth.currentAuthenticatedUser();
    const res = await API.graphql(
      graphqlOperation(likeComment, {
        id: item.id,
        userId: user.attributes.sub,
      }),
    );
    dispatch(commonActions.toggleLoading(false));
    console.log('Like successfully with response ' + JSON.stringify(res));
  };

  const unlikeCommentHandler = async (item) => {
    console.log('unlikeCommentHandler ' + item.id);
    dispatch(commonActions.toggleLoading(true));
    const user = await Auth.currentAuthenticatedUser();
    const res = await API.graphql(
      graphqlOperation(unlikeComment, {
        id: item.id,
        userId: user.attributes.sub,
      }),
    );
    dispatch(commonActions.toggleLoading(false));
    console.log('Unlike successfully with response ' + JSON.stringify(res));
  };

  const _renderItem = ({item, index}) => {
    return (
      <List.Item
        title={formatTime(item.createdAt)}
        description={item.content + '-' + item.owner}
        left={(props) => (
          <List.Icon
            {...props}
            icon={
              item.owner === currentUserName ? 'chevron-left' : 'chevron-right'
            }
            color={item.owner === currentUserName ? '#205da0' : '#01ab01'}
          />
        )}
        right={(props) => (
          <>
            {item.owner === currentUserName && (
              <Button
                icon="delete"
                onPress={() => deleteCommentHandler(item)}
              />
            )}
            <Button icon="reply" onPress={() => replyCommentHandler(item)} />
            <Button icon="heart" onPress={() => likeCommentHandler(item)} />
          </>
        )}
      />
    );
  };

  return (
    <React.Fragment>
      <View style={{padding: 20}}>
        <TextInputBorderBottom
          hint={'Enter your comment here'}
          value={comment}
          onChangeText={(text) => onChangeComment(text)}
          style={{width: '100%'}}
          autoFocus={true}
        />
      </View>

      <ButtonOutlined onPress={addCommentHandler} label={'Add'} />

      <View style={{height: '70%', width: '100%', padding: 20}}>
        <View style={{flex: 1}}>
          {comments && comments.length > 0 && (
            <FlatList
              contentContainerStyle={[
                {backgroundColor: theme.colors.background},
                {backgroundColor},
              ]}
              ItemSeparatorComponent={() => <Divider />}
              data={comments}
              renderItem={_renderItem}
              keyExtractor={(item, index) => `${item.id}`}
            />
          )}
        </View>

        <View style={{flex: 1}}>
          <View style={{paddingBottom: 20}} />
          <TextButton
            onPress={() => {
              setParentComment(null);
              setChildrenComments([]);
            }}
            label={'Back to parent'}
          />

          <Text>
            {parentComment ? 'Parent: ' + parentComment.content : 'No parent'}
          </Text>
          {childrenComments && childrenComments.length > 0 && (
            <FlatList
              contentContainerStyle={[
                {backgroundColor: theme.colors.background},
                {backgroundColor},
              ]}
              ItemSeparatorComponent={() => <Divider />}
              data={childrenComments}
              renderItem={_renderItem}
              keyExtractor={(item, index) => `${item.id}`}
            />
          )}
        </View>
      </View>
    </React.Fragment>
  );
};

export default Comment;
