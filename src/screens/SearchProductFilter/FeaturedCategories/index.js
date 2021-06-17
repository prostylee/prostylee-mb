/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';
import i18n from 'i18n';

import {getSearchFeaturedCategoriesSelector} from 'redux/selectors/search';

import FeaturedCategoriesItem from './item.js';

import {useSelector} from 'react-redux';

import {Divider, Text} from 'react-native-paper';

const FeaturedCategories = ({
  navigation,
  defaultState = {},
  onItemPress = () => {},
}) => {
  const categoryFilterState = defaultState.category;

  const activeItem = categoryFilterState;

  const categories = useSelector((state) =>
    getSearchFeaturedCategoriesSelector(state),
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <Text style={styles.title}>{i18n.t('Search.categories')}</Text>
        </View>
        <View style={styles.wrapList}>
          <FlatList
            horizontal
            directionalLockEnabled={true}
            data={categories?.content ? categories?.content : [1, 2, 3, 4, 5]}
            renderItem={({item, index}) => (
              <FeaturedCategoriesItem
                index={index}
                navigation={navigation}
                item={item}
                isActive={activeItem === item.id}
                defaultState={defaultState}
                onItemPress={onItemPress}
              />
            )}
            contentContainerStyle={{backgroundColor: Colors['$white']}}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Divider />
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
