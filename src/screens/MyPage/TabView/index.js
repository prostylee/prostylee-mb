import styles from './styles';
import React from 'react';
import {Bag, Menu, Heart, BookMark} from 'svg/common';
import {View, TouchableOpacity} from 'react-native';
import Order from '../Order';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import GridView from '../GridView';
import {
  getListProductSaleSelector,
  getListProductLikedSelector,
  getListProductSavedSelector,
} from 'redux/selectors/myPage';
import {useSelector} from 'react-redux';

const TabViewContainer = ({style}) => {
  const productByUser = useSelector((state) =>
    getListProductSaleSelector(state),
  );
  const productLikeByUser = useSelector((state) =>
    getListProductLikedSelector(state),
  );
  const productSaveByUser = useSelector((state) =>
    getListProductSavedSelector(state),
  );
  const renderItem = (name, active) => {
    switch (name) {
      case 'menu':
        return <Menu color={active ? '#823FFD' : '#8B9399'} />;
      case 'bag':
        return <Bag color={active ? '#823FFD' : '#8B9399'} />;
      case 'like':
        return <Heart color={active ? '#823FFD' : '#8B9399'} />;
      case 'save':
        return <BookMark color={active ? '#823FFD' : '#8B9399'} />;
      default:
        return <Menu color={active ? '#823FFD' : '#8B9399'} />;
    }
  };
  const RenderLabel = ({tabs, goToPage, activeTab}) => {
    return (
      <View style={styles.tabs}>
        {tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                goToPage(i);
              }}
              style={[styles.tab, activeTab == i ? styles.activeTab : null]}>
              {renderItem(tab, activeTab == i)}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollableTabView
      tabBarUnderlineStyle={{backgroundColor: '#823FFD'}}
      tabBarActiveTextColor="#823FFD"
      initialPage={0}
      renderTabBar={() => <RenderLabel />}>
      <View style={{flex: 1}} tabLabel={'menu'}>
        <GridView />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}} tabLabel={'bag'}>
        <Order productList={productByUser} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}} tabLabel={'like'}>
        <Order productList={productLikeByUser} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}} tabLabel={'save'}>
        <Order productList={productSaveByUser} />
      </View>
    </ScrollableTabView>
  );
};

export default TabViewContainer;
