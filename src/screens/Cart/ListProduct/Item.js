import styles from './styles';
import React, {useState} from 'react';

import {useDispatch} from 'react-redux';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Image, NumberInputUpDown} from 'components';
import i18n from 'i18n';
import HeaderStore from './HeaderStore';
import {currencyFormat} from 'utils/currency';
import Modal from 'react-native-modal';
import ModalChangeCart from '../ModalChangeCart';
import {DownArrow, Close} from 'svg/common';
import {cartActions} from 'reducers';

const Item = ({product}) => {
  const {storeId, storeName, storeAvatar, data} = product;
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [currentOptions, setCurrentOptions] = useState([]);

  const dispatch = useDispatch();

  const onChangeAttr = (pId, options) => {
    setCurrentOptions(options);
    setCurrentId(pId);
    setVisible(true);
  };

  const onChaneAmount = (amount, item) => {
    dispatch(cartActions.setCartAmount({item: item, newAmount: amount}));
  };

  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        transparent={true}
        isVisible={visible}
        animationInTiming={100}
        animationOutTiming={100}
        backdropOpacity={0.3}
        testID={'modal'}
        style={styles.modal}>
        <View style={styles.modalChangeColor}>
          <View style={styles.contentBox}>
            <View style={styles.modalHeader}>
              <View style={styles.wrapButtonEmpty}></View>
              <View style={styles.wrapButtonClose}>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setVisible(false)}>
                  <Close />
                </TouchableOpacity>
              </View>
            </View>
            <ModalChangeCart
              productId={currentId}
              currentOptions={currentOptions}
              closeModal={() => setVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.wrapSection}>
        <HeaderStore header={{storeId, storeName, storeAvatar}} />
        {data.map((dataItem, index) => {
          const item = dataItem.item ? dataItem.item : {};
          const onRemoveItem = () => {
            Alert.alert(i18n.t('caution'), i18n.t('cart.removeItemPopup'), [
              {
                text: i18n.t('confirm'),
                onPress: () => {
                  dispatch(cartActions.removeItemFromCart(item));
                },
                style: 'destructive',
              },
              {
                text: i18n.t('cancel'),
                onPress: () => {},
                style: 'cancel',
              },
            ]);
          };
          return (
            <View style={styles.wrapItems} key={`${item.id}-${index}`}>
              <View style={styles.productItem}>
                <View style={styles.wrapImageThumbnail}>
                  <Image
                    source={
                      item?.imageUrls?.length
                        ? {uri: item?.imageUrls[0]}
                        : require('assets/images/default.png')
                    }
                    style={styles.productAvatar}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <View style={styles.wrapTextContent}>
                  <View style={styles.wrapText}>
                    <Text numberOfLines={2} style={styles.name}>
                      {item.name}
                    </Text>
                    {item?.priceSale ? (
                      <Text numberOfLines={1} style={styles.price}>
                        {currencyFormat(item?.priceSale, 'đ')}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.wrapAmount}>
                    <TouchableOpacity
                      style={styles.wrapSize}
                      onPress={() => onChangeAttr(item.id, dataItem?.options)}>
                      <Text numberOfLines={1} style={styles.name}>
                        {dataItem?.options.map((op, idx) => {
                          return (
                            <View
                              style={[
                                styles.productAttr,
                                {
                                  borderLeftWidth: idx !== 0 ? 1 : 0,
                                },
                              ]}>
                              <Text style={styles.addButtonText}>
                                {`${idx > 0 ? ' ' : ''}${op.value.attrValue} `}
                              </Text>
                            </View>
                          );
                        })}
                      </Text>
                      <DownArrow />
                    </TouchableOpacity>
                    <View style={styles.wrapUpdown}>
                      <NumberInputUpDown
                        value={+dataItem?.quantity}
                        minValue={0}
                        onChange={(value) => onChaneAmount(value, item)}
                        onRemoveItem={() => onRemoveItem()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

Item.defaultProps = {};

Item.propTypes = {};

export default Item;
