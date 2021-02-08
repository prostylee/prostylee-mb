import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as screens from './tabNavigators'

import { tabsSetting } from 'config/navigator'

import * as TabsIcon from 'svg/bottomTab'

const Tab = createBottomTabNavigator()
const BottomTabs = (props) => {
  const lang = 'en'

  const backBehavior = "initialRoute"
  const { initialRouteName, tabBarColor, activeColor, inactiveColor} = tabsSetting.configs
  const { tabsNavigator } = tabsSetting

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      backBehavior={backBehavior}
      shifting={true}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      sceneAnimationEnabled={true}
    >
      {
        tabsNavigator.map((tab, _i) => {
          const TabBarIcon = TabsIcon[tab.option.tabBarIcon]
          if (!Object.keys(screens).includes(tab.screen)) return null
          return (
            <Tab.Screen
              key={'tabs' + tab.screen}
              name={tab.name[lang]}
              component={screens[tab.screen]}
              options={{
                tabBarIcon: ({ color }) => (
                  <TabBarIcon color={color} size={28} />
                ),
                tabBarColor,
              }}
            />
          )
        })
      }
    </Tab.Navigator>
  )
}

export default BottomTabs
