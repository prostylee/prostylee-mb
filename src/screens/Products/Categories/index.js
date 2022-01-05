/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';

import {
  getRightLoadingSelector,
  getListRightCategoriesSelector,
  getLoadRightCategoriesMoreLoadingSelector,
  getHasLoadMoreRightCategoriesSelector,
  getPageRightCategoriesSelector,
  getCategoriesParentSelectSelector,
  getCategoriesSelectSelector,
} from 'redux/selectors/categories';

import CategoriesRightItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {CategoriesRightLoading} from 'components/Loading/contentLoader';
import {categoriesActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const Categories = ({navigation}) => {
  const dispatch = useDispatch();
  const categoryRef = useRef();
  const categoryParentSelect = useSelector((state) =>
    getCategoriesParentSelectSelector(state),
  );
  const categoriesSelect = useSelector((state) =>
    getCategoriesSelectSelector(state),
  );

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getRightLoadingSelector(state));

  const listRightCategoriesSelector = useSelector((state) =>
    getListRightCategoriesSelector(state),
  );

  const listRightCategories = listRightCategoriesSelector?.content || [];
  const loadMoreLoading = useSelector((state) =>
    getLoadRightCategoriesMoreLoadingSelector(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreRightCategoriesSelector(state),
  );

  const page = useSelector((state) => getPageRightCategoriesSelector(state));

  useEffect(() => {
    dispatch(
      categoriesActions.getListRightCategories({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        parentId: categoryParentSelect?.id,
      }),
    );
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  useEffect(() => {
    if (categoryRef && categoryRef.current) {
      const activeIndex = listRightCategories?.findIndex(
        (item) => item.id === categoriesSelect?.id,
      );
      if (activeIndex >= 0) {
        categoryRef.current?.scrollToIndex({
          index: activeIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }, [categoriesSelect?.id, categoryRef]);

  useEffect(() => {
    if (categoryRef && categoryRef.current) {
      setTimeout(() => {
        const activeIndex = listRightCategories?.findIndex(
          (item) => item.id === categoriesSelect?.id,
        );
        if (activeIndex >= 0) {
          categoryRef.current?.scrollToIndex({
            index: activeIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }
      }, 500);
    }
  }, []);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        categoriesActions.getListRightCategoriesLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
          parentId: categoryParentSelect?.id,
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
      {(loading || !categoryParentSelect) &&
      !listRightCategories.length === 0 ? (
        <>
          <ScrollView>
            <View style={styles.loadingContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, _i) => {
                return (
                  <View key={'CategoriesRightLoading' + _i} style={styles.item}>
                    <CategoriesRightLoading />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </>
      ) : (
        <FlatList
          horizontal
          ref={categoryRef}
          data={listRightCategories}
          renderItem={({item}) => (
            <CategoriesRightItem
              navigation={navigation}
              item={item}
              isActive={item?.id === categoriesSelect?.id}
            />
          )}
          getItemLayout={(_, index) => ({
            length: 90,
            offset: 90 * index,
            index,
          })}
          keyExtractor={(item, index) => index}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={() => handleLoadMore()}
          ListFooterComponent={renderFooter}
          style={styles.wrapList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
        />
      )}
    </View>
  );
};

Categories.defaultProps = {};

Categories.propTypes = {};

export default Categories;
