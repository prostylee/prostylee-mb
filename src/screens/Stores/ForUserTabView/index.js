import React from 'react';
import {View} from 'react-native';
import styles from './style';
import ProductList from './ProductList';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Colors} from 'components';

const ForUserTabView = () => {
  return (
    <View style={styles.contaner}>
      <ScrollableTabView
        tabBarBackgroundColor={Colors?.[`$white`]}
        tabBarActiveTextColor={Colors?.['$purple']}
        tabBarInactiveTextColor={Colors?.['$gray']}
        tabBarUnderlineStyle={{borderColor: Colors?.[`$white`]}}>
        <ProductList />
        <ProductList />
        <ProductList />
      </ScrollableTabView>
    </View>
  );
};
export default ForUserTabView;
