import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';
import styles from './styles';
import {Chip, Text} from 'react-native-paper';
import {Trending} from 'svg/common';
const WIDTH = Dimensions.get('window').width;

import {
  getTopSearchLoadingSelector,
  getTopSearchSelector,
  getLoadTopSearchMoreLoading,
  getHasLoadMoreTopSearchSelector,
  getPageTopSearchSelector,
} from 'redux/selectors/search/topSearch';

import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {searchActions} from 'redux/reducers';

const Search = ({navigation}) => {
  const dispatch = useDispatch();

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getTopSearchLoadingSelector(state));
  const listTopSearchSelector = useSelector((state) =>
    getTopSearchSelector(state),
  );
  const listTopSearch = listTopSearchSelector?.content || [];
  const loadMoreLoading = useSelector((state) =>
    getLoadTopSearchMoreLoading(state),
  );
  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreTopSearchSelector(state),
  );
  const page = useSelector((state) => getPageTopSearchSelector(state));

  useEffect(() => {
    dispatch(searchActions.getTopSearch());
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(searchActions.getTopSearch());
    }
  };
  console.log('listTopSearch');
  console.log(listTopSearch);
  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>{i18n.t('Search.topSearch')}</Text>
      </View>
      <View style={styles.wrapChip}>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Thời trang nam
        </Chip>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Phụ kiện da
        </Chip>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Sale
        </Chip>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Giày da
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Best-seller
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Hoodie
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Quần tây
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Dép
        </Chip>
      </View>
    </>
  );
};

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
