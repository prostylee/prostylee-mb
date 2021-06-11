import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import i18n from 'i18n';
import {useTheme, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLeftLoadingSelector,
  getListLeftCategoriesSelector,
} from 'redux/selectors/categories';
import {Image} from 'components';
import {postProductActions} from 'redux/reducers';
import defaultIcon from '../../../../assets/icons/gallery.png';
import {ActivityIndicator} from 'react-native-paper';
import Item from './item';
import {Colors} from 'components';

const ListParentCategories = (props) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => getLeftLoadingSelector(state));
  const listCategoriesSelector = useSelector((state) =>
    getListLeftCategoriesSelector(state),
  );
  const listCaterories = listCategoriesSelector?.content || [];

  const onSelectParentCategory = (item) => {
    //console.log('PARENT CATEGORY', JSON.stringify(item, null, 2));
    dispatch(
      postProductActions.setProductInfo({
        category: item,
      }),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <Item
        item={item}
        index={index}
        onItemPress={() => onSelectParentCategory(item)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.spaceHeader}>
        <Text style={styles.textSpace}>
          {i18n.t('addProduct.selectedCategory')}
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : listCaterories && listCaterories.length ? (
        <FlatList
          data={listCaterories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentStyle}
          style={styles.flatlistStyle}
        />
      ) : (
        <Text style={styles.notFoundText}>
          {i18n.t('Search.resultsNotfound')}
        </Text>
      )}
    </View>
  );
};

export default ListParentCategories;
