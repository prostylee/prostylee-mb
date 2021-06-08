import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import ProductList from './ProductList';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'components/ForkReactNativeSrollableTabView';
import {Colors} from 'components';

const ForUserTabView = ({navigation}) => {
  return (
    <View style={styles.contaner}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dành riêng cho bạn</Text>
      </View>
      <ScrollableTabView
        tabBarBackgroundColor={Colors?.[`$white`]}
        tabBarActiveTextColor={Colors?.['$purple']}
        tabBarUnderlineStyle={{backgroundColor: Colors?.[`$purple`], height: 2}}
        tabBarInactiveTextColor={Colors?.['$lightGray']}
        tabBarTextStyle={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        locked={false}>
        <ProductList navigation={navigation} tabLabel="Tất cả" />
        <ProductList navigation={navigation} tabLabel="🔥 Deal Hot" />
        <ProductList navigation={navigation} tabLabel="Thời trang nam" />
        <ProductList navigation={navigation} tabLabel="Giày dép" />
      </ScrollableTabView>
    </View>
  );
};
export default ForUserTabView;
