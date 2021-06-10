import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
const DATA = [
  {
    id: '0',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '1',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '2',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '3',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '4',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '5',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '6',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '7',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '8',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '9',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '10',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '11',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '12',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '13',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '14',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '15',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '16',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
];
const Item = ({item, selectedBrand, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemcontainer}>
        <Image
          source={require('../../../../assets/images/uniqlo.png')}
          resizeMode={'cover'}
          style={[
            styles.img,
            {
              borderWidth: 4,
              borderColor:
                item.id == selectedBrand ? colors['$purple'] : 'transparent',
            },
          ]}
        />
        <Text style={styles.Card}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListBrand = (props) => {
  const selectedBrand = props.selectedBrand ? props.selectedBrand : {};
  const setSelectedBrand = props.setSelectedBrand
    ? props.setSelectedBrand
    : () => {};
  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        selectedBrand={selectedBrand}
        onPress={() => setSelectedBrand(item.id)}
      />
    );
  };
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.containerContent}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

export default ListBrand;
