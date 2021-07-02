import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import {ButtonOutlined} from 'components';
import i18n from 'i18n';
import {ORDER_STATUS} from 'constants';
import {useNavigation} from '@react-navigation/native';

const ButtonFooter = ({dealData}) => {
  const {dealId, deal, status} = dealData;
  const navigation = useNavigation();
  switch (status) {
    case ORDER_STATUS.CREATE_ORDER:
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
    case ORDER_STATUS.COMPLETED:
      return (
        <View style={styles.rowButton}>
          <View style={styles.colButton}>
            <ButtonOutlined
              label={i18n.t('orders.ratingProduct')}
              style={styles.buttonOutlinedGrey}
              labelStyle={styles.labelBtnOutlineGrey}
              onPress={() => {
                navigation.navigate('ChooseRateProduct', {
                  listProduct: dealData?.orderDetails,
                });
              }}
            />
          </View>
          <View style={styles.colButton}>
            <ButtonOutlined
              label={i18n.t('orders.repurchase')}
              labelStyle={styles.labelBtnOutline}
              onPress={() => console.log('Mua lại')}
              style={{borderWidth: 1}}
            />
          </View>
        </View>
      );
    case ORDER_STATUS.CANCEL_ORDER:
      return (
        <View style={styles.wrapButton}>
          <ButtonOutlined
            label={i18n.t('orders.repurchase')}
            labelStyle={styles.labelBtnOutline}
            onPress={() => console.log('Mua lại')}
            style={{borderWidth: 1}}
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
