import styles from './styles';

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'components/ForkReactNativeSrollableTabView';
import {Waiting, Delivery, Done, Cancel, Inhouse, WaitForPayment} from './Tabs';
import {myPageActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListUserOrderStatusSelector,
  getListUserOrderStatusLoadingSelector,
} from 'redux/selectors/myPage';
import {ActivityIndicator} from 'react-native-paper';
import {ORDER_STATUS_ACT_CODE} from 'constants';

const TabOrders = ({navigation, status}) => {
  const dispatch = useDispatch();

  const statusSelector = useSelector((state) =>
    getListUserOrderStatusSelector(state),
  );

  const listStatusLoading = useSelector((state) =>
    getListUserOrderStatusLoadingSelector(state),
  );

  let listStatus = statusSelector?.content || [];
  listStatus = listStatus.sort((a, b) => a.id - b.id);

  useEffect(() => {
    dispatch(myPageActions.getUserOrdersStatusList());
  }, []);
  return (
    <View style={styles.container}>
      {listStatusLoading ? (
        <ActivityIndicator />
      ) : listStatus && listStatus?.length ? (
        <ScrollableTabView
          tabBarActiveTextColor="#823FFD"
          tabBarUnderlineStyle={{backgroundColor: '#823FFD'}}
          initialPage={listStatus.findIndex((item) => item.id === status)}
          renderTabBar={() => <ScrollableTabBar backgroundColor="#ffffff" />}>
          {listStatus.map((item, index) => {
            switch (item.actCode) {
              case ORDER_STATUS_ACT_CODE.PROCESSING:
                return (
                  <View tabLabel={item.name} key={item.key}>
                    <Waiting status={item.key} {...item} statusId={item?.id} />
                  </View>
                );
              case ORDER_STATUS_ACT_CODE.ON_DELIVERY:
                return (
                  <View tabLabel={item.name} key={item.key}>
                    <Delivery status={item.key} {...item} statusId={item?.id} />
                  </View>
                );
              case ORDER_STATUS_ACT_CODE.COMPLETED:
                return (
                  <View tabLabel={item.name} key={item.key}>
                    <Done status={item.key} {...item} statusId={item?.id} />
                  </View>
                );
              case ORDER_STATUS_ACT_CODE.CANCEL_ORDER:
                return (
                  <View tabLabel={item.name} key={item.key}>
                    <Cancel status={item.key} {...item} statusId={item?.id} />
                  </View>
                );
              case ORDER_STATUS_ACT_CODE.WAIT_FOR_PAYMENT:
                return (
                  <View tabLabel={item.name} key={item.key}>
                    <WaitForPayment
                      status={item.key}
                      {...item}
                      statusId={item?.id}
                    />
                  </View>
                );
              default:
                return (
                  <View
                    tabLabel={item.title}
                    key={item.key}
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>{item.title}</Text>
                    <Text>{'ScrollableTabBar'}</Text>
                  </View>
                );
            }
          })}
        </ScrollableTabView>
      ) : (
        <Text>Ko co</Text>
      )}
    </View>
  );
};

TabOrders.defaultProps = {};

TabOrders.propTypes = {};

export default TabOrders;
