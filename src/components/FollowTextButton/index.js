import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import i18n from 'i18n';
import {showMessage} from 'react-native-flash-message';
import {
  followStoreService,
  unFollowStoreService,
} from '../../services/api/storeApi';
import {follow, unfollow} from '../../services/api/socialApi';
import Colors from '../Colors';
import PropTypes from 'prop-types';
import {TYPE_STORE} from 'constants';

const FollowTextButton = ({item, targetType = TYPE_STORE}) => {
  const [followed, setFollowed] = useState(
    item?.followStatusOfUserLogin ? true : false,
  );

  const _handleClick = () => {
    if (targetType === TYPE_STORE) {
      followStore(item?.id);
    } else {
      followUser(item.id);
    }
  };

  const followStore = async (id) => {
    let res = null;
    try {
      if (followed) {
        res = await unFollowStoreService(id);
      } else {
        res = await followStoreService(id);
      }
      setFollowed(!followed);
    } catch (err) {
      showMessage({
        message: `${res?.data?.status}: ${res?.data?.error}`,
        type: 'danger',
        position: 'top',
      });
    }
  };

  const followUser = async (id) => {
    let res = null;
    try {
      if (followed) {
        res = await follow({targetId: id, targetType: targetType});
      } else {
        res = await unfollow({targetId: id, targetType: targetType});
      }
      setFollowed(!followed);
    } catch (err) {
      showMessage({
        message: `${res?.data?.status}: ${res?.data?.error}`,
        type: 'danger',
        position: 'top',
      });
    }
  };

  return (
    <TouchableOpacity onPress={_handleClick}>
      <Text
        style={{
          color: !followed ? Colors?.['$purple'] : Colors?.['$lightGray'],
        }}>
        {!followed ? i18n.t('Search.follow') : i18n.t('Search.unfollow')}
      </Text>
    </TouchableOpacity>
  );
};
FollowTextButton.defaultProps = {
  item: {},
};

FollowTextButton.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FollowTextButton;
