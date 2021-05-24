/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';

import {
  getRightLoadingSelector,
  getListRightCategoriesSelector,
  getLoadRightCategoriesMoreLoadingSelector,
  getHasLoadMoreRightCategoriesSelector,
  getPageRightCategoriesSelector,
  getCategoriesParentSelectSelector,
} from 'redux/selectors/categories';

import CategoriesRightItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {CategoriesRightLoading} from 'components/Loading/contentLoader';
import {categoriesActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const RightCategories = ({navigation}) => {
  const dispatch = useDispatch();
  const categoryParentSelect = useSelector((state) =>
    getCategoriesParentSelectSelector(state),
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
  }, [categoryParentSelect, dispatch, refreshing]);

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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((item, _i) => {
              return (
                <View key={'CategoriesRightLoading' + _i} style={styles.item}>
                  <CategoriesRightLoading />
                </View>
              );
            })}
          </View>
        </>
      ) : (
        <FlatList
          data={listRightCategories}
          renderItem={({item}) => (
            <CategoriesRightItem navigation={navigation} item={item} />
          )}
          numColumns={3}
          keyExtractor={(item, index) => index}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={() => handleLoadMore()}
          ListFooterComponent={renderFooter}
          style={{borderRadius: 8}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

RightCategories.defaultProps = {};

RightCategories.propTypes = {};

export default RightCategories;
