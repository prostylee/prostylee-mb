import React, {useEffect, useState} from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';
import i18n from 'i18n';
import styles from './styles';
import {Chip, Text} from 'react-native-paper';
import {
  getTopSearchLoadingSelector,
  getTopSearchSelector,
} from 'redux/selectors/search/topSearch';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {TopSearchLoading} from 'components/Loading/contentLoader';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const TopSearch = ({navigation}) => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getTopSearchLoadingSelector(state));
  const listTopSearchSelector = useSelector((state) =>
    getTopSearchSelector(state),
  );
  const listTopSearch = listTopSearchSelector || [];

  useEffect(() => {
    dispatch(searchActions.getTopSearch());
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const _handleTagPress = (item) => {
    dispatch(searchActions.setCurrentKeyword(item));
    dispatch(
      searchActions.getProductsSearch({
        keyword: item,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
      }),
    );
    dispatch(
      searchActions.getStoreSearch({
        keyword: item,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        numberOfProducts: 10,
      }),
    );
    dispatch(
      searchActions.getHintProductSearch({
        keyword: item,
        type: 'product',
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    navigation.navigate('SearchProducts');
  };

  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>{i18n.t('Search.topSearch')}</Text>
      </View>
      {loading && !listTopSearch?.length === 0 ? (
        <>
          <View style={styles.wrapChip}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, _i) => {
              return (
                <TopSearchLoading
                  style={{height: 32, marginTop: 8, marginRight: 8}}
                />
              );
            })}
          </View>
        </>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          style={styles.wrapScroll}>
          <View style={styles.wrapChip}>
            {listTopSearch && listTopSearch.length
              ? listTopSearch.map((item) => (
                  <Chip
                    small
                    onPress={() => {
                      _handleTagPress(item);
                    }}
                    style={styles.itemChips}>
                    {item}
                  </Chip>
                ))
              : null}
          </View>
        </ScrollView>
      )}
    </>
  );
};

TopSearch.defaultProps = {};

TopSearch.propTypes = {};

export default TopSearch;
