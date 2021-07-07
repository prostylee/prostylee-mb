import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import {ButtonOutlined} from 'components';
import i18n from 'i18n';
import {ORDER_STATUS} from 'constants';
import {useNavigation} from '@react-navigation/native';
import {cancelOrder} from '../../../../../services/api/myPageApi';
import {showMessage} from 'react-native-flash-message';

const ButtonFooter = ({dealData}) => {
  const {status} = dealData;
  const navigation = useNavigation();

  const onCancelOrder = () => {
    cancelOrder({
      id: dealData?.id,
      act: ORDER_STATUS.CANCEL_ORDER,
      statusId: dealData?.statusId,
    }).then((res) => {
      if (res.data.status !== 200) {
        showMessage({
          message: i18n.t('someThingWrong'),
          type: 'danger',
        });
        return;
      }
      showMessage({
        message: i18n.t('myPage.cancelSuccess'),
        type: 'success',
      });
    });
  };
  switch (status) {
    case ORDER_STATUS.CREATE_ORDER:
      return (
        <View style={styles.wrapButton}>
          <ButtonOutlined
            label={i18n.t('orders.cancelDeal')}
            style={styles.buttonOutlinedGrey}
            labelStyle={styles.labelBtnOutlineGrey}
            onPress={onCancelOrder}
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
              onPress={() => {}}
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
            onPress={() => {}}
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
