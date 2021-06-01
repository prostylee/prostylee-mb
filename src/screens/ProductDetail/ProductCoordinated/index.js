import React from 'react';
import {View, TouchableOpacity, Text, Dimensions, FlatList} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import Carousel from 'react-native-snap-carousel';
import {currencyFormat} from 'utils/currency';
import {Heart, HeartFill} from 'svg/common';
import {useDispatch} from 'react-redux';
import {productActions} from 'reducers';
import ProductItem from './ProductItem';

import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {BookMark} from 'svg/common';

const {width: WIDTH} = Dimensions.get('window');

const ProductSimilar = (props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const imagesRef = React.useRef();
  const listProduct = props.data ? props.data : [];
  const selectItem = props.onSelect ? props.onSelect : () => {};
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {i18n.t('productDetail.productCoordinated')}
        </Text>
      </View>
      <FlatList
        data={listProduct}
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
        // refreshing={refreshing}
        // onRefresh={handleRefresh}
        // onEndReached={() => handleLoadMore()}
        // ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductSimilar;
