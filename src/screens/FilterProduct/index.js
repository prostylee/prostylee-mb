import React, {useCallback} from 'react';
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

const FilterProduct = ({navigation}) => {
  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        leftIcon={<Remove />}
        title={i18n.t('filter')}
        rightComponent={
          <TouchableOpacity>
            <Text style={styles.headerRight}>Reset</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={styles.wrapContent}>
          <FeaturedCategories />
          <SizeFilter />
          <PriceFilter />
          <ConditionOfProductsFilter />
          <MaterialFilter />
          <StyleFilter />
        </View>
      </ScrollView>
      <ButtonRounded label="Áp Dụng" style={{paddingBottom: 30}} />
    </ThemeView>
  );
};

FilterProduct.defaultProps = {};

FilterProduct.propTypes = {};

export default FilterProduct;
