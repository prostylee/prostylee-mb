/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {View, ActivityIndicator, FlatList, Animated, Text} from 'react-native';
import {Colors} from 'components';
import Product from './Item';
import EmptyCart from '../EmptyCart';
import CardFooter from '../CardFooter';
import i18n from 'i18n';
import CardAddress from '../CardAddress';
import {CartEmpty} from 'svg/common';
import {List} from 'react-native-paper';
import {currencyFormat} from 'utils/currency';

const ListProduct = ({navigation, data}) => {
  const [refreshing, handleRefreshing] = useState(false);

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    handleRefreshing(false);
  }, [refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {};

  const renderFooter = () => {
    return (
      <>
        <View style={styles.wrapAccordion}>
          <List.Accordion
            title="Phương thức vận chuyển"
            left={(props) => <List.Icon {...props} icon="folder" />}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </View>
        <View style={styles.wrapTotal}>
          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>Tổng tiền hàng</Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(9999999, 'đ')}
              </Text>
            </View>
          </View>
          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>Phí vận chuyển</Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(9999999, 'đ')}
              </Text>
            </View>
          </View>

          <View style={styles.rowTotal}>
            <View style={styles.colLabelTotal}>
              <Text style={styles.labelTotal}>Mã giảm giá</Text>
            </View>
            <View style={styles.colValueTotal}>
              <Text style={styles.valueTotal}>
                {currencyFormat(9999999, 'đ')}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        </View>
      </>
    );
  };

  /* Extract note */
  const groupDataByStore = (list) => {
    return list.reduce((acc, product) => {
      const foundIndex = acc.findIndex(
        (element) => element.key === product.storeId,
      );
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            key: product.storeId,
            storeName: product.storeName,
            storeAvatar: product.storeAvatar,
            data: [product],
          },
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, product];
      return acc;
    }, []);
  };

  const renderHeader = () => {
    return <CardAddress />;
  };

  const groupData = useMemo(
    () => groupDataByStore(data),
    [JSON.stringify(data)],
  );

  return (
    <View style={styles.container}>
      {Object.keys(groupData).length > 0 ? (
        <>
          <View style={styles.wrapList}>
            <View style={styles.wrapBody}>
              <FlatList
                data={groupData}
                ListHeaderComponent={renderHeader()}
                renderItem={({item}) => (
                  <Product navigation={navigation} product={item} />
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
          </View>
          <View style={styles.wrapFooter}>
            <CardFooter navigation={navigation} />
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
      productColor: 'black',
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
      productColor: 'black',
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
      productColor: 'black',
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
      productColor: 'white',
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
      productColor: 'black',
      storeName: 'Store',
      storeAvatar:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      storeId: 2346,
    },
  ],
};

ListProduct.propTypes = {};

export default ListProduct;
