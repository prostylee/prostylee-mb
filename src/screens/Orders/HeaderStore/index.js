/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import {RightArrow} from 'svg/common';
import {IconButton, Menu, Divider} from 'react-native-paper';
import {getListUserOrderStatusSelector} from 'redux/selectors/myPage';
import i18n from 'i18n';
import {useSelector} from 'react-redux';
import {ORDER_STATUS_ACT_CODE} from 'constants';
import {useNavigation} from '@react-navigation/native';

const HeaderStore = ({header, statusId = 0}) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const {storeName, storeId, storeAvatar} = header;

  const clickItem = () => {
    if (storeId) {
      navigation.navigate('StoreProfileMain', {
        storeId,
      });
    }
  };
  const statusSelector = useSelector((state) =>
    getListUserOrderStatusSelector(state),
  );
  let listStatus = statusSelector?.content || [];
  listStatus = listStatus.sort((a, b) => a.id - b.id);
  const getStatus = () => {
    if (listStatus && listStatus?.length) {
      return listStatus.find((item) => item.id === statusId) || {};
    }
    return {};
  };

  const status = getStatus();

  const renderStatus = () => {
    switch (status?.actCode) {
      case ORDER_STATUS_ACT_CODE.PROCESSING:
        return (
          <Text style={{...styles.textHeaderStatus, color: '#823FFD'}}>
            {status?.name}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.ON_DELIVERY:
        return (
          <Text style={{...styles.textHeaderStatus, color: '#F48231'}}>
            {status?.name}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.COMPLETED:
        return (
          <Text style={{...styles.textHeaderStatus, color: '#3FBA44'}}>
            {status?.name}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.CANCEL_ORDER:
        return (
          <Text style={{...styles.textHeaderStatus, color: '#ED2727'}}>
            {status?.name}
          </Text>
        );
      case ORDER_STATUS_ACT_CODE.WAIT_FOR_PAYMENT:
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
            {/* {i18n.t('orders.statusCancel')} */}
            {status?.name}
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
