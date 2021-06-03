import styles from './styles';

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {Waiting, Delivery, Done, Cancel} from './Tabs';

const routes = [
  {key: 'waiting', title: 'Chờ xác nhận'},
  {key: 'delivery', title: 'Đang giao hàng'},
  {key: 'done', title: 'Đã hoàn thành'},
  {key: 'inhouse', title: 'Mua tại cửa hàng'},
  {key: 'cancel', title: 'Đã huỷ'},
];

const TabOrders = ({navigation}) => {
  return (
    <View style={styles.container} isFullView>
      <ScrollableTabView
        tabBarActiveTextColor="#823FFD"
        tabBarUnderlineStyle={{backgroundColor: '#823FFD'}}
        renderTabBar={() => <ScrollableTabBar />}>
        {routes.map((item, index) => {
          switch (item.key) {
            case 'waiting':
              return (
                <View tabLabel={item.title} key={item.key}>
                  <Waiting status={item.key} />
                </View>
              );
            case 'delivery':
              return (
                <View tabLabel={item.title} key={item.key}>
                  <Delivery status={item.key} />
                </View>
              );
            case 'done':
              return (
                <View tabLabel={item.title} key={item.key}>
                  <Done status={item.key} />
                </View>
              );
            case 'cancel':
              return (
                <View tabLabel={item.title} key={item.key}>
                  <Cancel status={item.key} />
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
    </View>
  );
};

TabOrders.defaultProps = {};

TabOrders.propTypes = {};

export default TabOrders;
