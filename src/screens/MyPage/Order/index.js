import styles from './styles';
import React, {useMemo} from 'react';
import {View} from 'react-native';
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

const Order = () => {
  const orderMenu = useMemo(
    () => [
      {
        icon: <WaitingIcon />,
        label: 'Chờ xác nhận',
        navigateScreen: 'Orders',
        dataPush: {
          status: 'waiting',
        },
      },
      {
        icon: <DeliveryIcon />,
        label: 'Đang giao hàng',
        navigateScreen: 'Orders',
        dataPush: {
          status: 'delivery',
        },
      },
      {
        icon: <DoneIcon />,
        label: 'Đã hoàn thành',
        navigateScreen: 'Orders',
        dataPush: {
          status: 'done',
        },
      },
      {
        icon: <InhouseIcon />,
        label: 'Mua tại cửa hàng',
        navigateScreen: 'Orders',
        dataPush: {
          status: 'inhouse',
        },
      },
      {
        icon: <CancelIcon />,
        label: 'Đã huỷ',
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
        label: 'Sản phẩm đang bán',
        navigateScreen: 'Orders',
        dataPush: {},
      },
      {
        icon: <SoldIcon />,
        label: 'Sản phẩm đã bán',
        navigateScreen: 'Orders',
        dataPush: {},
      },
    ],
    [],
  );
  const settingMenu = useMemo(
    () => [
      {
        icon: <HeartIcon />,
        label: 'Sản phẩm đã thích',
        navigateScreen: 'Orders',
        dataPush: {},
      },
      {
        icon: <SaveIcon />,
        label: 'Đã lưu',
        navigateScreen: 'Orders',
        dataPush: {},
      },
      {
        icon: <SettingIcon />,
        label: 'Thiết lập tài khoản',
        navigateScreen: 'Setting',
        dataPush: {},
      },
      {
        icon: <SupportIcon />,
        label: 'Hỗ trợ',
        navigateScreen: 'Orders',
        dataPush: {},
      },
    ],
    [],
  );
  return (
    <View style={styles.container}>
      <ListMenu title="Đơn hàng" menu={orderMenu} />
      <ListMenu title="Sản phẩm" menu={productMenu} />
      <ListMenu menu={settingMenu} />
    </View>
  );
};

export default Order;
