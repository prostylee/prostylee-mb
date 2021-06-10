import React, {useEffect, useState} from 'react';

import {View, TouchableOpacity, Dimensions} from 'react-native';
import {Header, ButtonRounded, ThemeView} from 'components';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import i18n from 'i18n';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

import styles from './styles';
import ListBrand from './ListBrands';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  getBrandListSelector,
  getStoreMainLoadingSelector,
} from 'redux/selectors/storeMain';
import {getPostProductInfoSelector} from 'redux/selectors/postProduct';
import {storeActions} from 'redux/reducers';
import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import {postProductActions} from 'redux/reducers';
const Brands = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => getStoreMainLoadingSelector(state));
  const brandListSelector = useSelector(
    (state) => getBrandListSelector(state),
    shallowEqual,
  );

  const postProductState = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );
  const {brand} = postProductState;
  const [brandList, setBrandList] = React.useState(
    brandListSelector?.content || [],
  );

  const {colors} = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedBrand, setSelectedBrand] = React.useState(brand || null);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    let filterList = [...brandListSelector?.content];
    filterList = filterList.filter(
      (v) => `${v.name}`.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
    setBrandList(filterList);
  };

  const submitBrand = () => {
    dispatch(
      postProductActions.setProductInfo({
        brand: selectedBrand,
      }),
    );
    props.navigation.goBack();
  };

  useEffect(() => {
    if (!brandList || !brandList?.length)
      dispatch(
        storeActions.getBrandList({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
        }),
      );
  }, []);
  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        leftIcon={
          <IonIcons name={'ios-close'} size={24} color={colors['$black']} />
        }
        title={i18n.t('addProduct.brandFashionsTitle')}
        containerStyle={styles.header}
      />
      <View style={styles.searchBarContainer}>
        <Searchbar
          style={styles.searchBarStyle}
          inputStyle={styles.searchBarInput}
          placeholder={'Tìm kiếm'}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : brandList.length ? (
        <ListBrand
          data={brandList}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
        />
      ) : (
        <Text style={styles.notFoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}

      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Chọn" onPress={submitBrand} />
        </TouchableOpacity>
      </View>
    </ThemeView>
  );
};
export default Brands;
