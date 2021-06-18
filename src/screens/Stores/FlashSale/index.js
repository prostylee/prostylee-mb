import React, {useCallback, useState} from 'react';
import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import i18n from 'i18n';
import styles from './styles';

import {ThemeView, Header, SortDropDown} from 'components';
import {Divider} from 'react-native-paper';

import {PRODUCT_SORT_ITEM} from 'constants';

import ProductList from './ProductList';

import TagList from './TagList';
import FilterBar from './FilterBar';

const FlashSale = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        containerStyle={{
          paddingBottom: 10,
          borderBottomWidth: 0,
          borderBottomWidth: 1,
        }}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {i18n.t('stores.flashSale')}
          </Text>
        }
      />
      <FilterBar
        setVisible={setVisible}
        visible={visible}
        navigation={navigation}
      />
      <Divider />
      <TagList onTagPress={() => {}} />
      <SortDropDown
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={setValueSort}
        valueSort={valueSort}
        options={PRODUCT_SORT_ITEM}
      />
      <ProductList />
    </ThemeView>
  );
};

FlashSale.defaultProps = {};

FlashSale.propTypes = {};

export default FlashSale;
