/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import ScrollableTabView, {
  DefaultTabBar,
} from 'components/ForkReactNativeSrollableTabView';
import ProductSearchResult from './ProductSearchResult';
import StoreSearchResult from './StoreSearchResult';

const SearchResult = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <ScrollableTabView
          tabBarBackgroundColor="#FFFFFF"
          tabBarUnderlineStyle={{backgroundColor: '#823FFD', height: 4}}
          tabBarInactiveTextColor="#8B9399"
          tabBarActiveTextColor="#823FFD"
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}>
          <View
            style={{flex: 1}}
            tabLabel={i18n.t('Search.searchResultProduct')}>
            <ProductSearchResult navigation={navigation} />
          </View>
          <View style={{flex: 1}} tabLabel={i18n.t('Search.searchResultStore')}>
            <View style={styles.wrapContent}>
              <StoreSearchResult navigation={navigation} />
            </View>
          </View>
        </ScrollableTabView>
      </View>
    </>
  );
};

SearchResult.defaultProps = {};

SearchResult.propTypes = {};

export default SearchResult;
