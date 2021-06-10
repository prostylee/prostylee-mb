import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import i18n from 'i18n';
import {useSelector} from 'react-redux';
import {
  getRightLoadingSelector,
  getListRightCategoriesSelector,
} from 'redux/selectors/categories';
import {ActivityIndicator} from 'react-native-paper';

const DATA = [];
const Item = ({item, index, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.itemContainer,
          {
            borderTopColor: index !== 0 ? colors['$bgColor'] : 'transparent',
          },
        ]}>
        <Icon name="tshirt" size={16} />
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};
const ListChildCategories = (props) => {
  const loading = useSelector((state) => getRightLoadingSelector(state));
  const listChildCategoriesSelector = useSelector((state) =>
    getListRightCategoriesSelector(state),
  );

  const listChildCategories = listChildCategoriesSelector?.content || [];

  console.log('List child category ', listChildCategories);

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };
  return (
    <SafeAreaView>
      <View style={styles.spaceHeader}>
        <Text style={styles.textSpace}>
          {i18n.t('addProduct.productCategory')}
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={listChildCategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentStyle}
          style={styles.flatlistStyle}
        />
      )}
    </SafeAreaView>
  );
};

export default ListChildCategories;
