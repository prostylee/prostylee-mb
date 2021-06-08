import styles from './styles';
import React, {useMemo} from 'react';
import {View, Linking} from 'react-native';
import {ListMenu} from 'components';
import {
  WaitingIcon,
  DeliveryIcon,
  DoneIcon,
  InhouseIcon,
  CancelIcon,
  SaleIcon,
  SoldIcon,
  HeartIcon,
  SaveIcon,
  SettingIcon,
  SupportIcon,
} from 'svg/common';
import i18n from 'i18n';

const Order = () => {
  const orderMenu = useMemo(
    () => [
      {
        icon: <WaitingIcon />,
        label: i18n.t('mypage.waiting'),
        navigateScreen: 'Orders',
        dataPush: {
          status: 'waiting',
        },
      },
      {
        icon: <DeliveryIcon />,
        label: i18n.t('mypage.delivery'),
        navigateScreen: 'Orders',
        dataPush: {
          status: 'delivery',
        },
      },
      {
        icon: <DoneIcon />,
        label: i18n.t('mypage.done'),
        navigateScreen: 'Orders',
        dataPush: {
          status: 'done',
        },
      },
      {
        icon: <InhouseIcon />,
        label: i18n.t('mypage.inhouse'),
        navigateScreen: 'Orders',
        dataPush: {
          status: 'inhouse',
        },
      },
      {
        icon: <CancelIcon />,
        label: i18n.t('mypage.cancel'),
        navigateScreen: 'Orders',
        dataPush: {
          status: 'cancel',
        },
      },
    ],
    [],
  );

  const productMenu = useMemo(
    () => [
      {
        icon: <SaleIcon />,
        label: i18n.t('mypage.saleProduct'),
        navigateScreen: 'SoldList',
        dataPush: {status: 'sale'},
      },
      {
        icon: <SoldIcon />,
        label: i18n.t('mypage.soldProduct'),
        navigateScreen: 'SoldList',
        dataPush: {status: 'sold'},
      },
    ],
    [],
  );

  const settingMenu = useMemo(
    () => [
      {
        icon: <HeartIcon />,
        label: i18n.t('mypage.wishList'),
        navigateScreen: 'WishList',
        dataPush: {},
      },
      {
        icon: <SaveIcon />,
        label: i18n.t('mypage.saveList'),
        navigateScreen: 'SaveList',
        dataPush: {},
      },
      {
        icon: <SettingIcon />,
        label: i18n.t('mypage.accountSetting'),
        navigateScreen: 'Setting',
        dataPush: {},
      },
      {
        icon: <SupportIcon />,
        label: i18n.t('mypage.support'),
        onPress: () => Linking.openURL(`tel:099999999`),
      },
    ],
    [],
  );
  return (
    <View style={styles.container}>
      <ListMenu title={i18n.t('mypage.orders')} menu={orderMenu} />
      <ListMenu title={i18n.t('mypage.products')} menu={productMenu} />
      <ListMenu menu={settingMenu} />
    </View>
  );
};

export default Order;
