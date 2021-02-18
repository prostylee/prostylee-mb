import React from 'react';
import {FlatList, View} from 'react-native';

import styles from './styles';

import {ButtonOutlined} from 'components';

import {useDispatch} from 'react-redux';
import {commonActions, userActions} from 'reducers';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {TextButton, TextInputBorderBottom} from '../../components';
import {createComment, deleteComment} from '../../graphql/mutations';
import {listComments} from '../../graphql/queries';
import {onCreateComment, onDeleteComment} from '../../graphql/subscriptions';
import {formatTime} from '../../utils/datetime';
import {Divider, List, overlay, useTheme} from 'react-native-paper';

const Index = () => {
  const theme = useTheme();
  const backgroundColor = overlay(2, theme.colors.surface);
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState('');

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        // console.log('USER ' + JSON.stringify(user));
        setCurrentUserId(user.attributes.sub);
      })
      .catch((err) => console.log(err));

    getComments();
  }, []);

  const getComments = () => {
    API.graphql(graphqlOperation(listComments))
      .then((result) => {
        console.log('Comments ' + JSON.stringify(result));
        setComments(result.data.listComments.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const createCommentListener = API.graphql(
      graphqlOperation(onCreateComment),
    ).subscribe({
      next: (commentData) => {
        const addedComment = commentData.value.data.onCreateComment;
        console.log('addedComment ' + JSON.stringify(addedComment));

        const updatedComments = [...comments];
        updatedComments.push(addedComment);
        setComments(updatedComments);
      },
    });

    const deleteCommentListener = API.graphql(
      graphqlOperation(onDeleteComment),
    ).subscribe({
      next: (commentData) => {
        const deletedComment = commentData.value.data.onDeleteComment;
        console.log('deletedComment ' + JSON.stringify(deletedComment));
        const updatedComments = comments.filter(
          (cmt) => cmt.id !== deletedComment.id,
        );
        setComments(updatedComments);
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
  }, [comments, dispatch]);

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
    const resposne = await API.graphql(
      graphqlOperation(createComment, {
        input: {
          commentOwnerId: user.attributes.sub,
          commentOwnerUsername: user.username,
          targetId: '1',
          targetType: 'PRODUCT',
          content: comment,
          createdAt: new Date().toISOString(), //"2021-02-18T15:41:16Z"
        },
      }),
    );
    console.log(
      'Submit comment successfully with response' + JSON.stringify(resposne),
    );
    setComment('');
  };

  const deleteCommentHandler = async (comment) => {
    console.log('deleteCommentHandler ' + comment.id);
    const res = await API.graphql(
      graphqlOperation(deleteComment, {input: {id: comment.id}}),
    );
    console.log('Delete successfully with response ' + JSON.stringify(res));
  };

  const _renderItem = ({item, index}) => {
    return (
      <List.Item
        title={formatTime(item.createdAt)}
        description={item.content}
        left={(props) => (
          <List.Icon
            {...props}
            icon={
              item.commentOwnerId === currentUserId
                ? 'chevron-left'
                : 'chevron-right'
            }
            color={
              item.commentOwnerId === currentUserId ? '#205da0' : '#565454'
            }
          />
        )}
        right={(props) => (
          <TextButton
            onPress={() => deleteCommentHandler(item)}
            label={'Delete'}
            labelStyle={styles.privacyButton}
          />
        )}
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

      <View style={{height: '50%', width: '100%', padding: 20}}>
        <FlatList
          contentContainerStyle={[ {backgroundColor: theme.colors.background}, {backgroundColor} ]}
          ItemSeparatorComponent={() => <Divider />}
          data={comments}
          renderItem={_renderItem}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>

      <ButtonOutlined label="Đăng Xuất Ngay" onPress={() => onSignOut()} />
    </View>
  );
};

export default Index;
