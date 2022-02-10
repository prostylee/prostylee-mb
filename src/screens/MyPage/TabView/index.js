import styles from './styles';
import React, {useState} from 'react';
import {Bag, Menu, Heart, BookMark} from 'svg/common';
import {View, Dimensions} from 'react-native';
import Order from '../Order';
import {TabView, TabBar} from 'react-native-tab-view';

import {ContainerView as Container} from 'components';

import GridView from '../GridView';
import {
  getListProductSaleSelector,
  getListProductLikedSelector,
  getListProductSavedSelector,
} from 'redux/selectors/myPage';
import {useSelector} from 'react-redux';

const initialLayout = {width: Dimensions.get('window').width};

const TabViewContainer = ({style}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'menu', title: ''},
    {key: 'bag', title: ''},
    {key: 'like', title: ''},
    {key: 'save', title: ''},
  ]);
  const productByUser = useSelector((state) =>
    getListProductSaleSelector(state),
  );
  const productLikeByUser = useSelector((state) =>
    getListProductLikedSelector(state),
  );
  const productSaveByUser = useSelector((state) =>
    getListProductSavedSelector(state),
  );

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'menu':
        return <GridView index={index} jumpTo={jumpTo} />;
      case 'bag':
        return (
          <Order index={index} jumpTo={jumpTo} productList={productByUser} />
        );
      case 'like':
        return (
          <Order
            index={index}
            jumpTo={jumpTo}
            productList={productLikeByUser}
          />
        );
      case 'save':
        return (
          <Order
            index={index}
            jumpTo={jumpTo}
            productList={productSaveByUser}
          />
        );
      default:
        return <GridView index={index} jumpTo={jumpTo} />;
    }
  };
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
  const renderLabel = ({route, focused, color}) => {
    return (
      <View style={styles.labelWrapper}>{renderItem(route.key, focused)}</View>
    );
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      renderLabel={renderLabel}
    />
  );

  return (
    <Container fluid style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        lazy
      />
    </Container>
  );
};

export default TabViewContainer;
