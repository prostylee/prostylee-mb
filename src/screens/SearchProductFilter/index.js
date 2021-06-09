import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, ButtonRounded} from 'components';
import {Remove} from 'svg/common';
import FeaturedCategories from './FeaturedCategories';

import PriceFilter from './PriceFilter';
import ConditionOfProductsFilter from './ConditionOfProductsFilter';

import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {getProductFilterAttributeListSelector} from 'redux/selectors/search/productFilter';
import {
  getSearchFeaturedCategoriesSelector,
  getCurrentKeyword,
} from 'redux/selectors/search';
import {getProductFilterState} from 'redux/selectors/search/productFilter';
const FilterProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));
  const filterAttributeList = useSelector((state) =>
    getProductFilterAttributeListSelector(state),
  );
  const filterState = useSelector((state) => getProductFilterState(state));
  const attributeFilterState = filterState?.attributes;
  const categoryFilterState = filterState.category;
  const priceFilterState = filterState.price;

  const categories = useSelector((state) =>
    getSearchFeaturedCategoriesSelector(state),
  );

  const _handleClearFilter = () => {
    dispatch(searchActions.clearProductsFilterState({}));
  };

  const _handlePriceChange = (value) => {
    console.log('PRICE CHANGE', value);
    dispatch(
      searchActions.setProductFilterState({
        ...filterState,
        price: [...value],
      }),
    );
  };
  const formatArrayParamsValue = (arrayValue = []) => {
    return `${arrayValue.join(',')}`;
  };
  const _handleConfirm = () => {
    // let arrayAttribute = Object.keys(attributeFilterState);
    let attributesParamm = {...attributeFilterState};
    let newAttributes = {};
    for (let item in attributesParamm) {
      if (attributesParamm[item] && Array.isArray(attributesParamm[item])) {
        console.log('ARRAY ', attributesParamm[item], '\n\n\n');
        newAttributes[`attributes[${item}]`] = formatArrayParamsValue(
          attributesParamm[item],
        );
      } else newAttributes[`attributes[${item}]`] = attributesParamm[item];
    }
    // console.log('ATTRIBUTES PARAMS', newAttributes);
    dispatch(
      searchActions.getProductsSearch({
        keyword: currentKeyword,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...newAttributes,
        // categoryId: categoryFilterState,
        // price: `${priceFilterState?.join('-')}`,
        userId: 1,
      }),
    );

    navigation.goBack();
  };

  useEffect(() => {
    if (!filterAttributeList || !filterAttributeList.length) {
      dispatch(searchActions.getProductsFilter({}));
    }
    if (!categories || !categories.length) {
      dispatch(
        searchActions.getSearchFeaturedCategories({
          type: 'product',
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          keyword: '',
        }),
      );
    }
  }, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        leftIcon={<Remove />}
        title={i18n.t('filter')}
        rightComponent={
          <TouchableOpacity onPress={_handleClearFilter}>
            <Text style={styles.headerRight}>Reset</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={styles.wrapContent}>
          <FeaturedCategories data={categories} />
          <PriceFilter
            onPriceChange={_handlePriceChange}
            minValue={0}
            maxValue={10000}
          />
          <ConditionOfProductsFilter />
        </View>
      </ScrollView>
      <ButtonRounded
        label="Áp Dụng"
        style={{margin: 20}}
        onPress={_handleConfirm}
      />
    </ThemeView>
  );
};

FilterProduct.defaultProps = {};

FilterProduct.propTypes = {};

export default FilterProduct;
