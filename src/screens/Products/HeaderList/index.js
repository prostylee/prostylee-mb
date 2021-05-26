/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import i18n from 'i18n';
import {View, TouchableOpacity as Touch, Text} from 'react-native';

import styles from './styles';
import {Colors, Image} from 'components';
import ProductsCategories from '../Categories';
import {Searchbar} from 'react-native-paper';
import {ChevronLeft} from 'svg/common';
import {getCategoriesSelectSelector} from 'redux/selectors/categories';
import {useDispatch, useSelector} from 'react-redux';

const HeaderList = ({heightShow, leftPress, navigation}) => {
  const categoriesSelect = useSelector((state) =>
    getCategoriesSelectSelector(state),
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  console.log('categoriesSelect');
  console.log(categoriesSelect);
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
          categoriesSelect?.banner
            ? {uri: categoriesSelect?.banner}
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
        <Touch style={{width: 16}} onPress={leftPress}>
          <ChevronLeft color={Colors.$white} />
        </Touch>
      </View>
      <View style={styles.wrapTitle}>
        <Text numberOfLines={1} style={styles.headTitle}>
          {categoriesSelect?.name}
        </Text>
      </View>
      <ProductsCategories />
    </View>
  );
};

HeaderList.defaultProps = {};

HeaderList.propTypes = {};

export default HeaderList;
