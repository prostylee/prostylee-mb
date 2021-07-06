import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {useRoute} from '@react-navigation/native';
const FilterProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const filterDispatchFunction = route?.params?.filterFunc || null;

  const getFilterStateSelectorFunction =
    route?.params?.getFilterStateSelectorFunction || null;

  const clearFilterStateAction = route?.params?.clearFilterStateAction || null;

  const setFilterStateAction = route?.params?.setFilterStateAction || null;

  const defaultQueryParams = route?.params?.defaultQueryParams || {};

  const currentKeyword = useSelector((state) => getCurrentKeyword(state));
  const filterAttributeList = useSelector((state) =>
    getProductFilterAttributeListSelector(state),
  );

  const filterState = useSelector((state) =>
    getFilterStateSelectorFunction(state),
  );

  const categories = useSelector((state) =>
    getSearchFeaturedCategoriesSelector(state),
  );

  const [state, setState] = useState(filterState);

  const attributeFilterState = state?.attributes;
  const categoryFilterState = state.category;
  const priceFilterState = state.price;

  const _updateFilterState = (key, value) => {
    let newState = {...state};
    newState[key] = value;
    setState({...newState});
  };

  const _handleClearFilter = () => {
    setState({category: 0, price: [0, 0], attributes: {}});
    dispatch(clearFilterStateAction());
  };

  const formatArrayParamsValue = (arrayValue = []) => {
    return `${arrayValue.join(',')}`;
  };
  const _handleConfirm = () => {
    let attributesParamm = {...attributeFilterState};
    let newAttributes = {};
    for (let item in attributesParamm) {
      if (attributesParamm[item] && Array.isArray(attributesParamm[item])) {
        newAttributes[`attributes[${item}]`] = formatArrayParamsValue(
          attributesParamm[item],
        );
      } else newAttributes[`attributes[${item}]`] = attributesParamm[item];
    }

    dispatch(
      setFilterStateAction({
        price: priceFilterState || [0, 0],
        attributes: attributeFilterState,
        category: categoryFilterState || 0,
      }),
    );

    dispatch(
      filterDispatchFunction({
        // keyword: currentKeyword,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...newAttributes,
        categoryId: categoryFilterState || undefined,
        price:
          `${priceFilterState?.join('-')}` === '0-0'
            ? undefined
            : `${priceFilterState?.join('-')}`,
        ...defaultQueryParams,
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
            <Text style={styles.headerRight}>
              {i18n.t('filterProduct.reset')}
            </Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={styles.wrapContent}>
          <FeaturedCategories
            data={categories}
            defaultState={state}
            onItemPress={_updateFilterState}
          />
          <PriceFilter
            onPriceChange={_updateFilterState}
            minValue={0}
            maxValue={50000000}
            defaultState={state}
          />
          <ConditionOfProductsFilter
            onSelect={_updateFilterState}
            defaultState={state}
          />
        </View>
      </ScrollView>
      <ButtonRounded
        label={i18n.t('filterProduct.apply')}
        style={{margin: 20}}
        onPress={_handleConfirm}
      />
    </ThemeView>
  );
};

FilterProduct.defaultProps = {};

FilterProduct.propTypes = {};

export default FilterProduct;
