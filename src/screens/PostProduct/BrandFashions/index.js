import React, {useState} from 'react';

import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Header, ButtonRounded} from 'components';
import {Searchbar} from 'react-native-paper';

import styles from './styles';
import ListBrand from './ListBrands';
const Brands = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    handlerSearch(query);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text style={styles.middleComponent}>Thương hiệu</Text>
        }
      />
      <View
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 0.2,
          borderBottomColor: 'grey',
        }}>
        <Searchbar
          style={{
            width: '90%',
            backgroundColor: '#F4F5F5',
            height: 35,
            alignSelf: 'center',
            marginBottom: 5,
            elevation: -5,
          }}
          inputStyle={{
            backgroundColor: '#F4F5F5',
            fontSize: 14,
            marginLeft: -20,
          }}
          placeholder={'Tìm kiếm'}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ListBrand />
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Chọn" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Brands;
