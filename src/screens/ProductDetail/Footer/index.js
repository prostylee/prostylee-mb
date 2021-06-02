import React from 'react';
import {View} from 'react-native';
import {ButtonRounded, ButtonOutlined, ProductLike} from 'components';
import i18n from 'i18n';
import styles from './styles';

const Footer = (props) => {
  const item = props.item ? props.item : {};
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
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default Footer;
