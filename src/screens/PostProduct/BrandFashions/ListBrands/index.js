import React from 'react';

import {FlatList} from 'react-native';

import styles from './styles';
import Item from './item';

const ListBrand = ({selectedBrand, setSelectedBrand, data}) => {
  const activeBrand = selectedBrand ? selectedBrand : {};
  const setActiveBrand = setSelectedBrand ? setSelectedBrand : () => {};

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
