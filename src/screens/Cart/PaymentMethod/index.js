import styles from './styles';
import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import i18n from 'i18n';
import {VISAIcon, MASTERIcon, AEIcon, DISCOVERIcon, MomoIcon} from 'svg/common';
import {ThemeView, Header} from 'components';
import {RadioButton} from 'react-native-paper';

const payments = [
  {label: 'Credit Card', value: 'credit'},
  {label: 'Momo', value: 'momo'},
  {label: 'COD', value: 'cod'},
];

const PaymentMethod = ({navigation, data}) => {
  const [value, setValue] = useState();

  const renderLabel = (item) => {
    switch (item.value) {
      case 'credit':
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
            <View style={styles.wrapRadioSub}>
              <View style={styles.iconRadioSub}>
                <VISAIcon />
              </View>
              <View style={styles.iconRadioSub}>
                <MASTERIcon />
              </View>
              <View style={styles.iconRadioSub}>
                <AEIcon />
              </View>
              <View style={styles.iconRadioSub}>
                <DISCOVERIcon />
              </View>
            </View>
          </View>
        );
      case 'momo':
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
            <View style={styles.wrapRadioSub}>
              <View style={styles.iconRadioSub}>
                <MomoIcon />
              </View>
            </View>
          </View>
        );
      case 'cod':
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.wrapRadio}>
            <View style={styles.wrapRadioTitle}>
              <Text style={styles.titleRadio}>{item.label}</Text>
            </View>
          </View>
        );
    }
  };

  const onChange = (vl) => {
    setValue(vl);
  };

  const listPayment = useMemo(() => payments, [JSON.stringify(payments)]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.paymentMethod')} />
      <View style={styles.wrapContent}>
        <RadioButton.Group
          onValueChange={onChange}
          value={value}
          color="#823ffd"
          style={styles.wrapRadioGroup}>
          {listPayment?.length > 0 &&
            listPayment.map((item) => (
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
    </ThemeView>
  );
};

PaymentMethod.defaultProps = {
  data: [],
};

PaymentMethod.propTypes = {};

export default PaymentMethod;
