import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as screens from './tabNavigators';

import {tabsSetting} from 'config/navigator';

import * as TabsIcon from 'svg/bottomTab';

import {commonSelectors, commonActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const BottomTabs = (props) => {
  const dispatch = useDispatch();
  const isFocusedMainTab = useSelector((state) =>
    commonSelectors.isFocusedMainTab(state),
  );

  const backBehavior = 'initialRoute';
  const {
    initialRouteName,
    tabBarColor,
    activeColor,
    inactiveColor,
  } = tabsSetting.configs;
  const {tabsNavigator} = tabsSetting;

  const SpecialIcon = ({children}) => {
    return (
      <View
        style={isFocusedMainTab ? styles.focusedIcon : styles.inFocusedIcon}>
        {children}
      </View>
    );
  };

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
        if (!Object.keys(screens).includes(tab.screen)) {
          return null;
        }
        return (
          <Tab.Screen
            key={'tabs' + tab.screen}
            name={tab.name}
            component={screens[tab.screen]}
            listeners={{
              tabPress: (e) => {
                // Prevent default action
                dispatch(commonActions.toggleFocusMainTab(!isFocusedMainTab));
                _i === 2 && e.preventDefault();
                _i === 2 && console.log('-----ONPRESSED POST SCREEN------');
              },
            }}
            options={{
              tabBarIcon: ({color}) => {
                if (tab?.isTurnOfLabel) {
                  let MainTabIcon = isFocusedMainTab
                    ? TabsIcon[tab.option.tabBarIconFocused]
                    : TabsIcon[tab.option.tabBarIcon];
                  return (
                    <SpecialIcon>
                      <MainTabIcon />
                    </SpecialIcon>
                  );
                }
                return <TabBarIcon color={color} size={28} />;
              },
              tabBarColor,
              title: tab?.isTurnOfLabel ? '' : tab.name,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = EStyleSheet.create({
  focusedIcon: {
    marginBottom: -15,
  },
  inFocusedIcon: {
    marginBottom: -35,
  },
});

export default BottomTabs;
