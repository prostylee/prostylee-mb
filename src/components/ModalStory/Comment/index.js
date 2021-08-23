import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import FooterInput from './FooterInput';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getComment, listComments} from 'graphqlLocal/queries';
import {showMessage} from 'react-native-flash-message';
import {STORY_TYPE} from 'constants';

import styles from './styles';

const Comment = (props) => {
  const {colors} = useTheme();
  const {closeCommentModal, story} = props;
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const storyId = story && story.id ? story.id : '';
  const DEFAULT_PARENT_COMMENT_ID = `${STORY_TYPE}_${storyId}`; // Rule: <targetType>_<targetId>

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
    executeGetChat();
  }, []);

  const executeGetChat = async () => {
    setLoading(true);
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
          console.log(
            'result.data.listComments.items',
            result.data.listComments.items,
          );
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
      setLoading(false);
    }
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
          <IonIcons name={'ios-close'} size={24} color={colors['$black']} />
        </TouchableOpacity>
      </View>
      <FooterInput user={currentUser} storyId={storyId} />
    </KeyboardAvoidingView>
  );
};

Comment.propTypes = {};

export default Comment;
