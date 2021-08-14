/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {ScrollView, View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';

import BrandItem from './item.js';

import {useDispatch, useSelector} from 'react-redux';
import {CategoriesRightLoading} from 'components/Loading/contentLoader';

import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import {
  getBrandListLoadingSelector,
  getBrandListLoadmoreLoadingSelector,
  getBrandListCurrentPageSelector,
  getBrandListHasLoadmoreSelector,
} from 'redux/selectors/storeMain';
import {getBrandListSelector} from 'redux/selectors/storeMain';
import {getSelectedBrandSelector} from 'redux/selectors/brand';
import {storeActions} from 'redux/reducers';

const BrandList = ({navigation}) => {
  const dispatch = useDispatch();

  const selectedBrand = useSelector((state) => getSelectedBrandSelector(state));

  const brandListSelector = useSelector((state) => getBrandListSelector(state));
  const brandList = brandListSelector?.content || [];

  const [refreshing, handleRefreshing] = useState(false);

  const hasLoadmore = useSelector((state) =>
    getBrandListHasLoadmoreSelector(state),
  );
  const currentPage = useSelector((state) =>
    getBrandListCurrentPageSelector(state),
  );
  const loading = useSelector((state) => getBrandListLoadingSelector(state));
  const loadmoreLoading = useSelector((state) =>
    getBrandListLoadmoreLoadingSelector(state),
  );

  useEffect(() => {
    dispatch(
      storeActions.getBrandList({
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
    if (hasLoadmore) {
      dispatch(
        storeActions.getBrandListLoadmore({
          page: currentPage,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };

  const renderFooter = () => {
    if (!loadmoreLoading) {
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
      {(loading || !brandList) && !brandList.length === 0 ? (
        <>
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, _i) => {
                return (
                  <View key={'brand_loading' + _i} style={styles.item}>
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
          data={brandList}
          renderItem={({item}) => (
            <BrandItem
              navigation={navigation}
              item={item}
              isActive={item?.id === selectedBrand?.id}
            />
          )}
          keyExtractor={(item, index) => index}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          style={{borderRadius: 8}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
        />
      )}
    </View>
  );
};

BrandList.defaultProps = {};

BrandList.propTypes = {};

export default BrandList;
