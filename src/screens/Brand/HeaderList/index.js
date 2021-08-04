/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import i18n from 'i18n';
import {View, TouchableOpacity as Touch, Text} from 'react-native';

import styles from './styles';
import {Colors, Image} from 'components';
import BrandList from '../BrandList';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {Searchbar} from 'react-native-paper';
import {ChevronLeft} from 'svg/common';
import {productActions} from 'redux/reducers';

import {useDispatch, useSelector} from 'react-redux';

import {getSelectedBrandSelector} from 'redux/selectors/brand';
let timeoutSearch = null;

const HeaderList = ({heightShow, leftPress}) => {
  const dispatch = useDispatch();

  const selectedBrand = useSelector((state) => getSelectedBrandSelector(state));

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
          brandId: selectedBrand?.id,
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
          selectedBrand?.banner
            ? {uri: selectedBrand?.banner}
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
          {selectedBrand?.name}
        </Text>
      </View>
      <BrandList />
    </View>
  );
};

HeaderList.defaultProps = {};

HeaderList.propTypes = {};

export default HeaderList;
