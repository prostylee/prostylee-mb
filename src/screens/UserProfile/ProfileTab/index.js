/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import {ContainerView as Container, Colors} from 'components';

import MeTab from '../Me';
import StoreTab from '../Store';

import {Bag, Menu} from 'svg/common';

import styles from './styles';

const initialLayout = {width: Dimensions.get('window').width};

const ProfileTab = (props) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'me', title: ''},
    {key: 'store', title: ''},
  ]);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'me':
        return <MeTab index={index} jumpTo={jumpTo} />;
      case 'store':
        return <StoreTab index={index} jumpTo={jumpTo} />;
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
    <Container fluid style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </Container>
  );
};

ProfileTab.defaultProps = {};

ProfileTab.propTypes = {};

export default ProfileTab;
