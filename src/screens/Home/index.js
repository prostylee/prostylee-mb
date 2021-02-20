import React from 'react';
import {FlatList, View} from 'react-native';

import styles from './styles';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {commonActions, userActions} from 'reducers';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {TextButton, TextInputBorderBottom} from '../../components';
import {createComment, deleteComment} from '../../graphql/mutations';
import {getComment, listComments} from '../../graphql/queries';
import {onCreateComment, onDeleteComment} from '../../graphql/subscriptions';
import {formatTime} from '../../utils/datetime';
import {Divider, List, overlay, Text, useTheme} from 'react-native-paper';
import RootNavigator from '../../navigator/rootNavigator';

const DEFAULT_PARENT_COMMENT_ID = '0';

const Index = () => {
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
  }, []);

  const executeListComments = () => {
    dispatch(commonActions.toggleLoading(true));
    API.graphql(
      graphqlOperation(listComments, {
        filter: {
          parentId: {eq: DEFAULT_PARENT_COMMENT_ID},
        },
        // limit: 4,
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

  //funcs
  const onSignOut = async () => {
    await dispatch(commonActions.setInitialRouteName('LoginOptions'));
    dispatch(userActions.userLogOutSuccess());
  };

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
          targetId: '1',
          targetType: 'PRODUCT',
          content: comment,
          numberOfLikes: 0,
          createdAt: new Date().toISOString(), //"2021-02-18T15:41:16Z"
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
        right={(props) =>
          item.owner === currentUserName ? (
            <>
              <TextButton
                onPress={() => deleteCommentHandler(item)}
                label={'Delete'}
                labelStyle={styles.privacyButton}
              />
              <TextButton
                onPress={() => replyCommentHandler(item)}
                label={'Reply'}
                labelStyle={styles.privacyButton}
              />
            </>
          ) : null
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <TextInputBorderBottom
          hint={'Enter your comment here'}
          value={comment}
          onChangeText={(text) => onChangeComment(text)}
          style={{width: '100%'}}
          autoFocus={true}
        />
      </View>

      <ButtonOutlined
        onPress={addCommentHandler}
        label={'Add'}
        labelStyle={styles.privacyButton}
      />

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
            labelStyle={styles.privacyButton}
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
        }}>
        <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
        <ButtonOutlined
          label="Upload file"
          onPress={() => RootNavigator.navigate('UploadFile')}
        />
      </View>
    </View>
  );
};

export default Index;
