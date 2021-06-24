import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BellWithNotiBadge, Bell} from 'svg/common';
import PropTypes from 'prop-types';
import {notificationActions} from 'redux/reducers';
import {getListNotificationSelector} from 'redux/selectors/notification.js';
import {useDispatch, useSelector} from 'react-redux';

const NotiIcon = ({color, size, strokeWidth}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const listListNotificationSelector = useSelector(
    (state) => getListNotificationSelector(state),
    () => {},
  );
  const listListNotification = listListNotificationSelector?.content || [];
  React.useEffect(() => {
    dispatch(
      notificationActions.getListNotification({
        page: 0,
        limit: 100,
      }),
    );
  }, [dispatch]);
  let listUnreadNoti = listListNotification.filter((v) => !v.markAsRead);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('MainNotification', {isNotTabbar: true})
      }>
      {listUnreadNoti && listUnreadNoti.length ? (
        <BellWithNotiBadge
          width={size}
          height={size}
          color={color}
          strokeWidth={strokeWidth}
        />
      ) : (
        <Bell
          width={size}
          height={size}
          color={color}
          strokeWidth={strokeWidth}
        />
      )}
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
