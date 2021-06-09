import React, {useEffect} from 'react';
import {View,  FlatList} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import ProductItem from '../../../ProductItem';

const data = [
  {
    id: 231,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Ao thum nam den ',
    price: 123000,
    priceSale: 99000,
    amount: 1,
    productSize: 'M',
    productColor: 'Den',
  },
  {
    id: 232,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Ao thum nam den ',
    price: 144000,
    priceSale: 97000,
    amount: 1,
    productSize: 'M',
    productColor: 'Den',
  },
  {
    id: 233,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Ao thum nam dài tay phối kiểu dọc Caro đen trắng basic ',
    price: 133000,
    priceSale: 79000,
    amount: 1,
    productSize: 'M',
    productColor: 'Den',
  },
];

const SoldTab = (props) => {
  // const loading = useSelector((state) => getSoldTabLoadingSelector(state));
  // const wishListList = useSelector((state) => getListSoldTabSelector(state));

  useEffect(() => {
    // dispatch(cartActions.getListSoldTab());
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => {
        return (
          <View style={styles.wrapProduct}>
            <ProductItem index={index} item={item} />
          </View>
        );
      }}
      numColumns={2}
      scrollEventThrottle={1}
      keyExtractor={(_, index) => `coordinated_product_${index}`}
      style={styles.listContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default SoldTab;
