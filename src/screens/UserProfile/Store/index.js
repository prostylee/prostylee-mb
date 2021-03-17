/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  ContainerView as Container,
  Colors,
  ImageAnimated as Image,
} from 'components';

import ProductItem from 'components/ProductItem';

import styles from './styles';

const {width} = Dimensions.get('window');

const data = [
  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8KWxUV3Zf1Suk3SJqJaDIkJAzH4yeFdLQg&usqp=CAU',
    name: 'Áo nỉ hoodie trơn đủ màu unisex',
    price: 9900000,
  },
  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8KWxUV3Zf1Suk3SJqJaDIkJAzH4yeFdLQg&usqp=CAU',
    name: 'Áo nỉ hoodie trơn đủ màu unisex',
    price: 9900000,
  },
  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8KWxUV3Zf1Suk3SJqJaDIkJAzH4yeFdLQg&usqp=CAU',
    name: 'Áo nỉ hoodie trơn đủ màu unisex',
    price: 9900000,
  },
  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8KWxUV3Zf1Suk3SJqJaDIkJAzH4yeFdLQg&usqp=CAU',
    name: 'Áo nỉ hoodie trơn đủ màu unisex',
    price: 9900000,
  },

  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8KWxUV3Zf1Suk3SJqJaDIkJAzH4yeFdLQg&usqp=CAU',
    name: 'Áo nỉ hoodie trơn đủ màu unisex',
    price: 9900000,
  },
];

const StoreTab = ({column, wImage, hImage}) => {
  const loadMoreLoading = false;

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
    <Container fluid style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        key={column}
        numColumns={column}
        columnWrapperStyle={styles.viewCol}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item, index) => 'profileMeTab' + index}
        data={data}
        renderItem={({item}) => <ProductItem item={item} />}
        // onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={renderFooter}
        // refreshing={refreshing}
        // onRefresh={handleRefresh}
      />
    </Container>
  );
};

StoreTab.defaultProps = {
  column: 2,
  wImage: (width - 48) / 2,
  hImage: (width - 48) / 2,
};

StoreTab.propTypes = {};

export default StoreTab;
