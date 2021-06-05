import React, {useCallback, useEffect, useState} from 'react';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {storeActions} from 'redux/reducers';

import ProductSearchList from '../../../components/ProductSearchList';

import {useDispatch, useSelector} from 'react-redux';

import {
  getPersonalSalersLoadingSelector,
  getPersonalSalersSelector,
  hasPersonalSalersLoadmoreSelector,
  getPersonalSalersCurrentPageSelector,
} from 'redux/selectors/storeMain/personalSalers';

const SearchProducts = ({navigation}) => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) =>
    getPersonalSalersCurrentPageSelector(state),
  );

  const isLoading = useSelector((state) =>
    getPersonalSalersLoadingSelector(state),
  );
  const hasLoadmore = useSelector((state) =>
    hasPersonalSalersLoadmoreSelector(state),
  );

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
      storeActions.getPersonalSalers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...sortOption,
      }),
    );
  };

  const _handleFilterByTag = (queryObject) => {
    dispatch(
      storeActions.getPersonalSalers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
      }),
    );
  };

  const getDataFunctionSelector = () =>
    useSelector((state) => getPersonalSalersSelector(state));

  const _initData = () =>
    dispatch(
      storeActions.getPersonalSalers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );

  const loadMoreFunc = () =>
    dispatch(
      storeActions.getPersonalSalersLoadmore({
        page: currentPage,
        limit: LIMIT_DEFAULT,
      }),
    );

  return (
    <ProductSearchList
      title="Cá nhân đăng bán"
      hasTagList
      hasFilterBar
      getDataFunction={getDataFunctionSelector}
      refreshDataFunction={_initData}
      loadmoreDataFuntion={loadMoreFunc}
      tagFilterFunction={_handleFilterByTag}
      sortDataFunction={_handleSort}
      navigation={navigation}
      getCurrentPageFunction={() => {}}
      isLoading={isLoading}
      hasLoadmore={hasLoadmore}
    />
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProducts;
