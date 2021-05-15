/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';

import styles from './styles';
import {Colors} from 'components';
import CategoriesRightItem from './item.js';

const RightCategories = () => {
  const loading = false;
  const loadMoreLoading = false;
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {id: i, src: 'http://placehold.it/200x200?text=' + (i + 1)};
    });
    setDataSource(items);
  }, []);

  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => <CategoriesRightItem item={item} />}
        numColumns={3}
        keyExtractor={(item, index) => index}
        ListFooterComponent={renderFooter}
        style={{borderRadius: 8}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

RightCategories.defaultProps = {};

RightCategories.propTypes = {};

export default RightCategories;
