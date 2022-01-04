import React from 'react';
import {View} from 'react-native';

import styles from './styles';

import i18n from 'i18n';

import FeaturedCategoriesItem from './item';
import {ChevronRight} from 'svg/common';

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
            style={{flexDirection: 'row'}}
            onPress={() => {
              dispatch(
                categoriesActions.setCategoriesParentSelect({id: undefined}),
              );
              navigation.navigate('Categories');
            }}>
            <Text style={styles.seeMoreText}>{i18n.t('stores.seeMore')}</Text>
            <ChevronRight />
          </TouchableOpacity>
        </View>

        <View style={styles.wrapList}>
          {data && data?.length
            ? data.map((item, index) => (
                <FeaturedCategoriesItem
                  index={index}
                  navigation={navigation}
                  item={item}
                  key={`category_feature_${item?.id}`}
                />
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <FeaturedCategoriesItem
                  index={index}
                  navigation={navigation}
                  item={item}
                  key={`item_feature_${item}`}
                />
              ))}
        </View>
      </View>
    </>
  );
};

FeaturedCategories.defaultProps = {};

FeaturedCategories.propTypes = {};

export default FeaturedCategories;
