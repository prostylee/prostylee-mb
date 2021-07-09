import styles from './styles';
import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Image, NumberInputUpDown} from 'components';
import HeaderStore from '../HeaderStore';
import {currencyFormat} from 'utils/currency';
import {CURRENCY_VIET_NAM} from 'constants';

const Item = ({store, status, changeCount, onChangeCount, children}) => {
  const getAttributesText = (orderDetailAttributes) => {
    if (orderDetailAttributes && orderDetailAttributes?.length) {
      let attributeString = [...orderDetailAttributes]?.reduce(
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
      />
      {store && store?.products && store?.products?.length
        ? store?.products.map((item, index) => (
            <View style={styles.productItem} key={item?.id}>
              <View style={styles.wrapImageThumbnail}>
                <Image
                  source={
                    item?.productImage
                      ? {uri: item?.productImage}
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
                      {item?.productName}
                    </Text>
                    {item?.productPrice ? (
                      <Text numberOfLines={1} style={styles.price}>
                        {currencyFormat(
                          item?.productPrice || 0,
                          CURRENCY_VIET_NAM,
                        )}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.wrapUpDown}>
                    <View style={[styles.wrapAttribute, styles.flex1]}>
                      <Text numberOfLines={1} style={styles.name}>
                        {getAttributesText(item?.orderDetailAttributes)}
                      </Text>
                    </View>
                    <View style={styles.wrapAmount}>
                      <NumberInputUpDown
                        value={`${item?.amount}`}
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
                        {item?.productName}
                      </Text>
                      {item?.productPrice ? (
                        <Text numberOfLines={1} style={styles.price}>
                          {currencyFormat(
                            item?.productPrice || 0,
                            CURRENCY_VIET_NAM,
                          )}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.wrapAttribute}>
                      <Text numberOfLines={1} style={styles.name}>
                        {getAttributesText(item?.orderDetailAttributes)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.wrapAmount}>
                    <Text numberOfLines={2} style={styles.count}>
                      x{item?.amount}
                    </Text>
                  </View>
                </>
              )}
            </View>
          ))
        : null}
      {children}
    </>
  );
  return <View style={styles.wrapSection}>{renderBody()}</View>;
};

Item.defaultProps = {
  changeCount: false,
};

Item.propTypes = {};

export default Item;
