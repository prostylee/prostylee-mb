/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React from 'react';
import {View, Text} from 'react-native';
import {ButtonOutlined} from 'components';
import {CartEmpty} from 'svg/common';

const EmptyCart = ({
  navigation,
  title,
  subTitle,
  buttonText,
  actionButton,
  icon,
}) => {
  const handlePress = () => {
    if (typeof actionButton === 'function') {
      actionButton();
      return;
    }
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon ? icon : <CartEmpty />}</View>
      <View style={styles.viewtitle}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.viewSubTitle}>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.actionButton}>
        <ButtonOutlined onPress={handlePress} label={buttonText} />
      </View>
    </View>
  );
};

EmptyCart.defaultProps = {
  title: 'Chưa có sản phẩm nào',
  subTitle: 'Hàng ngàn sản phẩm vẫn đang chờ bạn khám phá',
  buttonText: 'Mua sắm ngay',
};

EmptyCart.propTypes = {};

export default EmptyCart;
