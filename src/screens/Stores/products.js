import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, FlatList, Dimensions} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import { isEmpty } from 'lodash'
import i18n from 'i18n'

import { Image } from 'components'

import styles from './styles'

const WIDTH = Dimensions.get('window').width
const WIDTH_IMG = 90
const HEIGHT_IMG = 120
const StoresProducts = ({products}) => {

  return (
    <FlatList
      data={products}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item, index }) => (
        <View 
          style={[styles.productWrap, {
            marginLeft: index === 0 ? 10 : null,
            marginRight: index === products.length - 1 ? 10 : null,
          }]}>
          <Image
            key={`productOfStore${item.id}`}
            source={
              item?.imageUrls?.length
                ? { uri: item?.imageUrls[0] }
                : require('assets/images/default.png')
            }
            resizeMode="cover"
            style={{ 
              height: HEIGHT_IMG, 
              width: WIDTH_IMG,
              borderRadius: 4,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text numberOfLines={2} style={styles.nameProduct}>{item?.name}</Text>
        </View>
        )}
      horizontal  
      onEndReached={() => {}}
      onEndReachedThreshold={0.5}
      initialNumToRender={10} 
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )
}

StoresProducts.defaultProps = {
}

StoresProducts.propTypes = {
}

export default StoresProducts
