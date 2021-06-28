import React, {useState} from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import TextButton from '../TextButton';
import {SUCCESS} from 'constants';
import {follow, unfollow} from 'services/api/socialApi';

const FollowButton = ({targetId, targetType}) => {
  const [followed, setFollowed] = useState(false);

  const onFollowPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(false);
      }
    }
  };

  return (
    <TextButton
      onClick={onFollowPress}
      highlight={!followed}
      label={
        !followed ? i18n.t('common.textFollow') : i18n.t('common.textFollowed')
      }
    />
  );
};

FollowButton.defaultProps = {
  highlight: true,
};

FollowButton.propTypes = {
  targetId: PropTypes.number.isRequired,
  targetType: PropTypes.string.isRequired,
};

export default FollowButton;
