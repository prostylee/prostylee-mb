import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BellWithNotiBadge, Bell} from 'svg/common';
import PropTypes from 'prop-types';
const NotiIcon = ({color, size, strokeWidth}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('MainNotification', {isNotTabbar: true})
      }>
      <Bell
        width={size}
        height={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </TouchableOpacity>
  );
};
export default NotiIcon;

NotiIcon.defaultProps = {
  size: 24,
  color: '#9B9B9B',
  strokeWidth: 1.5,
};

NotiIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
};

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});
