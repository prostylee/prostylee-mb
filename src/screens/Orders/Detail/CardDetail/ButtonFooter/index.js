import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import {ButtonOutlined} from 'components';
import i18n from 'i18n';
import {ORDER_STATUS, LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useNavigation} from '@react-navigation/native';
import {cancelOrder} from 'services/api/myPageApi';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {myPageActions, userSelectors} from 'reducers';

const ButtonFooter = ({dealData}) => {
  const {status} = dealData;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const hasUserRatedAllProducts = (listProduct = []) => {
    return (
      listProduct.filter((item) => item?.productData?.reviewedStatusOfUserLogin)
        .length === listProduct.length
    );
  };
  const hasRated = hasUserRatedAllProducts(dealData?.orderDetails);

  const onCancelOrder = () => {
    cancelOrder({
      id: dealData?.id,
      act: ORDER_STATUS.CANCEL_ORDER,
      statusId: dealData?.statusId,
    }).then((res) => {
      if (res.data.status !== 200) {
        showMessage({
          message: i18n.t('someThingWrong'),
          position: 'top',
          type: 'danger',
        });
        return;
      }
      showMessage({
        message: i18n.t('mypage.cancelSuccess'),
        type: 'success',
        position: 'top',
      });
      dispatch(
        myPageActions.getListCanceledOrders({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          loggedInUser: userProfile?.id,
          statusId: dealData?.statusId,
        }),
      );
      navigation.goBack();
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
          {!hasRated ? (
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
          ) : null}

          <View
            style={[
              styles.colButton,
              {
                flex: hasRated ? 1 : 0.5,
              },
            ]}>
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
