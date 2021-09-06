/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Heart, HeartFill} from 'svg/common';
import {
  likeProductService,
  unLikeProductService,
} from 'services/api/productApi';
import * as CONTANTS from 'constants';
import {showMessage} from 'react-native-flash-message';

const ProductLike = ({item, likeSize = 20, unlikeSize = 20}) => {
  const [clickLike, handleClickLike] = useState(false);
  const [like, handleLike] = useState(
    item?.likeStatusOfUserLogin ? item?.likeStatusOfUserLogin : false,
  );
  const toggleProduct = async () => {
    if (clickLike) {
      return null;
    } else {
      handleClickLike(true);
      let result = null;
      if (like) {
        result = await unLikeProductService(item.id);
      } else {
        result = await likeProductService(item.id);
      }
      if (result.ok && result.data.status === CONTANTS.SUCCESS) {
        handleLike(!like);
      } else {
        showMessage({
          message: `${result?.data?.status}: ${result?.data?.error}`,
          type: 'danger',
          position: 'top',
        });
      }
      handleClickLike(false);
    }
  };
  return (
    <TouchableOpacity onPress={toggleProduct}>
      {!like ? (
        <Heart width={unlikeSize} height={(unlikeSize * 20) / 23} />
      ) : (
        <HeartFill width={likeSize} height={(likeSize * 20) / 23} />
      )}
    </TouchableOpacity>
  );
};

ProductLike.defaultProps = {};

ProductLike.propTypes = {};

export default ProductLike;
