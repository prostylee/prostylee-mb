import styles from './styles';
import React, {useEffect, useState, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import CardAddress from '../CardAddress';
import {currencyFormat} from 'utils/currency';
import {RadioButton} from 'react-native-paper';
import {
  getListDeliverySelector,
  getShippingMethodSelector,
} from 'redux/selectors/cart';
import {cartActions} from 'reducers';
import {ButtonRounded} from 'components';
import {CURRENCY_VIET_NAM} from 'constants';

const ListProduct = ({navigation, validateButton}) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false);

  const deliveries =
    useSelector((state) => getListDeliverySelector(state)) || [];
  const deliveryMethod =
    useSelector((state) => getShippingMethodSelector(state)) || {};

  useEffect(() => {
    handleRefreshing(false);
  }, [refreshing]);

  const onChangeDelivery = (vl) => {
    const items = deliveries.find((item) => item.id === vl);
    dispatch(cartActions.setShippingMethodData(items));
  };

  const renderFooter = () => {
    return (
      <View style={styles.wrapAccordion}>
        <Text style={styles.titleCollapseHeader}>
          &nbsp;{i18n.t('cart.deliveryMethod')}
        </Text>
        <View>
          <RadioButton.Group
            onValueChange={onChangeDelivery}
            value={deliveryMethod?.id}
            color="#823ffd"
            style={styles.wrapRadioGroup}>
            {listDelivery?.length > 0 &&
              listDelivery.map((item) => (
                <RadioButton.Item
                  key={`radio-${item.id}`}
                  label={renderDelivery(item)}
                  value={item.id}
                  color="#823ffd"
                  style={styles.wrapRadioButton}
                  mode="android"
                  position="leading"
                  labelStyle={styles.wrapLabelRadioButton}
                />
              ))}
          </RadioButton.Group>
        </View>
      </View>
    );
  };

  const renderDelivery = (item) => {
    return (
      <View style={styles.wrapRadio}>
        <View style={styles.wrapInfo}>
          <View>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.description}</Text>
            </View>
          </View>
          <View style={styles.wrapRadioContent}>
            <Text style={styles.contentRadio}>{item.deliveryTime}</Text>
          </View>
        </View>

        <View style={styles.wrapPrice}>
          <Text style={styles.priceRadio}>
            {item.price
              ? currencyFormat(item.price, CURRENCY_VIET_NAM)
              : i18n.t('cart.freeShip')}
          </Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return <CardAddress navigation={navigation} />;
  };

  const listDelivery = useMemo(() => deliveries, [JSON.stringify(deliveries)]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.wrapList}>{renderHeader()}</View>
      {renderFooter()}
      <View style={styles.bottomButton}>
        <ButtonRounded
          onPress={navigation.goBack}
          compact={false}
          style={styles.btnCheckout}
          label={i18n.t('cart.confirm')}
        />
      </View>
    </View>
  );
};

ListProduct.defaultProps = {};

ListProduct.propTypes = {};

export default ListProduct;
