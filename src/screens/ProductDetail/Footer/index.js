import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ButtonRounded, ButtonOutlined} from 'components';
import {Heart, HeartFill} from 'svg/common';
import Collapsible from 'react-native-collapsible';
import i18n from 'i18n';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const Footer = (props) => {
  const {colors} = useTheme();
  const isLike = props.isLike ? props.isLike : false;
  const [showInfo, setShowInfo] = React.useState(false);
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
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default Footer;
