import styles from './styles';
import React, {useRef, useMemo} from 'react';
import {FlatList, Text, Animated, View} from 'react-native';
import i18n from 'i18n';
import {
  Info,
  Tracking,
  UserInfo,
  Payment,
  Delivery,
  Summary,
  Footer,
} from '../CardDetail';
import Product from '../../ProductItem';
import {currencyFormat} from 'utils/currency';

const data = [
  {
    brandId: 1,
    brandResponse: {
      description: 'Adidas brand',
      icon: 'https://psmedia224241-staging.s3-ap-southeast-1.amazonaws.com/public/27c3092c-9f1b-49eb-ba68-ab3f091d1347/brand/adidas.png',
      id: 1,
      name: 'Adidas',
    },
    productSize: 'L',
    productColor: 'black',
    amount: 1,
    description: 'Áo thun nam cổ trụ hàn quốc 3',
    id: 134,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Áo thun nam cổ trụ hàn quốc 10',
    price: 150000,
    priceSale: 140000,
    productOwnerResponse: {
      id: 1,
      logoUrl:
        'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/90x120/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/DA571D52-3333-4BEF-BA32-3830B6EF5617.jpg',
      name: 'Store',
    },
    storeId: 1,
  },
  {
    brandId: 1,
    brandResponse: {
      description: 'Adidas brand',
      icon: 'https://psmedia224241-staging.s3-ap-southeast-1.amazonaws.com/public/27c3092c-9f1b-49eb-ba68-ab3f091d1347/brand/adidas.png',
      id: 1,
      name: 'Adidas',
    },
    productSize: 'L',
    productColor: 'black',
    amount: 2,
    description: 'Áo thun nam cổ trụ hàn quốc 3',
    id: 135,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Áo thun nam cổ trụ hàn quốc 10',
    price: 150000,
    priceSale: 140000,
    productOwnerResponse: {
      id: 1,
      logoUrl:
        'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/90x120/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/DA571D52-3333-4BEF-BA32-3830B6EF5617.jpg',
      name: 'Store',
    },
    storeId: 1,
  },
];

const ListDetail = ({navigation, dealData}) => {
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );
  /* Extract note */
  const groupDataByStore = (list) => {
    return list.reduce((acc, product) => {
      const {storeId, productOwnerResponse, id} = product;
      const foundIndex = acc.findIndex((element) => element.key === storeId);
      if (foundIndex === -1) {
        return [
          ...acc,
          {
            key: storeId,
            storeName: productOwnerResponse.name,
            storeAvatar: productOwnerResponse.logoUrl,
            id: id,
            data: [product],
          },
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, product];
      return acc;
    }, []);
  };

  const groupData = useMemo(
    () => groupDataByStore(data),
    [JSON.stringify(data)],
  );

  const renderHeader = () => {
    return (
      <>
        <View style={styles.wrapItem}>
          <Info dealData={dealData} />
        </View>
        <View style={styles.wrapItem}>
          <Tracking />
        </View>
        <View style={styles.wrapItem}>
          <UserInfo />
        </View>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <View style={{...styles.wrapItem, marginTop: 10}}>
          <Payment />
        </View>
        <View style={styles.wrapItem}>
          <Delivery />
        </View>
        <View style={styles.wrapItem}>
          <Summary />
        </View>
        <View style={styles.wrapItemFooter}>
          <Footer dealData={dealData} />
        </View>
      </>
    );
  };

  const renderFooterProduct = () => {
    return (
      <View style={styles.wrapFooterItem}>
        <View style={styles.colCountFooter}>
          <Text style={styles.labelCountFooter}>
            {i18n.t('orders.countProduct', {count: data.length})}
          </Text>
        </View>
        <View style={styles.colTotalFooter}>
          <Text style={styles.labelTotalFooter}>
            {currencyFormat(999999, 'đ')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groupData}
        renderItem={({item}) => (
          <Product navigation={navigation} product={item}>
            {renderFooterProduct()}
          </Product>
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollEvent}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

ListDetail.defaultProps = {
  dealData: {},
};

ListDetail.propTypes = {};

export default ListDetail;
