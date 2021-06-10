import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Check} from 'svg/common';

import styles from './styles';

const Item = ({item, selectedBrand, onPress}) => {
  const {colors} = useTheme();
  const active = selectedBrand.id === item.id;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemcontainer}>
        {active ? (
          <View
            style={[
              styles.img,
              {
                backgroundColor: colors['$purple'],
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Check />
          </View>
        ) : (
          <Image
            source={
              item.icon
                ? {uri: item.icon}
                : require('../../../../assets/images/uniqlo.png')
            }
            resizeMode={'cover'}
            style={[
              styles.img,
              {
                borderWidth: 4,
                borderColor: active ? colors['$purple'] : 'transparent',
              },
            ]}
          />
        )}

        <Text
          style={[
            styles.Card,
            {
              color: active ? colors['$purple'] : colors['$black'],
            },
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ListBrand = ({selectedBrand, setSelectedBrand, data}) => {
  const activeBrand = selectedBrand ? selectedBrand : {};
  const setActiveBrand = setSelectedBrand ? setSelectedBrand : () => {};
  // console.log('DATA NE', JSON.stringify(data, null, 2));
  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        selectedBrand={activeBrand}
        onPress={() => setActiveBrand(item)}
      />
    );
  };
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.containerContent}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

export default ListBrand;
