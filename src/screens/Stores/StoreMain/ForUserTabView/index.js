import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import ProductList from './ProductList';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {Colors} from 'components';

const ForUserTabView = () => {
  return (
    <View style={styles.contaner}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dành cho bạn</Text>
      </View>
      <ScrollableTabView
        tabBarBackgroundColor={Colors?.[`$white`]}
        tabBarActiveTextColor={Colors?.['$purple']}
        tabBarUnderlineStyle={{backgroundColor: Colors?.[`$purple`], height: 2}}
        tabBarInactiveTextColor={Colors?.['$lightGray']}
        tabBarTextStyle={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}
        initialPage={0}
        renderTabBar={() => <DefaultTabBar />}>
        <ProductList tabLabel="Tất cả" />
        <ProductList tabLabel="🔥 Deal Hot" />
        <ProductList tabLabel="Thời trang nam" />
        <ProductList tabLabel="Giày dép" />
      </ScrollableTabView>
    </View>
  );
};
export default ForUserTabView;
