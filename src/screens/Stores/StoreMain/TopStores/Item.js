import React from 'react';
import {
  Dimensions,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import {ThemeView, Image} from 'components';
import {Avatar} from 'react-native-paper';
import i18n from 'i18n';
import styles from './styles';
import RootNavigator from '../../../../navigator/rootNavigator';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMG = 120;
const HEIGHT_IMG = (WIDTH_IMG * 3) / 2;

const Item = ({item, style}) => {
  const products = item?.products;
  const firstProduct = products?.length ? products[0] : null;

  const goToStore = () => {
    RootNavigator.navigate('StoreProfileMain', {storeId: item.id});
  };

  return (
    <ThemeView colorSecondary style={[styles.itemContainer, style && style]}>
      <TouchableOpacity onPress={goToStore}>
        <View style={styles.itemWrapper}>
          <Image
            source={
              firstProduct?.imageUrl
                ? {uri: firstProduct.imageUrl}
                : require('assets/images/default.png')
            }
            resizeMode="cover"
            style={{
              width: WIDTH_IMG,
              height: HEIGHT_IMG,
              borderRadius: 8,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={styles.imageContainer}>
            <Avatar.Image
              source={
                item.logoUrl
                  ? {uri: item.logoUrl}
                  : require('assets/images/default.png')
              }
              size={50}
              rounded
              containerStyle={styles.image}
            />
          </View>
        </View>
      </TouchableOpacity>
    </ThemeView>
  );
};

export default Item;
