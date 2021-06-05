/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';
import i18n from 'i18n';

import FeaturedCategoriesItem from './item.js';

import {CategoriesRightLoading} from 'components/Loading/contentLoader';

import {Text} from 'react-native-paper';

const FeaturedCategories = ({navigation, data = []}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <Text style={styles.title}>Danh mục</Text>
        </View>

        <View style={styles.wrapList}>
          <FlatList
            data={data && data.length ? data : [1, 2, 3, 4, 5, 6, 7]}
            renderItem={({item, index}) => (
              <FeaturedCategoriesItem
                index={index}
                navigation={navigation}
                item={item}
              />
            )}
            numColumns={2}
            keyExtractor={(item, index) => index}
            // refreshing={refreshing}
            // onRefresh={handleRefresh}
            // onEndReached={() => handleLoadMore()}
            // ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
