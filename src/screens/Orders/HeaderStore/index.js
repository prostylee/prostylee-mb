/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import {RightArrow} from 'svg/common';
import {IconButton, Menu, Divider} from 'react-native-paper';

const HeaderStore = ({header, navigation, status}) => {
  const [visible, setVisible] = useState(false);
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
      case 'inhouse':
        return (
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <IconButton
                onPress={() => setVisible(true)}
                icon="dots-horizontal"
                color="#8B9399"
                size={20}
              />
            }>
            <Menu.Item onPress={() => {}} title="Đánh dấu đã mua" />
            <Divider />
            <Menu.Item
              onPress={() => {}}
              title="Xóa"
              titleStyle={{color: '#ED2727'}}
            />
          </Menu>
        );
      default:
        return (
          <Text style={{...styles.textHeaderStatus, color: '#333333'}}>
            Đã hủy
          </Text>
        );
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
