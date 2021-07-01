import styles from './styles';
import React, {useMemo} from 'react';
import {Linking, ScrollView} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {getListUserOrderStatusSelector} from 'redux/selectors/myPage';
import {myPageActions} from 'reducers';
import {ORDER_STATUS_ACT_CODE} from 'constants';
const Order = () => {
  const dispatch = useDispatch();

  const statusSelector = useSelector((state) =>
    getListUserOrderStatusSelector(state),
  );

  let listStatus = statusSelector?.content || [];

  listStatus = listStatus.sort((a, b) => a.id - b.id);

  React.useEffect(() => {
    dispatch(myPageActions.getUserOrdersStatusList());
  }, []);
  const orderMenu = useMemo(() => {
    let route = listStatus?.map((item) => {
      switch (item?.actCode) {
        case ORDER_STATUS_ACT_CODE.WAIT_FOR_PAYMENT: {
          return {
            ...item,
            icon: <WaitingIcon />,
            label: item?.name,
            navigateScreen: 'Orders',
            dataPush: {
              status: item?.id,
            },
          };
        }
        case ORDER_STATUS_ACT_CODE.ON_DELIVERY: {
          return {
            ...item,
            icon: <DeliveryIcon />,
            label: item?.name,
            navigateScreen: 'Orders',
            dataPush: {
              status: item?.id,
            },
          };
        }
        case ORDER_STATUS_ACT_CODE.COMPLETED: {
          return {
            ...item,
            icon: <DoneIcon />,
            label: item?.name,
            navigateScreen: 'Orders',
            dataPush: {
              status: item?.id,
            },
          };
        }
        case ORDER_STATUS_ACT_CODE.PROCESSING: {
          return {
            ...item,
            icon: <InhouseIcon />,
            label: item?.name,
            navigateScreen: 'Orders',
            dataPush: {
              status: item?.id,
            },
          };
        }
        case ORDER_STATUS_ACT_CODE.CANCEL_ORDER: {
          return {
            ...item,
            icon: <CancelIcon />,
            label: item?.name,
            navigateScreen: 'Orders',
            dataPush: {
              status: item?.id,
            },
          };
        }
        default: {
          return {
            ...item,
            icon: <CancelIcon />,
            label: item?.name,
            navigateScreen: 'Orders',
            dataPush: {
              status: item?.id,
            },
          };
        }
      }
    });
    return route;
  }, [JSON.stringify(listStatus)]);

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
        // navigateScreen: 'SoldList',
        dataPush: {status: 'sold'},
        disabled: true,
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
    <ScrollView style={styles.container}>
      <ListMenu title={i18n.t('mypage.orders')} menu={orderMenu} />
      <ListMenu title={i18n.t('mypage.products')} menu={productMenu} />
      <ListMenu menu={settingMenu} />
    </ScrollView>
  );
};

export default Order;
