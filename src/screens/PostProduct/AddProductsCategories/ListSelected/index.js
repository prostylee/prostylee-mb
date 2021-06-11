import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import i18n from 'i18n';
import {useTheme, useNavigation} from '@react-navigation/native';
import styles from './styles';

const DATA = [
  {
    id: '0',
    categories: 'Thời trang nam',
    products: 'Sơ mi tay ngắn',
  },
  {
    id: '1',
    categories: 'Thời trang nam',
    products: 'Quần tây',
  },
  {
    id: '2',
    categories: 'Thời trang nam',
    products: 'Áo hoodies nam',
  },
];
const Item = ({item, index, selectedCategory}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('GeneralInformation')}>
      <View
        style={[
          styles.itemContainer,
          {
            borderTopColor: index !== 0 ? colors['$bgColor'] : 'transparent',
          },
        ]}>
        <Text
          style={
            styles.itemText
          }>{`${selectedCategory.label} / ${item.products}`}</Text>
      </View>
    </TouchableOpacity>
  );
};
const ListStoreAddress = (props) => {
  const selectedCategory = props.selectedCategory ? props.selectedCategory : {};
  const renderItem = ({item, index}) => {
    return (
      <Item item={item} index={index} selectedCategory={selectedCategory} />
    );
  };
  return (
    <View>
      <View style={styles.spaceHeader}>
        <Text style={styles.textSpace}>
          {i18n.t('addProduct.selectedCategory')}
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentStyle}
        style={styles.flatlistStyle}
      />
    </View>
  );
};

export default ListStoreAddress;
