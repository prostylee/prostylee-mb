import styles from './styles';
import React from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Image, NumberInputUpDown} from 'components';
import HeaderStore from '../HeaderStore';
import {currencyFormat} from 'utils/currency';
import {useNavigation} from '@react-navigation/native';
import {CURRENCY_VIET_NAM} from 'constants';

const Item = ({
  product,
  status,
  changeCount,
  onChangeCount,
  children,
  orderId = 0,
}) => {
  const navigation = useNavigation();

  const {store} = product;

  const onViewDetail = () => {
    navigation.navigate('OrdersDetail', {
      dealId: null,
      deal: {},
      status: status,
      orderId: orderId,
    });
  };

  const getAttributesText = () => {
    if (
      product?.orderDetailAttributes &&
      product?.orderDetailAttributes?.length
    ) {
      let attributeString = [...product?.orderDetailAttributes]?.reduce(
        (text, item, index) => {
          return index !== 0 ? text + '| ' + item?.value : text + item?.value;
        },
        '',
      );
      return attributeString;
    }
    return '';
  };

  const renderBody = () => (
    <>
      <HeaderStore
        header={{
          storeId: store?.id,
          storeName: store?.name,
          storeAvatar: store?.logoUrl,
        }}
        status={status}
        statusId={status}
      />
      {/* {data.map((item, index) => ( */}
      <View style={styles.productItem} key={product?.id}>
        <View style={styles.wrapImageThumbnail}>
          <Image
            source={
              product?.productImage
                ? {uri: product?.productImage}
                : require('assets/images/default.png')
            }
            style={styles.imageThumbnail}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        {changeCount ? (
          <View style={styles.wrapTextContent}>
            <View style={styles.wrapInfo}>
              <Text numberOfLines={2} style={styles.name}>
                {product?.productName}
              </Text>
              {product?.productPrice ? (
                <Text numberOfLines={1} style={styles.price}>
                  {currencyFormat(
                    product?.productPrice || 0,
                    CURRENCY_VIET_NAM,
                  )}
                </Text>
              ) : null}
            </View>
            <View style={styles.wrapUpDown}>
              <View style={[styles.wrapAttribute, styles.flex1]}>
                <Text numberOfLines={1} style={styles.name}>
                  {getAttributesText()}
                </Text>
              </View>
              <View style={styles.wrapAmount}>
                <NumberInputUpDown
                  value={`${product?.amount}`}
                  onChange={onChangeCount}
                />
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.wrapTextContent}>
              <View style={styles.wrapInfo}>
                <Text numberOfLines={2} style={styles.name}>
                  {product?.productName}
                </Text>
                {product?.productPrice ? (
                  <Text numberOfLines={1} style={styles.price}>
                    {currencyFormat(
                      product?.productPrice || 0,
                      CURRENCY_VIET_NAM,
                    )}
                  </Text>
                ) : null}
              </View>
              <View style={styles.wrapAttribute}>
                <Text style={styles.name}>{getAttributesText()}</Text>
              </View>
            </View>
            <View style={styles.wrapAmount}>
              <Text numberOfLines={2} style={styles.count}>
                x{product?.amount}
              </Text>
            </View>
          </>
        )}
      </View>
      {children}
    </>
  );
  return status === 'inhouse' ? (
    <View style={styles.wrapSection}>{renderBody()}</View>
  ) : (
    <TouchableOpacity style={styles.wrapSection} onPress={onViewDetail}>
      {renderBody()}
    </TouchableOpacity>
  );
};

Item.defaultProps = {
  changeCount: false,
};

Item.propTypes = {};

export default Item;
