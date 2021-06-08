import React, {useState} from 'react';
import {Bag, Menu} from 'svg/common';
import {Dimensions, View, TouchableOpacity, Animated} from 'react-native';
import {Colors} from 'components';
import NewFeed from '../NewFeed';
import Order from '../Order';
import styles from './styles';
import ScrollableTabView from 'components/ForkReactNativeSrollableTabView';
import I18n from 'i18n';
import GridView from '../GridView';
import FullView from '../FullView';

const {height} = Dimensions.get('window').height;
const HEADER_HEIGHT = 0;

const TabViewContainer = ({navigation, style, scrollAnimated, viewType}) => {
  const RenderLabel = ({tabs, goToPage, activeTab}) => {
    const translateY = scrollAnimated.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[{...styles.tabs}, {transform: [{translateY}]}]}>
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
      </Animated.View>
    );
  };

  return (
    <ScrollableTabView
      style={[style]}
      tabBarUnderlineStyle={{backgroundColor: '#823FFD'}}
      tabBarActiveTextColor="#823FFD"
      initialPage={0}
      renderTabBar={() => <RenderLabel />}>
      <View style={{flex: 1}} tabLabel={'menu'}>
        <NewFeed navigation={navigation}>
          {viewType === 'grid' ? <GridView /> : <FullView />}
        </NewFeed>
      </View>
      <View style={{flex: 1, flexDirection:'column'}} tabLabel={'bag'}>
        <Order />
      </View>
    </ScrollableTabView>
  );
};

export default TabViewContainer;
