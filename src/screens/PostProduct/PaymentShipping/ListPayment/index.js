import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {ActivityIndicator, Checkbox, Divider} from 'react-native-paper';
import styles from './styles';
import i18n from 'i18n';

import {
  getProductPaymentMethodSelector,
  getProductPaymentMethodLoadingSelector,
} from 'redux/selectors/postProduct';
import {useSelector} from 'react-redux';

const ListPayment = ({
  item,
  onPress,
  setSelectedPaymentMethods = () => {},
  selectedPaymentMethods = [],
}) => {
  const [isCheckAll, setIsCheckAll] = useState(false);

  const loading = useSelector((state) =>
    getProductPaymentMethodLoadingSelector(state),
  );
  const paymentMethodSelector = useSelector((state) =>
    getProductPaymentMethodSelector(state),
  );
  const listPaymentMethod = paymentMethodSelector.content || [];

  const _handleChecked = (item) => {
    let idx = selectedPaymentMethods.findIndex((v) => v.id === item.id);
    if (idx === -1) {
      if (selectedPaymentMethods.length + 1 === listPaymentMethod.length) {
        setIsCheckAll(true);
      }
      setSelectedPaymentMethods([...selectedPaymentMethods, item]);
    } else {
      let newSelectedList = [...selectedPaymentMethods];
      newSelectedList.splice(idx, 1);
      setSelectedPaymentMethods([...newSelectedList]);
    }
  };

  const isActiveItems = (item) => {
    return selectedPaymentMethods.findIndex((v) => v.id === item.id) !== -1;
  };

  React.useEffect(() => {
    if (selectedPaymentMethods.length < listPaymentMethod.length) {
      setIsCheckAll(false);
    }
  }, [selectedPaymentMethods]);
  return (
    <>
      <View style={styles.status}>
        <Text style={styles.title}>{i18n.t('cart.paymentMethod')}</Text>
        <TouchableOpacity
          onPress={() => {
            if (!isCheckAll) {
              setSelectedPaymentMethods([...listPaymentMethod]);
            } else {
              setSelectedPaymentMethods([]);
            }
            setIsCheckAll(!isCheckAll);
          }}>
          <Text style={styles.rightTitle}>
            {!isCheckAll
              ? i18n.t('addProduct.selectAll')
              : i18n.t('addProduct.unselectAll')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          listPaymentMethod.map((v) => (
            <>
              <View style={styles.itemPayment}>
                <TouchableOpacity
                  onPress={() => _handleChecked(v)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Checkbox.Android
                    status={isActiveItems(v) ? 'checked' : 'unchecked'}
                    color="#3470FB"
                  />
                  <Text style={styles.itemTitle}>{v.name}</Text>
                </TouchableOpacity>
                {v.imageUrls && v.imageUrls.length ? (
                  <View style={{flexDirection: 'row'}}>
                    {v.imageUrls.map((item) => (
                      <Image
                        source={require('assets/images/visa.png')}
                        resizeMode={'cover'}
                        style={styles.image}
                      />
                    ))}
                  </View>
                ) : null}
              </View>
              <Divider />
            </>
          ))
        )}
      </View>
    </>
  );
};
export default ListPayment;
