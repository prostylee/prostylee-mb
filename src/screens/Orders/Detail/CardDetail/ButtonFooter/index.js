import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import {ButtonOutlined} from 'components';
import i18n from 'i18n';

const ButtonFooter = ({navigation, dealData}) => {
  const {dealId, deal, status} = dealData;

  switch (status) {
    case 'waiting':
      return (
        <View style={styles.wrapButton}>
          <ButtonOutlined
            label={i18n.t('orders.cancelDeal')}
            style={styles.buttonOutlinedGrey}
            labelStyle={styles.labelBtnOutlineGrey}
            onPress={() => console.log('Hủy đơn hàng')}
          />
        </View>
      );
    case 'done':
      return (
        <View style={styles.rowButton}>
          <View style={styles.colButton}>
            <ButtonOutlined
              label={i18n.t('orders.ratingProduct')}
              style={styles.buttonOutlinedGrey}
              labelStyle={styles.labelBtnOutlineGrey}
              onPress={() => console.log('Đánh giá')}
            />
          </View>
          <View style={styles.colButton}>
            <ButtonOutlined
              label={i18n.t('orders.repurchase')}
              labelStyle={styles.labelBtnOutline}
              onPress={() => console.log('Mua lại')}
            />
          </View>
        </View>
      );
    case 'cancel':
      return (
        <View style={styles.wrapButton}>
          <ButtonOutlined
            label={i18n.t('orders.repurchase')}
            labelStyle={styles.labelBtnOutline}
            onPress={() => console.log('Mua lại')}
          />
        </View>
      );

    default:
      return <View></View>;
  }
};

ButtonFooter.defaultProps = {};

ButtonFooter.propTypes = {};

export default ButtonFooter;
