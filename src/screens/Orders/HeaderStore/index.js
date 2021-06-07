/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import {RightArrow} from 'svg/common';
import {IconButton, Menu, Divider} from 'react-native-paper';
import i18n from 'i18n';

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
            {i18n.t('orders.statusWaiting')}
          </Text>
        );
      case 'delivery':
        return (
          <Text style={{...styles.textHeaderStatus, color: '#F48231'}}>
            {i18n.t('orders.stautusCheckProgress')}
          </Text>
        );
      case 'done':
        return (
          <Text style={{...styles.textHeaderStatus, color: '#3FBA44'}}>
            {i18n.t('orders.statusDone')}
          </Text>
        );
      case 'cancel':
        return (
          <Text style={{...styles.textHeaderStatus, color: '#ED2727'}}>
            {i18n.t('orders.statusCancel')}
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
            <Menu.Item onPress={() => {}} title={i18n.t('orders.markAsBuy')} />
            <Divider />
            <Menu.Item
              onPress={() => {}}
              title={i18n.t('orders.delete')}
              titleStyle={{color: '#ED2727'}}
            />
          </Menu>
        );
      default:
        return (
          <Text style={{...styles.textHeaderStatus, color: '#333333'}}>
            {i18n.t('orders.statusCancel')}
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
