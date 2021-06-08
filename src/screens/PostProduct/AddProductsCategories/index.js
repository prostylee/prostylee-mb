import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeView, Header, ButtonRounded} from 'components';
import ListSelected from './ListSelected';
import ListProduct from './ListProducts';
const AddProducts = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text style={styles.middleComponent}>Thêm sản phẩm</Text>
        }
      />
      <View style={styles.spaceHeader}>
        <Text style={styles.textSpace}>Danh mục đã chọn</Text>
      </View>
      <ListSelected />
      <ListProduct />
    </SafeAreaView>
  );
};
export default AddProducts;
