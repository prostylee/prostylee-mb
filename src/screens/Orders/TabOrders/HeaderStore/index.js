/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import {RightArrow} from 'svg/common';

const HeaderStore = ({header, navigation, status}) => {
  const {storeName, storeId, storeAvatar} = header;
  const clickItem = () => {
    console.log('Cliked!', storeId);
  };

  const renderStatus = () => {
    switch (status) {
      case 'waiting':
        return (
          <Text style={{...styles.textHeaderStatus, color: '#ED2727'}}>
            Chưa thanh toán
          </Text>
        );
      case 'delivery':
        return (
          <Text style={{...styles.textHeaderStatus, color: '#F48231'}}>
            Kiểm tra tiến độ
          </Text>
        );
      case 'done':
        return (
          <Text style={{...styles.textHeaderStatus, color: '#3FBA44'}}>
            Hoàn thành
          </Text>
        );
      case 'cancel':
        return (
          <Text style={{...styles.textHeaderStatus, color: '#ED2727'}}>
            Đã hủy
          </Text>
        );
      default:
        return '#333333';
    }
  };
  return (
    <View style={styles.wrapHeader}>
      <View style={styles.wrapHeaderInfo}>
        <Image
          source={
            storeAvatar
              ? {uri: storeAvatar}
              : require('assets/images/default.png')
          }
          resizeMode="cover"
          style={styles.storeAvatar}
          PlaceholderContent={<ActivityIndicator />}
        />
        <TouchableOpacity onPress={clickItem} style={styles.storeName}>
          <Text style={styles.storeNameText}>&nbsp;{storeName}&nbsp;</Text>
          <RightArrow />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapHeaderStatus}>{renderStatus()}</View>
    </View>
  );
};

HeaderStore.defaultProps = {
  status: 'waiting',
};

HeaderStore.propTypes = {};

export default HeaderStore;
