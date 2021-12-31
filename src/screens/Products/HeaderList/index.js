import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import ProductsCategories from '../Categories';
import {getCategoriesSelectSelector} from 'redux/selectors/categories';
import {useSelector} from 'react-redux';

const HeaderList = () => {
  const categorySelect = useSelector((state) =>
    getCategoriesSelectSelector(state),
  );
  return (
    <>
      <View style={styles.wrapTitle}>
        <Text numberOfLines={1} style={styles.headTitle}>
          {categorySelect?.name}
        </Text>
      </View>
      <ProductsCategories />
    </>
  );
};

HeaderList.defaultProps = {};

HeaderList.propTypes = {};

export default HeaderList;
