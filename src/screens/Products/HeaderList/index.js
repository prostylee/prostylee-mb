/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import i18n from 'i18n';
import {View, TouchableOpacity as Touch, Text} from 'react-native';

import styles from './styles';
import {Colors, Image} from 'components';
import ProductsCategories from '../Categories';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Searchbar} from 'react-native-paper';
import {ChevronLeft} from 'svg/common';
import {productActions} from 'redux/reducers';
import {
  getCategoriesSelectSelector,
  getCategoriesParentSelectSelector,
} from 'redux/selectors/categories';
import {useDispatch, useSelector} from 'react-redux';
let timeoutSearch = null;

const HeaderList = ({heightShow, leftPress, navigation, categoryId = 0}) => {
  const dispatch = useDispatch();
  const categorySelect = useSelector((state) =>
    getCategoriesSelectSelector(state),
  );
  const categoryParentSelect = useSelector((state) =>
    getCategoriesParentSelectSelector(state),
  );

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => {
    dispatch(productActions.setListProductLoading(true));
    clearTimeout(timeoutSearch);
    setSearchQuery(query);
    timeoutSearch = setTimeout(() => {
      dispatch(
        productActions.getListProduct({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          categoryId: categoryId,
          sorts: 'name',
          keyword: query,
        }),
      );
    }, 1000);
    setSearchQuery(query);
  };
  return (
    <View
      style={{
        height: heightShow,
        width: '100%',
        position: 'relative',
      }}>
      <Image
        style={styles.imageBanner}
        source={
          categorySelect?.banner
            ? {uri: categorySelect?.banner}
            : require('assets/images/default.png')
        }
        resizeMode="cover"
      />
      <View style={styles.wrapSearchBar}>
        <Searchbar
          placeholder={i18n.t('search')}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.wrapButtonLeft}>
        <Touch style={styles.leftTouch} onPress={leftPress}>
          <ChevronLeft color={Colors.$white} />
        </Touch>
      </View>
      <View style={styles.wrapTitle}>
        <Text numberOfLines={1} style={styles.headTitle}>
          {categorySelect?.name}
        </Text>
      </View>
      <ProductsCategories />
    </View>
  );
};

HeaderList.defaultProps = {};

HeaderList.propTypes = {};

export default HeaderList;
