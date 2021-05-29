/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Image, NumberInputUpDown} from 'components';
import HeaderStore from './HeaderStore';
import {currencyFormat} from 'utils/currency';
import Modal from 'react-native-modal';
import {IconButton, Colors} from 'react-native-paper';
import ModalChangeCart from '../ModalChangeCart';
import {DownArrow} from 'svg/common';

const Item = ({product, navigation}) => {
  const [visible, setVisible] = useState(false);

  const {storeId, storeName, storeAvatar, data} = product;

  useEffect(() => {}, [JSON.stringify(data)]);

  return (
    <>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        transparent={true}
        isVisible={visible}
        animationOutTiming={20}
        backdropOpacity={0.3}
        style={{padding: 0}}
        testID={'modal'}
        isVisible={visible}
        // onSwipeComplete={() => setVisible(false)}
        // swipeDirection={['down']}
        // propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.modalChangeColor}>
          <View style={styles.contentBox}>
            <View style={styles.modalHeader}>
              <IconButton
                icon="close"
                color={Colors.black500}
                size={20}
                onPress={() => setVisible(false)}
              />
            </View>
            <ModalChangeCart />
          </View>
        </View>
      </Modal>
      <View style={styles.wrapSection}>
        <HeaderStore header={{storeId, storeName, storeAvatar}} />
        {data.map((item, index) => (
          <View style={styles.wrapItems} key={`${item.id}-${index}`}>
            <View style={styles.productItem}>
              <View style={styles.wrapImageThumbnail}>
                <Image
                  source={
                    item.productImage
                      ? {uri: item?.productImage}
                      : require('assets/images/default.png')
                  }
                  style={styles.productAvatar}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View style={styles.wrapTextContent}>
                <View>
                  <Text numberOfLines={2} style={styles.name}>
                    {item.productName}
                  </Text>
                  {item?.productPrice ? (
                    <Text numberOfLines={1} style={styles.price}>
                      {currencyFormat(item?.productPrice, 'đ')}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.wrapAmount}>
                  <View style={styles.wrapSize}>
                    <Text numberOfLines={1} style={styles.name}>
                      Size: {item.productSize}&nbsp;
                      <TouchableOpacity
                        style={styles.productColor}
                        onPress={() => setVisible(true)}>
                        <Text style={styles.addButtonText}>
                          &nbsp;{item.productColor}&nbsp;
                          <DownArrow />
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                  <View style={styles.wrapUpdown}>
                    <NumberInputUpDown value={+item.amount} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

Item.defaultProps = {};

Item.propTypes = {};

export default Item;
