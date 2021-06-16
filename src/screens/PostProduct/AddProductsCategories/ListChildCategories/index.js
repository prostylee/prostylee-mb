import React from 'react';
import {View, Text, FlatList} from 'react-native';

import styles from './styles';
import i18n from 'i18n';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {
  getRightLoadingSelector,
  getListRightCategoriesSelector,
} from 'redux/selectors/categories';

import Item from './item';

import {getPostProductInfoSelector} from 'redux/selectors/postProduct';
import {postProductActions} from 'redux/reducers';
import {useNavigation} from '@react-navigation/native';
import {PostProductCategoryLoading} from 'components/Loading/contentLoader';

const ListChildCategories = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );
  const loading = useSelector((state) => getRightLoadingSelector(state));
  const listChildCategoriesSelector = useSelector((state) =>
    getListRightCategoriesSelector(state),
  );
  const ParentName = postProductInfo?.category?.name || '';
  const listChildCategories = listChildCategoriesSelector?.content || [];

  const onChildCategoryPress = (item) => {
    dispatch(
      postProductActions.setProductInfo({
        childrenCategory: item,
      }),
    );
    dispatch(
      postProductActions.getListAttributes({
        id: item.id,
      }),
    );
    dispatch(postProductActions.getListProductStatus());
    dispatch(postProductActions.getListDeliveryType());
    dispatch(postProductActions.getListPaymentMethod());
    navigation.navigate('GeneralInformation');
  };
  const renderItem = ({item, index}) => {
    return (
      <Item
        item={item}
        index={index}
        parentName={ParentName}
        onPress={() => onChildCategoryPress(item)}
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
      ) : listChildCategories && listChildCategories.length ? (
        <FlatList
          data={listChildCategories}
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

export default ListChildCategories;
