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
import {CartEmpty, DeliveryIcon, DownIcon, RightIcon} from 'svg/common';
import {currencyFormat} from 'utils/currency';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';

const deliveries = [
  {label: 'Grab', content: 'Nhận hàng vào 29-12 đến 31-12', value: 25000},
  {label: 'Viettel Post', content: 'Nhận hàng trong ngày', value: 45000},
  {label: 'VN Express', content: 'Nhận hàng trong ngày', value: 35000},
  {label: 'Giao hàng tiết kiệm', content: 'Nhận hàng trong ngày', value: 30000},
  {
    label: 'Tự lấy hàng',
    content: 'Bạn có thể tự đến lấy hàng tại địa chỉ của người bán.',
    value: 0,
  },
];

const ListProduct = ({navigation, data}) => {
  const [refreshing, handleRefreshing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [valueDelivery, setValueDelivery] = useState();

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

  const onChangeDelivery = (vl) => {
    setValueDelivery(vl);
    setCollapsed(true);
  };

  const renderFooter = () => {
    return (
      <>
        <View style={styles.wrapAccordion}>
          <TouchableOpacity
            style={styles.buttonCollapseHeader}
            onPress={() => setCollapsed(!collapsed)}>
            <View style={styles.wrapCollapseHeader}>
              <DeliveryIcon />
              <Text style={styles.titleCollapseHeader}>
                &nbsp;Phương thức vận chuyển
              </Text>
            </View>
            <View>{collapsed ? <DownIcon /> : <RightIcon />}</View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed}>
            <RadioButton.Group
              onValueChange={onChangeDelivery}
              value={valueDelivery}
              color="#823ffd"
              style={styles.wrapRadioGroup}>
              {listDelivery?.length > 0 &&
                listDelivery.map((item) => (
                  <RadioButton.Item
                    key={item.value}
                    label={renderDelivery(item)}
                    value={item.value}
                    color="#823ffd"
                    style={styles.wrapRadioButton}
                  />
                ))}
            </RadioButton.Group>
          </Collapsible>
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

  const renderDelivery = (item) => {
    return (
      <View style={styles.wrapRadio}>
        <View style={styles.wrapInfo}>
          <View>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
          </View>
          <View style={styles.wrapPrice}>
            <Text style={styles.priceRadio}>
              {item.value ? currencyFormat(item.value, 'đ') : 'Miễn phí'}
            </Text>
          </View>
        </View>

        <View style={styles.wrapRadioContent}>
          <Text style={styles.contentRadio}>{item.content}</Text>
        </View>
      </View>
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

  const listDelivery = useMemo(() => deliveries, [JSON.stringify(deliveries)]);

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
