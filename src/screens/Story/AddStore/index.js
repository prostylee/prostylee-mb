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
} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as CommonIcon from 'svg/common';
import debounce from 'lodash/debounce';

import styles from './styles';
import i18n from 'i18n';
import {commonActions, newFeedSelectors, newFeedActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

const AddStore = (props) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [storeList, setStoreList] = React.useState([]);
  const [storeFilterData, setStoreFilterData] = React.useState([]);
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const flatListRef = React.useRef(null);
  const navigation = useNavigation();

  const storeMini = useSelector((state) =>
    newFeedSelectors.getStoreMini(state),
  );
  const storeMiniLoading = useSelector((state) =>
    newFeedSelectors.getStoreMiniLoading(state),
  );

  //dispatch
  const dispatch = useDispatch();

  const getStoreList = React.useCallback(async () => {
    await dispatch(newFeedActions.getStoreMini());
  }, []);

  React.useEffect(() => {
    getStoreList();
  }, [getStoreList]);

  React.useEffect(() => {
    if (storeMini && storeMini?.content && storeMini?.content?.length) {
      setStoreList(storeMini.content);
    }
  }, [storeMini]);

  //Theme
  const {colors} = useTheme();
  const setSearchDebounce = debounce(
    () => {
      const filterList = storeList.filter((item) =>
        item.name.includes(searchValue),
      );
      setStoreFilterData(filterList);
    },
    1000,
    {maxWait: 2000, trailing: true, leading: false},
  );
  React.useEffect(() => {
    setSearchDebounce();
  }, [setSearchDebounce]);
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
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" color={colors['$purple']} />
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={storeFilterData}
              renderItem={_renderItem}
              keyExtractor={(_, index) => `store_item_${index}`}
              extraData={props}
              bounces={false}
              style={styles.listContainer}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default AddStore;
