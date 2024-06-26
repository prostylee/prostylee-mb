import React, {useCallback, useEffect, useState} from 'react';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {storeActions} from 'redux/reducers';

import ProductSearchList from 'components/ProductSearchList';

import {useDispatch, useSelector} from 'react-redux';

import i18n from 'i18n';

import {
  getPersonalSalersLoadingSelector,
  getPersonalSalersSelector,
  hasPersonalSalersLoadmoreSelector,
  getPersonalSalersCurrentPageSelector,
  getPersonalSalersFilterStateSelector,
} from 'redux/selectors/storeMain/personalSalers';
import {userTokenSelector} from 'redux/selectors/user';

const PersonalSaler = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => userTokenSelector(state));

  const userId = token?.signInUserSession?.idToken?.payload?.['custom:userId'];

  const currentPage = useSelector((state) =>
    getPersonalSalersCurrentPageSelector(state),
  );

  const isLoading = useSelector((state) =>
    getPersonalSalersLoadingSelector(state),
  );
  const hasLoadmore = useSelector((state) =>
    hasPersonalSalersLoadmoreSelector(state),
  );

  const _handleSort = (value, filterValue = {}) => {
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
        ...filterValue,
        // userId: userId,
      }),
    );
  };

  const _handleFilterByTag = (queryObject) => {
    dispatch(storeActions.clearPersonalSalersFilterState());
    dispatch(
      storeActions.getPersonalSalers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
        // userId: userId,
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
        // userId: userId,
      }),
    );

  const loadMoreFunc = (params1, params2) => {
    dispatch(
      storeActions.getPersonalSalersLoadmore({
        page: currentPage,
        limit: LIMIT_DEFAULT,
        ...params1,
        ...params2,
        // userId: userId,
      }),
    );
  };

  return (
    <ProductSearchList
      title={i18n.t('stores.personalSaler')}
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
      getFilterStateSelectorFunction={getPersonalSalersFilterStateSelector}
    />
  );
};

PersonalSaler.defaultProps = {};

PersonalSaler.propTypes = {};

export default PersonalSaler;
