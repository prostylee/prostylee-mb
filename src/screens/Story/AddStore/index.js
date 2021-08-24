import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  Image,
  ContainerWithoutScrollView,
  HeaderBack,
  SearchBox,
  Colors,
} from 'components';
import {useTheme, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as CommonIcon from 'svg/common';
import {StoreMiniLoading} from 'components/Loading/contentLoader';

import styles from './styles';
import i18n from 'i18n';
import {newFeedSelectors, newFeedActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

import {
  getPageStoreMiniSelector,
  getHasLoadMoreStoreMiniSelector,
  getLoadMoreStoreMiniLoadingSelector,
} from 'redux/selectors/newFeed';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const AddStore = (props) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [storeList, setStoreList] = React.useState([]);
  const [refreshing, handleRefreshing] = React.useState(false);
  const flatListRef = React.useRef(null);
  const navigation = useNavigation();

  const storeMini = useSelector((state) =>
    newFeedSelectors.getStoreMini(state),
  );
  const storeMiniLoading = useSelector((state) =>
    newFeedSelectors.getStoreMiniLoading(state),
  );

  const page = useSelector((state) => getPageStoreMiniSelector(state));

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreStoreMiniSelector(state),
  );

  const loadMoreLoading = useSelector((state) =>
    getLoadMoreStoreMiniLoadingSelector(state),
  );

  //dispatch
  const dispatch = useDispatch();

  const getStoreList = React.useCallback(async () => {
    await dispatch(
      newFeedActions.getStoreMini({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sort: ['name'],
        keyword: searchValue,
      }),
    );
  }, []);

  React.useEffect(() => {
    getStoreList();
  }, [getStoreList]);

  React.useEffect(() => {
    onSearchValue(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    if (storeMini && storeMini?.content && storeMini?.content?.length) {
      setStoreList(storeMini.content);
    }
  }, [storeMini]);

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        newFeedActions.getStoreMiniLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
          sort: ['name'],
          keyword: searchValue,
        }),
      );
    }
  };

  const handleRefresh = () => {
    handleRefreshing(true);
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

  //Theme
  const {colors} = useTheme();

  const onSearchValue = (search) => {
    setTimeout(() => {
      dispatch(
        newFeedActions.getStoreMini({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          sort: ['name'],
          keyword: search,
        }),
      );
    }, 1000);
  };

  const onPressItem = async (item) => {
    await dispatch(newFeedActions.addNewFeedStore(item));
    navigation.goBack();
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPressItem(item)}>
        <View style={styles.storeWrapper}>
          <Image
            source={{uri: item.logoUrl}}
            style={styles.storeLogo}
            resizeMode={'contain'}
          />
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{item.name}</Text>
            <Text style={styles.storeLocation}>
              <CommonIcon.MapPin width={12} height={12} />
              {` ${item.locationLite.city}, ${item.locationLite.country}`}
            </Text>
          </View>
          <View style={styles.storeIcon}>
            <FontAwesome name={'chevron-right'} size={10} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <View style={styles.mainWrapper}>
          <HeaderBack
            onBack={navigation.goBack}
            title={i18n.t('addStore.title')}
          />
          <View style={styles.searchBoxContainer}>
            <SearchBox
              value={searchValue}
              showIcon
              placeholder={i18n.t('addStore.search')}
              onChangeText={(text) => setSearchValue(text)}
              editable
              style={styles.searchBox}
            />
          </View>
          {storeMiniLoading ? (
            [1, 2, 3, 4, 5, 6].map((v) => (
              <View style={{padding: 16, overflow: 'hidden'}}>
                <StoreMiniLoading
                  key={v}
                  style={{padding: 16, overflow: 'hidden'}}
                />
              </View>
            ))
          ) : (
            <FlatList
              ref={flatListRef}
              data={storeList}
              renderItem={_renderItem}
              keyExtractor={(_, index) => `store_item_${index}`}
              extraData={props}
              bounces={false}
              style={styles.listContainer}
              contentContainerStyle={styles.listContent}
              onEndReached={handleLoadMore}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default AddStore;
