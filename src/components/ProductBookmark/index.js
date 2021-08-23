import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {BookMarkFill, BookMark} from 'svg/common';
import {
  bookmarkProductService,
  unBookmarkProductService,
} from 'services/api/productApi';
import * as CONTANTS from 'constants';
import {showMessage} from 'react-native-flash-message';
import { commonActions } from '../../redux/reducers';
import {useDispatch} from 'react-redux';

const ProductBookmark = ({item, likeSize = 22, unlikeSize = 24}) => {
  const dispatch = useDispatch();
  const [clickLike, handleClickLike] = useState(false);
  const [like, handleLike] = useState(
    item?.bookmarkStatus ? item?.bookmarkStatus : false,
  );
  const toggleProduct = async () => {
    await dispatch(commonActions.toggleLoading(true));
    if (clickLike) {
      await dispatch(commonActions.toggleLoading(false));
      return null;
    } else {
      handleClickLike(true);
      let result = null;
      if (like) {
        result = await unBookmarkProductService(item.id);
      } else {
        result = await bookmarkProductService(item.id);
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
      await dispatch(commonActions.toggleLoading(false));
    }
  };
  return (
    <TouchableOpacity onPress={toggleProduct}>
      {!like ? (
        <BookMark width={unlikeSize} height={unlikeSize} />
      ) : (
        <BookMarkFill width={likeSize} height={likeSize} />
      )}
    </TouchableOpacity>
  );
};

ProductBookmark.defaultProps = {};

ProductBookmark.propTypes = {};

export default ProductBookmark;
