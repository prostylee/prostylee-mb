import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Message} from 'svg/social';
import PropTypes from 'prop-types';
const ChatIcon = ({color, size, strokeWidth}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatList')}>
      <Message
        width={size}
        height={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </TouchableOpacity>
  );
};
export default ChatIcon;

ChatIcon.defaultProps = {
  size: 24,
  color: '#9B9B9B',
  strokeWidth: 1.5,
};

ChatIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
};

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});
