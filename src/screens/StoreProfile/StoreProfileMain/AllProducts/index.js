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
  '🔥 Deal hot',
  'Elegant',
  'Best seller',
  'Gần đây',
  'Sale',
  'Elegant',
];

const GroupHeaderRightButton = ({haveNoti = false}) => {
  return (
    <View style={styles.headerGroupButtonRight}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MessageOutlined
          width={20}
          height={20}
          color={Colors['$lightGray']}
          strokeWidth={2}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {haveNoti ? (
          <BellWithNotiBadge
            width={24}
            height={24}
            color={Colors['$lightGray']}
            strokeWidth={2}
          />
        ) : (
          <Bell
            width={24}
            height={24}
            color={Colors['$lightGray']}
            strokeWidth={2}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
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

const AllProducts = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tất cả sản phẩm</Text>
      <TagList />
      <ProductList />
    </View>
  );
};

AllProducts.defaultProps = {};

AllProducts.propTypes = {};

export default AllProducts;
