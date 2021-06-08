import React, {useState} from 'react';
import {Bag, Menu} from 'svg/common';
import {Dimensions, View, TouchableOpacity} from 'react-native';
import {Colors} from 'components';
import NewFeed from '../NewFeed';
import Order from '../Order';
import styles from './styles';
import ScrollableTabView from 'components/ForkReactNativeSrollableTabView';
import I18n from 'i18n';
import GridView from '../GridView';
import FullView from '../FullView';

const {height} = Dimensions.get('window').height;

const TabViewContainer = ({navigation, style}) => {
  const RenderLabel = ({tabs, goToPage, activeTab}) => {
    return (
      <View style={styles.tabs}>
        {tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => goToPage(i)}
              style={[styles.tab, activeTab == i ? styles.activeTab : null]}>
              {tab == 'menu' ? (
                <Menu color={activeTab == i ? '#823FFD' : '#8B9399'} />
              ) : (
                <Bag color={activeTab == i ? '#823FFD' : '#8B9399'} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollableTabView
      style={[style]}
      tabBarUnderlineStyle={{backgroundColor: '#823FFD'}}
      tabBarActiveTextColor="#823FFD"
      initialPage={0}
      renderTabBar={() => <RenderLabel />}>
      <View
        style={{flex: 1, padding: 10, paddingBottom: 100}}
        tabLabel={'menu'}>
        <NewFeed navigation={navigation}>
          <GridView />
        </NewFeed>
      </View>
      <View style={{flex: 1, padding: 10}} tabLabel={'bag'}>
        <Order />
      </View>
    </ScrollableTabView>
  );
};

export default TabViewContainer;
