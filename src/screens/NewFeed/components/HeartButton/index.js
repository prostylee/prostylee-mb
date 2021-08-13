import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import {HeartSolid} from '../../../../svg/common';
import {Colors} from '../../../../components';
import {SUCCESS} from 'constants';

import {like, unlike} from 'services/api/socialApi';
import PropTypes from 'prop-types';
import {Heart} from '../../../../svg/social';

const HeartButton = ({
  numberOfLike,
  targetId,
  targetType,
  categoryId,
  storeId,
  likeStatus = false,
}) => {
  const [liked, setLiked] = useState(likeStatus);
  const [numOfLike, setNumOfLike] = useState(numberOfLike || 0);

  const onLikePress = async () => {
    if (!liked) {
      const res = await like({
        targetId: targetId,
        customFieldId1: categoryId,
        customFieldId2: storeId,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setLiked(true);
        setNumOfLike(numOfLike + 1);
      }
    } else {
      const res = await unlike({
        targetId: targetId,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setLiked(false);
        setNumOfLike(numOfLike - 1);
      }
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onLikePress} style={styles.heartButtonWrapper}>
        {liked ? (
          <HeartSolid color={Colors.$purple} />
        ) : (
          <Heart color={Colors.$icon} />
        )}
      </TouchableOpacity>
      {numOfLike > 0 && (
        <Text style={[{color: Colors.$icon}, styles.heartCounterLabel]}>
          {numOfLike}
        </Text>
      )}
    </>
  );
};

HeartButton.defaultProps = {
  categoryId: null,
  storeId: null,
};

HeartButton.propTypes = {
  numberOfLike: PropTypes.number.isRequired,
  targetId: PropTypes.number.isRequired,
  targetType: PropTypes.string.isRequired,
  categoryId: PropTypes.number,
  storeId: PropTypes.number,
};

export default HeartButton;
