import styles from './styles';
import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import {ThemeView, Header, ButtonRounded} from 'components';
import {RadioButton} from 'react-native-paper';
import CardAddress from '../CardAddress';
import {currencyFormat} from 'utils/currency';

const deliveries = [
  {label: 'Grab', content: 'Nhận hàng vào 29-12 đến 31-12', value: 25000},
  {label: 'Viettel Post', content: 'Nhận hàng trong ngày', value: 45000},
  {label: 'VN Express', content: 'Nhận hàng trong ngày', value: 35000},
  {label: 'Giao hàng tiết kiệm', content: 'Nhận hàng trong ngày', value: 30000},
  {
    label: 'Tự lấy hàng',
    content: 'Bạn có thể tự đến lấy hàng tại địa chỉ của người bán.',
    value: 0,
  },
];

const DeliveryMethod = ({navigation, data}) => {
  const [value, setValue] = useState();

  const renderLabel = (item) => {
    return (
      <View style={styles.wrapRadio}>
        <View style={styles.wrapInfo}>
          <View>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
          </View>
          <View style={styles.wrapPrice}>
            <Text style={styles.priceRadio}>
              {item.value ? currencyFormat(item.value, 'đ') : 'Miễn phí'}
            </Text>
          </View>
        </View>

        <View style={styles.wrapRadioContent}>
          <Text style={styles.contentRadio}>{item.content}</Text>
        </View>
      </View>
    );
  };

  const onChange = (vl) => {
    setValue(vl);
  };

  const listDelivery = useMemo(() => deliveries, [JSON.stringify(deliveries)]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.deliveryMethod')} />

      <View style={styles.wrapContent}>
        <CardAddress />
        <View style={styles.wrapBody}>
          <View style={styles.wrapLabelDelivery}>
            <Text style={styles.labelDelivery}>Phương thức vận chuyển</Text>
          </View>
          <RadioButton.Group
            onValueChange={onChange}
            value={value}
            color="#823ffd"
            style={styles.wrapRadioGroup}>
            {listDelivery?.length > 0 &&
              listDelivery.map((item) => (
                <RadioButton.Item
                  key={item.value}
                  label={renderLabel(item)}
                  value={item.value}
                  color="#823ffd"
                  style={styles.wrapRadioButton}
                />
              ))}
          </RadioButton.Group>
        </View>
        <View style={styles.wrapFooter}>
          <ButtonRounded
          style={styles.button}
            label={i18n.t('cart.confirm')}
            onPress={() => console.log('pressed')}
          />
        </View>
      </View>
    </ThemeView>
  );
};

DeliveryMethod.defaultProps = {
  data: [],
};

DeliveryMethod.propTypes = {};

export default DeliveryMethod;
