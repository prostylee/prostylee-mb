/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Text, View} from 'react-native';
import {Image} from 'components';
import CardVoucher from '../CardVoucher';
import {Button} from 'react-native-paper';
import i18n from 'i18n';
import {cartActions} from 'redux/reducers';
import {getVoucherUseSelector} from 'redux/selectors/cart';

const ProductItem = ({item, navigation}) => {
  const dispatch = useDispatch();

  const voucherUsed = useSelector((state) => getVoucherUseSelector(state));

  const onUse = async () => {
    if (!voucherUsed || voucherUsed.id !== item.id) {
      await dispatch(cartActions.setVoucherUse(item));
    }
    navigation.goBack();
  };

  return (
    <CardVoucher style={styles.cardItem} key={item.key}>
      <View style={styles.wrapCardItem}>
        <View style={styles.wrapContentVoucher}>
          <View>
            <Image
              source={
                item?.logo
                  ? {uri: item?.logo}
                  : require('assets/images/default.png')
              }
              resizeMode="cover"
              style={styles.imageThumbnail}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.wrapInfo}>
            <Text numberOfLines={1} style={styles.textCategory}>
              {item.voucherOwner}
            </Text>
            <Text numberOfLines={2} style={styles.textDescription}>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={styles.dashedLine}></View>
        <View style={styles.wrapExpiredVoucher}>
          <View style={styles.wrapExpiredText}>
            <Text numberOfLines={1} style={styles.textExpired}>{`HSD: ${
              item.expiryDate ? item.expiryDate : 'Không có'
            }`}</Text>
          </View>
          <View>
            <Button
              contentStyle={styles.button}
              labelStyle={styles.labelStyle}
              mode="contained"
              color="#823FFD"
              onPress={onUse}>
              {i18n.t('cart.use')}
            </Button>
          </View>
        </View>
      </View>
    </CardVoucher>
  );
};

ProductItem.defaultProps = {};

ProductItem.propTypes = {};

export default ProductItem;
