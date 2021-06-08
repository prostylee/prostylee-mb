import styles from './styles';

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {Sale, Sold} from './Tabs';

const routes = [
  {key: 'sale', title: 'Đang bán'},
  {key: 'sold', title: 'Đã bán'},
];

const TabSold = ({navigation, status}) => {
  console.log('status', status);
  return (
    <View style={styles.container}>
      <ScrollableTabView
        tabBarActiveTextColor="#823FFD"
        tabBarUnderlineStyle={{backgroundColor: '#823FFD'}}
        initialPage={routes.findIndex((item) => item.key === status)}
        renderTabBar={() => <ScrollableTabBar />}>
        {routes.map((item, index) => {
          switch (item.key) {
            case 'sale':
              return (
                <View tabLabel={item.title} key={item.key}>
                  <Sale status={item.key} />
                </View>
              );
            case 'sold':
              return (
                <View tabLabel={item.title} key={item.key}>
                  <Sold status={item.key} />
                </View>
              );
            default:
              return (
                <View tabLabel={item.title} key={item.key}>
                  <Sale status={item.key} />
                </View>
              );
          }
        })}
      </ScrollableTabView>
    </View>
  );
};

TabSold.defaultProps = {};

TabSold.propTypes = {};

export default TabSold;
