import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Message} from 'svg/social';
import PropTypes from 'prop-types';
const ChatIcon = ({color, size}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatList')}>
      <Message width={size} height={size} color={color} />
    </TouchableOpacity>
  );
};
export default ChatIcon;

ChatIcon.defaultProps = {
  size: 24,
  color: '#9B9B9B',
};

ChatIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});
