import React, {useState} from 'react';

import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import styles from './styles';
import ListAddress from './ListAddress';
const AddressRecent = (navigation) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    handlerSearch(query);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={25} />
        </TouchableOpacity>
        <Searchbar
          style={styles.search}
          inputStyle={styles.inputStyle}
          placeholder={'Địa điểm của bạn'}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <TouchableOpacity>
          <Icon name="md-map-outline" size={25} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={{padding: 10, color: 'gray'}}>
        <Text style={{color: 'grey', fontSize: 14}}>Địa chỉ đã chọn</Text>
      </View>
      <ListAddress />
    </SafeAreaView>
  );
};
export default AddressRecent;
