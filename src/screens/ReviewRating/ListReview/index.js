/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

/*Hooks*/
import I18n from 'i18n';

import {
  Animated,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';

import {Colors, ThemeView} from 'components';
import BottomHeaderAnimated from '../BottomHeaderAnimated';
import ReviewItem from '../ReviewItem';
import {CartEmpty} from 'svg/common';

import {
  getListReviewRatingSelector,
  getListReviewRatingLoadingSelector,
  getLoadReviewRatingMoreLoadingSelector,
  getHasLoadMoreReviewRatingSelector,
} from 'redux/selectors/reviewRating';

import {reviewRatingActions} from 'redux/reducers';

import {LIMIT_DEFAULT, PAGE_DEFAULT, SORT_DEFAULT} from 'constants';

import {ReviewRatingLoading} from 'components/Loading/contentLoader';

const WIDTH = Dimensions.get('window').width;

const ListReview = ({navigation, productId}) => {
  const dispatch = useDispatch();

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const [refreshing, handleRefreshing] = useState(false);
  const [sortValue, setSortValue] = useState(SORT_DEFAULT);
  const [filterValue, setFilterValue] = useState();

  const loadMoreLoading = useSelector((state) =>
    getLoadReviewRatingMoreLoadingSelector(state),
  );

  const loading = useSelector((state) =>
    getListReviewRatingLoadingSelector(state),
  );

  const listReviewRatingSelector = useSelector((state) =>
    getListReviewRatingSelector(state),
  );

  const listReviewRating = listReviewRatingSelector?.content || [];

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreReviewRatingSelector(state),
  );

  useEffect(() => {
    dispatch(
      reviewRatingActions.getListReviewRating({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        targetId: productId,
        targetType: 'PRODUCT',
        sorts:
          sortValue === 'newest'
            ? 'createdAt'
            : sortValue === 'oldest'
            ? '-createdAt'
            : SORT_DEFAULT,
        value: filterValue,
      }),
    );
    handleRefreshing(false);
  }, [productId, dispatch, refreshing, sortValue, filterValue]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        reviewRatingActions.getListReviewRatingLoadMore({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          targetId: productId,
          targetType: 'PRODUCT',
          sorts:
            sortValue === 'newest'
              ? 'createdAt'
              : sortValue === 'oldest'
              ? '-createdAt'
              : SORT_DEFAULT,
          value: filterValue,
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
    <ThemeView style={styles.container} isFullView>
      <BottomHeaderAnimated
        sortValue={sortValue}
        filterValue={filterValue}
        setSortValue={setSortValue}
        setFilterValue={setFilterValue}
      />
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({item}) => {
            return (
              <View style={styles.wrapReviewRating}>
                <ReviewRatingLoading width={WIDTH} />
              </View>
            );
          }}
          numColumns={1}
          keyExtractor={(item, index) => index}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : listReviewRating.length ? (
        <FlatList
          data={listReviewRating}
          renderItem={({item}) => (
            <ReviewItem navigation={navigation} item={item} />
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={() => handleLoadMore()}
          ListFooterComponent={renderFooter}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollEvent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.icon}>
            <CartEmpty />
          </View>
          <View style={styles.viewtitle}>
            <Text style={styles.title}>
              {I18n.t('rateProduct.ratingNotFoundTitle')}
            </Text>
          </View>
          <View style={styles.viewSubTitle}>
            <Text style={styles.subTitle}>
              {I18n.t('rateProduct.ratingNotFoundContent')}
            </Text>
          </View>
        </View>
      )}
    </ThemeView>
  );
};

ListReview.defaultProps = {};

ListReview.propTypes = {};

export default ListReview;
