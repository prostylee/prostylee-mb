import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import ProductSearchList from '../../../components/ProductSearchList';

import {
  getBestSellersLoadingSelector,
  getBestSellersSelector,
  getCurrentBestSellersPageSelector,
  hasBestSellersLoadmoreSelector,
} from 'redux/selectors/storeMain/bestSellers';

import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const BestSellers = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) =>
    getBestSellersLoadingSelector(state),
  );
  const hasLoadmore = useSelector((state) =>
    hasBestSellersLoadmoreSelector(state),
  );
  const currentPage = useSelector((state) =>
    getCurrentBestSellersPageSelector(state),
  );

  const getDataFunctionSelector = () =>
    useSelector((state) => getBestSellersSelector(state));

  const _handleSort = (value) => {
    let sortOption = {};
    switch (value) {
      case 1: {
        sortOption.sorts = 'name';
        break;
      }
      case 2: {
        sortOption.bestSeller = true;
        break;
      }
      case 3: {
        sortOption.sorts = '-createdAt';
        break;
      }
      case 4: {
        sortOption.sorts = '-priceSale';
        break;
      }
      case 5: {
        sortOption.sorts = 'priceSale';
        break;
      }
      default: {
        sortOption.bestRating = true;
        break;
      }
    }
    dispatch(
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...sortOption,
      }),
    );
  };

  const _handleFilterByTag = (queryObject) => {
    dispatch(
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
      }),
    );
  };

  const _initData = () =>
    dispatch(
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  const loadMoreFunc = () =>
    dispatch(
      storeActions.getBestSellersLoadmore({
        page: currentPage,
        limit: LIMIT_DEFAULT,
      }),
    );
  useEffect(() => {
    dispatch(
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, []);

  return (
    <ProductSearchList
      title="Tất cả sản phẩm"
      hasTagList
      hasFilterBar
      getDataFunction={getDataFunctionSelector}
      refreshDataFunction={_initData}
      loadmoreDataFuntion={loadMoreFunc}
      tagFilterFunction={_handleFilterByTag}
      sortDataFunction={_handleSort}
      navigation={navigation}
      isLoading={isLoading}
      hasLoadmore={hasLoadmore}
    />
  );
};

BestSellers.defaultProps = {};

BestSellers.propTypes = {};

export default BestSellers;
