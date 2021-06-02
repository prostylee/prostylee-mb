import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, ButtonRounded} from 'components';
import {Remove} from 'svg/common';
import FeaturedCategories from './FeaturedCategories';
import SizeFilter from './SizeFilter';
import PriceFilter from './PriceFilter';
import ConditionOfProductsFilter from './ConditionOfProductsFilter';
import MaterialFilter from './MaterialFilter';
import StyleFilter from './StyleFilter';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {getProductFilterAttributeListSelector} from 'redux/selectors/search/productFilter';
import {getSearchFeaturedCategoriesSelector} from 'redux/selectors/search';

const FilterProduct = ({navigation}) => {
  const dispatch = useDispatch();

  const filterAttributeList = useSelector((state) =>
    getProductFilterAttributeListSelector(state),
  );
  const categories = useSelector((state) =>
    getSearchFeaturedCategoriesSelector(state),
  );

  const _handleClearFilter = () => {
    dispatch(searchActions.clearProductsFilterState({}));
  };

  useEffect(() => {
    if (!filterAttributeList || !filterAttributeList.length) {
      dispatch(
        searchActions.getProductsFilter({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          sorts: 'order',
        }),
      );
    }
  }, []);
  // console.log('FIlter Attribute List', filterAttributeList);

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
          <SizeFilter filterAttributeList={filterAttributeList} />
          <PriceFilter />
          <ConditionOfProductsFilter />
        </View>
      </ScrollView>
      <ButtonRounded
        label="Áp Dụng"
        style={{margin: 20}}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </ThemeView>
  );
};

FilterProduct.defaultProps = {};

FilterProduct.propTypes = {};

export default FilterProduct;
