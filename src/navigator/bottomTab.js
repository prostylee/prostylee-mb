import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as screens from './tabNavigators';

import {tabsSetting} from 'config/navigator';

import * as TabsIcon from 'svg/bottomTab';

const SpecialIcon = (props) => {
  return <View style={styles.specialIcon}>{props.children}</View>;
};

const Tab = createBottomTabNavigator();
const BottomTabs = (props) => {
  const lang = 'en';

  const backBehavior = 'initialRoute';
  const {
    initialRouteName,
    tabBarColor,
    activeColor,
    inactiveColor,
  } = tabsSetting.configs;
  const {tabsNavigator} = tabsSetting;

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      backBehavior={backBehavior}
      shifting={true}
      tabBarOptions={{
        activeTintColor: activeColor,
        inactiveTintColor: inactiveColor,
      }}
      sceneAnimationEnabled={true}>
      {tabsNavigator.map((tab, _i) => {
        const TabBarIcon = TabsIcon[tab.option.tabBarIcon];
        const TabBarIconSolid = TabsIcon[tab.option.tabBarIconSolid];
        if (!Object.keys(screens).includes(tab.screen)) {
          return null;
        }
        return (
          <Tab.Screen
            key={'tabs' + tab.screen}
            name={tab.name[lang]}
            component={screens[tab.screen]}
            options={{
              tabBarIcon: ({focused, color}) => {
                if (tab?.isTurnOfLabel) {
                  return (
                    <SpecialIcon>
                      <TabBarIcon />
                    </SpecialIcon>
                  );
                }
                return !focused ? (
                  <TabBarIcon color={color} size={28} />
                ) : (
                  <TabBarIconSolid color={color} size={28} />
                );
              },
              tabBarColor,
              title: tab?.isTurnOfLabel ? '' : tab.name[lang],
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = EStyleSheet.create({
  specialIcon: {
    marginBottom: -35,
  },
});

export default BottomTabs;
