import styles from './styles';
import React from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, Text, Image, FlatList} from 'react-native';
import i18n from 'i18n';
import {currencyFormat} from 'utils/currency';
import {Heart, HeartFill} from 'svg/common';
import {CURRENCY_VIET_NAM} from 'constants';

import {getListRecentSelector} from 'redux/selectors/cart';
import {useNavigation} from '@react-navigation/native';

const ProductSimilar = (props) => {
  const navigation = useNavigation();
  const imagesRef = React.useRef();
  //const selectItem = props.onSelect ? props.onSelect : () => {};

  //const loading = useSelector((state) => getRecentLoadingSelector(state));
  const recentList = useSelector((state) => getListRecentSelector(state));

  if (recentList && !recentList.length) {
    return null;
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => {
          navigation.navigate('ProductDetail', {id: item.id});
        }}>
        <Image
          style={styles.relatedImage}
          resizeMode={'cover'}
          source={{uri: item.imageUrls[0]}}
        />
        <Text style={styles.relatedName} numberOfLines={2}>
          {item.name || ''}
        </Text>
        <View style={styles.relatedInfo}>
          <View style={styles.relatedPriceGroup}>
            <Text style={styles.relatedPriceSale}>
              {currencyFormat(item?.priceSale || 0, CURRENCY_VIET_NAM)}
            </Text>
            <Text style={styles.relatedPrice}>
              {currencyFormat(item?.price || 0, CURRENCY_VIET_NAM)}
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
        <Text style={styles.title}>{i18n.t('cart.similarProduct')}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.carouselContainer}
        ref={imagesRef}
        keyExtractor={(item, index) => item?.id || index}
        data={recentList}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.993}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        snapToInterval={144}
        renderItem={renderItem}
        getItemLayout={(_, index) => {
          return {length: 144, offset: 144 * index, index};
        }}
      />
    </View>
  );
};

ProductSimilar.defaultProps = {};

export default ProductSimilar;
