/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useEffect, useState, useRef} from 'react';
import {View, ActivityIndicator, FlatList, Text, Animated} from 'react-native';
import {Colors} from 'components';
import Product from './Item.js';
import EmptyCart from '../EmptyCart';
import CardFooter from '../CardFooter';
import i18n from 'i18n';
import {CartEmpty} from 'svg/common';

const ListProduct = ({navigation, data}) => {
  const [refreshing, handleRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    handleRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    setProducts(data);
  }, [JSON.stringify(data)]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {};

  const renderFooter = () => {
    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {products.length > 0 ? (
        <>
          <View style={styles.wrapList}>
            <View style={styles.wrapBody}>
              <FlatList
                data={products}
                renderItem={({item}) => (
                  <Product navigation={navigation} item={item} />
                )}
                numColumns={1}
                keyExtractor={(item, index) => index}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onEndReached={() => handleLoadMore()}
                ListFooterComponent={renderFooter}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollEvent}
              />
            </View>
            <View style={styles.wrapFooter}>
              <CardFooter />
            </View>
          </View>
        </>
      ) : (
        <EmptyCart
          icon={<CartEmpty />}
          title={i18n.t('cart.notfound')}
          subTitle={i18n.t('cart.subNotFound')}
          buttonText={i18n.t('cart.shoppingNow')}
        />
      )}
    </View>
  );
};

ListProduct.defaultProps = {
  data: [
    {
      id: 231,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2345,
    },
    {
      id: 232,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
    {
      id: 233,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
    {
      id: 233,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
    {
      id: 233,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
    {
      id: 233,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
    {
      id: 233,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
    {
      id: 233,
      productImage:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      productName: 'Ao thum nam den ',
      productPrice: 99000,
      amount: 1,
      productSize: 'M',
      productColor: 'Den',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
  ],
};

ListProduct.propTypes = {};

export default ListProduct;
