import React from 'react';
import {View, TouchableOpacity, Text, Dimensions, Image} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import Carousel from 'react-native-snap-carousel';
import {currencyFormat} from 'utils/currency';
import {Heart, HeartFill} from 'svg/common';
import {useDispatch} from 'react-redux';
import {productActions} from 'reducers';

import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {BookMark} from 'svg/common';

const {width: WIDTH} = Dimensions.get('window');

const ProductSimilar = (props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const imagesRef = React.useRef();
  const data = props.data ? props.data : [];
  const selectItem = props.onSelect ? props.onSelect : () => {};

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => {
          selectItem(item.id);
        }}>
        <Image
          style={styles.relatedImage}
          resizeMode={'cover'}
          source={{uri: item.imageUrls[0]}}
        />
        <Text style={styles.relatedName}>{item.name || ''}</Text>
        <View style={styles.relatedInfo}>
          <View style={styles.relatedPriceGroup}>
            <Text style={styles.relatedPriceSale}>
              {currencyFormat(item?.priceSale || 0, 'đ')}
            </Text>
            <Text style={styles.relatedPrice}>
              {currencyFormat(item?.price || 0, 'đ')}
            </Text>
          </View>
          <View style={styles.likeButton}>
            <TouchableOpacity style={styles.likeButtonStyle}>
              {item.likeStatusOfUserLogin ? <HeartFill /> : <Heart />}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {i18n.t('cart.similarProduct')}
        </Text>
      </View>
      <Carousel
        ref={imagesRef}
        data={data}
        activeSlideAlignment={'start'}
        renderItem={renderItem}
        sliderWidth={144 * data.length}
        itemWidth={144}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        containerCustomStyle={styles.carouselContainer}
        // onSnapToItem={(index) => setActiveImage(index + 1)}
      />
      {/* <FlatList
        data={listProduct}
        horizontal
        renderItem={({item, index}) => {
          return (
            <View style={styles.wrapProduct}>
              <ProductItem index={index} item={item} />
            </View>
          );
        }}
        numColumns={2}
        onScroll={onScrollEvent}
        scrollEventThrottle={1}
        keyExtractor={(item, index) => index}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={() => handleLoadMore()}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      /> */}
    </View>
  );
};

ProductSimilar.defaultProps = {
  data: [
    {
      id: 231,
      imageUrls: [
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      ],
      name: 'Ao thum nam den ',
      priceSale: 99000,
      price: 100000,
      likeStatusOfUserLogin: true,
    },
    {
      id: 232,
      imageUrls: [
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      ],
      name: 'Ao thum nam den ',
      priceSale: 99000,
      price: 100000,
      likeStatusOfUserLogin: true,
    },
    {
      id: 231,
      imageUrls: [
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      ],
      name: 'Ao thum nam den ',
      priceSale: 99000,
      price: 100000,
      likeStatusOfUserLogin: true,
    },
    {
      id: 233,
      imageUrls: [
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      ],
      name: 'Ao thum nam den ',
      priceSale: 99000,
      price: 100000,
      likeStatusOfUserLogin: true,
    },
  ],
};

export default ProductSimilar;
