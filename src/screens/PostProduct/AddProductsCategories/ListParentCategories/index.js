import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import i18n from 'i18n';

import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLeftLoadingSelector,
  getListLeftCategoriesSelector,
} from 'redux/selectors/categories';
import {PostProductCategoryLoading} from 'components/Loading/contentLoader';

import {postProductActions} from 'redux/reducers';

import Item from './item';

const ListParentCategories = (props) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => getLeftLoadingSelector(state));
  const listCategoriesSelector = useSelector((state) =>
    getListLeftCategoriesSelector(state),
  );
  const listCaterories = listCategoriesSelector?.content || [];

  const onSelectParentCategory = (item) => {
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
          {i18n.t('addProduct.productCategory')}
        </Text>
      </View>
      {loading ? (
        <View style={{paddingHorizontal: 16, overflow: 'hidden'}}>
          <PostProductCategoryLoading />
        </View>
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
