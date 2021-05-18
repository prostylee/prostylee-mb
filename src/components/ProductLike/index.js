/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Heart, HeartFill} from 'svg/common';
import {
  likeProductService,
  unLikeProductService,
} from 'services/api/productApi';
import * as CONTANTS from 'constants';

const ProductLike = ({item}) => {
  const [clickLike, handleClickLike] = useState(false);
  const [like, handleLike] = useState(
    item?.productLike ? item?.productLike : false,
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
      }
      handleClickLike(false);
    }
  };
  return (
    <TouchableOpacity onPress={toggleProduct}>
      {!like ? <Heart /> : <HeartFill />}
    </TouchableOpacity>
  );
};

ProductLike.defaultProps = {};

ProductLike.propTypes = {};

export default ProductLike;
