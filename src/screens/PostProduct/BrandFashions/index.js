import React, {useEffect, useCallback} from 'react';

import {View, TouchableOpacity, Text} from 'react-native';
import {Header, ButtonRounded, ThemeView, SearchBar} from 'components';
import i18n from 'i18n';
import IonIcons from 'react-native-vector-icons/Ionicons';
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
import {useRoute, useTheme} from '@react-navigation/native';
import {debounce} from 'lodash';
const Brands = (props) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const isReadOnly = route?.params?.readOnly || false;

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
  const onChangeSearch = useCallback(
    debounce((query) => {
      dispatch(
        storeActions.getBrandList({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          keyword: query,
        }),
      );
    }, 1000),
    [],
  );

  const submitBrand = () => {
    dispatch(
      postProductActions.setProductInfo({
        brand: selectedBrand,
      }),
    );
    props.navigation.goBack();
  };

  useEffect(() => {
    dispatch(
      storeActions.getBrandList({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, []);

  useEffect(() => {
    setBrandList(brandListSelector?.content || []);
  }, [brandListSelector?.content]);

  const _handleLeftPress = () => {
    dispatch(
      storeActions.getBrandList({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        leftPress={_handleLeftPress}
        isDefault
        leftIcon={
          <IonIcons name={'ios-close'} size={24} color={colors['$black']} />
        }
        title={i18n.t('addProduct.brandFashionsTitle')}
        containerStyle={styles.header}
      />
      <View style={styles.searchBarContainer}>
        <SearchBar
          style={styles.searchBarStyle}
          placeholder={i18n.t('search')}
          onChangeText={(text) => {
            setSearchQuery(text);
            onChangeSearch(text);
          }}
          value={searchQuery}
        />
      </View>
      <View style={styles.contentWrapper}>
        {brandList?.length ? (
          <ListBrand
            keyWord={searchQuery}
            data={brandList}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            isReadOnly={isReadOnly}
          />
        ) : (
          <Text style={styles.notFoundText}>
            {i18n.t('Search.resultsNotfound')}
          </Text>
        )}
      </View>
      {!isReadOnly ? (
        <View style={styles.button}>
          <TouchableOpacity>
            <ButtonRounded
              label={i18n.t('addProduct.choose')}
              onPress={submitBrand}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </ThemeView>
  );
};
export default Brands;
