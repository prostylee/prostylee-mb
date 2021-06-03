import React, {useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {Bag, Menu} from 'svg/common';
import {Dimensions, View} from 'react-native';
import {Colors} from 'components';
import NewFeed from '../NewFeed';
import Order from '../Order';
import styles from './styles';

const initialLayout = {width: Dimensions.get('window').width};

const TabViewContainer = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'me', title: ''},
    {key: 'store', title: ''},
  ]);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'me':
        return <NewFeed index={index} jumpTo={jumpTo} />;
      case 'store':
        return <Order index={index} jumpTo={jumpTo} />;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      renderLabel={renderLabel}
    />
  );
  
  const renderLabel = ({route, focused, color}) => {
    const renderColor = focused ? Colors.$purple : Colors.$icon;
    return (
      <View style={styles.labelWrapper}>
        {route.key === routes[0].key ? (
          <Menu color={renderColor} />
        ) : (
          <Bag color={renderColor} />
        )}
      </View>
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
}

export default TabViewContainer;