import React from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';

import ProductItem from './VoucherItem';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';

import data from './data.json';

const VoucherList = ({navigation}) => {
  const _handleSavePress = () => {
    console.log('Save');
    showMessage({
      titleStyle: {fontSize: 13, fontWeight: '500'},
      message: 'Thành công',
      textStyle: {fontSize: 13, fontWeight: '300'},
      description: 'Mã giảm giá đã được lưu',

      type: 'success',
      position: {
        top: 40,
        left: 0,
      },
      icon: {icon: 'success', position: 'left'},
      style: {
        alignItems: 'center',
      },
    });
  };
  const _handUsePress = () => {
    // navigation.navigate('FlashSale');
  };
  console.log('Data ', data);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listWrapper}
        data={data}
        renderItem={({item, index}) => (
          <ProductItem
            item={item}
            index={index}
            onSavePress={_handleSavePress}
            onUsePress={_handUsePress}
          />
        )}
        keyExtractor={({brand, content}) => `${brand}-${content}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

VoucherList.defaultProps = {};

VoucherList.propTypes = {};

export default React.memo(VoucherList);
