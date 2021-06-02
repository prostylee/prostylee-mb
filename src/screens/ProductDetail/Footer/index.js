import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ButtonRounded, ButtonOutlined} from 'components';
import {Heart, HeartFill} from 'svg/common';
import i18n from 'i18n';
import styles from './styles';
import {cartActions} from 'reducers';
import {useDispatch} from 'react-redux';

const Footer = (props) => {
  const isLike = props.isLike ? props.isLike : false;
  const [showInfo, setShowInfo] = useState(false);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch(cartActions.setListCart(props.productData));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.likeButton}
        activeOpacity={1}
        onPress={() => {}}>
        {isLike ? (
          <HeartFill width={26} height={26} />
        ) : (
          <Heart width={24} height={24} />
        )}
      </TouchableOpacity>
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
