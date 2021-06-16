/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';
import i18n from 'i18n';

import FeaturedCategoriesItem from './item.js';

import {Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {categoriesActions} from 'redux/reducers';

const FeaturedCategories = ({navigation, data = []}) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <Text style={styles.title}>{i18n.t('headerTitle.categories')}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                categoriesActions.setCategoriesParentSelect({id: undefined}),
              );
              navigation.navigate('Categories');
            }}>
            <Text
              style={[
                styles.title,
                {
                  fontWeight: '400',
                  color: Colors?.['$purple'],
                },
              ]}>
              {i18n.t('stores.seeMore')}
            </Text>
          </TouchableOpacity>
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
