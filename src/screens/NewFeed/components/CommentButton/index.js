import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../../VerticalFeed/styles';
import {Colors} from '../../../../components';
import React from 'react';
import RootNavigator from '../../../../navigator/rootNavigator';
import {Message} from '../../../../svg/social';

const CommentButton = ({numberOfComment}) => {
  numberOfComment = numberOfComment || 0;

  const openComment = () => {
    RootNavigator.navigate('Chat');
  };

  return (
    <>
      <TouchableOpacity onPress={openComment} style={styles.touchMes}>
        <Message />
      </TouchableOpacity>
      {numberOfComment > 0 && (
        <Text style={[{color: Colors.$icon}, styles.textLike]}>
          {numberOfComment}
        </Text>
      )}
    </>
  );
};

CommentButton.defaultProps = {};

CommentButton.propTypes = {
  numberOfComment: PropTypes.number.isRequired,
};

export default CommentButton;
