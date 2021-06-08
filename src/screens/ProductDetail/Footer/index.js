import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import {ButtonRounded, ButtonOutlined, ProductLike} from 'components';
import i18n from 'i18n';

import {cartActions} from 'reducers';
import {useDispatch} from 'react-redux';

const Footer = (props) => {
  const item = props.productData ? props.productData : {};
  const choiceSelect = props.choiceSelect ? props.choiceSelect : [];
  const dispatch = useDispatch();

  const onAddToCart = () => {
    const productItem = {
      item: item,
      quantity: 1,
      options: choiceSelect,
    };
    dispatch(cartActions.addItemToCart(productItem));
  };

  return (
    <View style={styles.container}>
      <View style={styles.likeButton}>
        <ProductLike likeSize={26} unlikeSize={24} item={item} />
      </View>
      <View style={{}}>
        <ButtonOutlined
          style={{}}
          contentStyle={{}}
          labelStyle={{}}
          label={i18n.t('productDetail.buttonStore')}
          onPress={() => {}}
        />
      </View>
      <View style={{}}>
        <ButtonRounded
          style={{}}
          contentStyle={{}}
          labelStyle={{}}
          label={i18n.t('productDetail.buttonAddToCart')}
          onPress={onAddToCart}
        />
      </View>
    </View>
  );
};

export default Footer;
