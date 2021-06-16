/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList, Platform} from 'react-native';

import styles from './styles';

import {Colors} from 'components';

import {
  getLeftLoadingSelector,
  getListLeftCategoriesSelector,
  getLoadLeftCategoriesMoreLoadingSelector,
  getHasLoadMoreLeftCategoriesSelector,
  getPageLeftCategoriesSelector,
  getCategoriesParentSelectSelector,
} from 'redux/selectors/categories';

import CategoriesRightItem from './item.js';
import {useDispatch, useSelector} from 'react-redux';
import {CategoriesLeftLoading} from 'components/Loading/contentLoader';
import {categoriesActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const LeftCategories = ({setBanner}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getLeftLoadingSelector(state));

  const listLeftCategoriesSelector = useSelector((state) =>
    getListLeftCategoriesSelector(state),
  );
  const categoryParentSelect = useSelector((state) =>
    getCategoriesParentSelectSelector(state),
  );

  const listLeftCategories = listLeftCategoriesSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadLeftCategoriesMoreLoadingSelector(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreLeftCategoriesSelector(state),
  );

  const page = useSelector((state) => getPageLeftCategoriesSelector(state));

  if (
    (!categoryParentSelect || !categoryParentSelect.id) &&
    listLeftCategories &&
    listLeftCategories.length
  ) {
    setBanner(
      listLeftCategories[0]?.banner ? listLeftCategories[0]?.banner : '',
    );
    dispatch(
      categoriesActions.setCategoriesParentSelect(listLeftCategories?.[0]),
    );
  }

  useEffect(() => {
    if (categoryParentSelect && categoryParentSelect.banner) {
      setBanner(categoryParentSelect.banner);
    }
  }, []);

  useEffect(() => {
    dispatch(
      categoriesActions.getListLeftCategories({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        categoriesActions.getListLeftCategoriesLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };

  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && !listLeftCategories.length === 0 ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (item, _i) => {
              return (
                <CategoriesLeftLoading
                  key={'CategoriesLeftLoading' + _i}
                  style={{marginTop: 5, width: 90, height: 90}}
                />
              );
            },
          )}
        </>
      ) : (
        <FlatList
          data={listLeftCategories}
          renderItem={({item}) => (
            <CategoriesRightItem
              item={item}
              setBanner={setBanner}
              listLeftCategories={listLeftCategories}
            />
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

LeftCategories.defaultProps = {};

LeftCategories.propTypes = {};

export default LeftCategories;
