import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import i18n from 'i18n';
import {showMessage} from 'react-native-flash-message';
import {
  followStoreService,
  unFollowStoreService,
} from '../../services/api/storeApi';
import Colors from '../Colors';
import PropTypes from 'prop-types';
const FollowTextButton = ({item}) => {
  const [followed, setFollowed] = useState(
    item?.followStatusOfUserLogin ? true : false,
  );

  const _handleClick = async () => {
    let res = null;
    try {
      if (followed) {
        res = await unFollowStoreService(item?.id);
      } else {
        res = await followStoreService(item?.id);
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
          color: Colors?.['$purple'],
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
