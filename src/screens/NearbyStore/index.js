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
import StoreResult from './StoreResult';

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
  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        containerStyle={{
          paddingBottom: 10,
          borderBottomWidth: 0,
          height: 50,
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
            Cửa hàng gần đây
          </Text>
        }
      />
      <TagList />
      <StoreResult />
    </ThemeView>
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProducts;
