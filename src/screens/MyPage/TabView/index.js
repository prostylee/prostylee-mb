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
  const [listLayout, setListLayout] = useState({});
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
  const renderScene = (props) => {
    const jumpTo = props.jumpTo;
    const route = props.route;
    switch (route.key) {
      case 'menu':
        return (
          <View
            onLayout={({nativeEvent: {layout}}) => {
              if (layout.height && !Object.keys(listLayout)?.includes('menu')) {
                setListLayout((prev) => ({
                  ...prev,
                  ['menu']: layout.height,
                }));
              } else if (
                layout.height &&
                Object.keys(listLayout)?.includes('menu') &&
                layout.height > listLayout['menu']
              ) {
                setListLayout((prev) => ({
                  ...prev,
                  ['menu']: layout.height,
                }));
              }
            }}>
            <GridView index={index} jumpTo={jumpTo} />
          </View>
        );
      case 'bag':
        return (
          <View
            onLayout={({nativeEvent: {layout}}) => {
              if (layout.height && !Object.keys(listLayout)?.includes('bag')) {
                setListLayout((prev) => ({
                  ...prev,
                  ['bag']: layout.height,
                }));
              } else if (
                layout.height &&
                Object.keys(listLayout)?.includes('bag') &&
                layout.height > listLayout['bag']
              ) {
                setListLayout((prev) => ({
                  ...prev,
                  ['bag']: layout.height,
                }));
              }
            }}>
            <Order index={index} jumpTo={jumpTo} productList={productByUser} />
          </View>
        );
      case 'like':
        return (
          <View
            onLayout={({nativeEvent: {layout}}) => {
              if (layout.height && !Object.keys(listLayout)?.includes('like')) {
                setListLayout((prev) => ({
                  ...prev,
                  ['like']: layout.height,
                }));
              } else if (
                layout.height &&
                Object.keys(listLayout)?.includes('like') &&
                layout.height > listLayout['like']
              ) {
                setListLayout((prev) => ({
                  ...prev,
                  ['like']: layout.height,
                }));
              }
            }}>
            <Order
              index={index}
              jumpTo={jumpTo}
              productList={productLikeByUser}
            />
          </View>
        );
      case 'save':
        return (
          <View
            onLayout={({nativeEvent: {layout}}) => {
              if (layout.height && !Object.keys(listLayout)?.includes('save')) {
                setListLayout((prev) => ({
                  ...prev,
                  ['save']: layout.height,
                }));
              } else if (
                layout.height &&
                Object.keys(listLayout)?.includes('save') &&
                layout.height > listLayout['save']
              ) {
                setListLayout((prev) => ({
                  ...prev,
                  ['save']: layout.height,
                }));
              }
            }}>
            <Order
              index={index}
              jumpTo={jumpTo}
              productList={productSaveByUser}
            />
          </View>
        );
      default:
        return <GridView index={index} jumpTo={jumpTo} />;
    }
  };
  const getContainerHeight = () => {
    switch (index) {
      case 0:
        return listLayout['menu'] ? listLayout['menu'] + 40 : null;
      case 1:
        return listLayout['bag'] ? listLayout['bag'] + 40 : null;
      case 2:
        return listLayout['like'] ? listLayout['like'] + 40 : null;
      case 3:
        return listLayout['save'] ? listLayout['save'] + 40 : null;
      default:
        return 'auto';
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
    <Container
      fluid
      style={[styles.container, {height: getContainerHeight() || 'auto'}]}>
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
