import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import i18n from 'i18n';
import styles from './styles';
import {Sort, Filter, CaretDown} from 'svg/common';
import {ThemeView, Header, TextInputRounded} from 'components';
import {
  IconButton,
  Searchbar,
  RadioButton,
  Divider,
  Chip,
} from 'react-native-paper';
import {Colors} from 'components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RnRatingTap, Picker} from 'components';

const WIDTH = Dimensions.get('window').width;
import {debounce} from 'lodash';
import {MessageOutlined, Bell, BellWithNotiBadge} from 'svg/header';
import ProductList from './ProductList';
import SortDropDown from './SortDropDown';

const MockTag = [
  'Best seller',
  'Gần đây',
  'Sale',
  'Elegant',
  'Best seller',
  'Gần đây',
  'Sale',
  'Elegant',
];

const TagList = () => (
  <View style={styles.wrapList}>
    <FlatList
      style={styles.wrapChip}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={MockTag}
      renderItem={({item, index}) => (
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}
          key={`${item}-${index}`}>
          {item}
        </Chip>
      )}
    />
  </View>
);

const SearchProducts = ({navigation}) => {
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
            Tất cả sản phẩm
          </Text>
        }
      />
      <View style={styles.wrapBlockOne}>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View style={styles.contentBlockOne}>
            <View>
              <Sort />
            </View>
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('sort')}
            </Text>
            <View>
              <CaretDown />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchProductFilter')}>
          <View style={styles.wrapBlockFilter}>
            <Text numberOfLines={1} style={styles.textSpace}>
              |
            </Text>
            <Filter />
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('filter')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
      <TagList />
      <SortDropDown
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={setValueSort}
        valueSort={valueSort}
      />
      <ProductList />
    </ThemeView>
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProducts;
