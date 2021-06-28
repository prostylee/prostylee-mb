import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Bell} from 'svg/common';
import PropTypes from 'prop-types';
import {notificationActions} from 'redux/reducers';
import {getCountUnreadNotiSelector} from 'redux/selectors/notification';
import {useDispatch, useSelector} from 'react-redux';

const NotiIcon = ({color, size, strokeWidth}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const count = useSelector(
    (state) => getCountUnreadNotiSelector(state),
    () => {},
  );

  React.useEffect(() => {
    dispatch(notificationActions.getCountUnreadNotification());
  }, [dispatch]);
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
      {count > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count ? count : 0}</Text>
        </View>
      ) : null}
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
    position: 'relative',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: 'red',
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
});
