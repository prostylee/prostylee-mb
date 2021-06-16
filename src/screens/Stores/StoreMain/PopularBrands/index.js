import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import i18n from 'i18n';
import {FlatList} from 'react-native-gesture-handler';
import BrandItem from './BrandItem';
import {useNavigation} from '@react-navigation/native';

const PopularBrands = ({data = []}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapBackground,
          {
            backgroundColor: '#fff',
            paddingVertical: 12,
            paddingBottom: 8,
          },
        ]}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>{i18n.t('stores.popularBrand')}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BrandFashions', {readOnly: true})
            }>
            <Text style={styles.seeMoreText}>{i18n.t('stores.seeMore')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapList}>
          <FlatList
            data={data && data.length ? data : [1, 2, 3, 4, 5, 6, 7, 8]}
            horizontal
            renderItem={({item, index}) => (
              <BrandItem item={item} index={index} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listInner}
          />
        </View>
      </View>
    </View>
  );
};

export default PopularBrands;
