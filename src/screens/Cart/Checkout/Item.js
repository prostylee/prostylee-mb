import styles from './styles';
import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import HeaderStore from './HeaderStore';
import {currencyFormat} from 'utils/currency';

const Item = ({product, navigation}) => {
  const {storeId, storeName, storeAvatar, data} = product;

  useEffect(() => {}, [JSON.stringify(data)]);

  return (
    <>
      <View style={styles.wrapSection}>
        <HeaderStore header={{storeId, storeName, storeAvatar}} />
        {data.map((dataItem, index) => {
          const item = dataItem.item ? dataItem.item : {};
          return (
            <View style={styles.productItem} key={item.id}>
              <View style={styles.wrapImageThumbnail}>
                <Image
                  source={
                    item?.imageUrls?.length
                      ? {uri: item?.imageUrls[0]}
                      : require('assets/images/default.png')
                  }
                  style={styles.imageThumbnail}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View style={styles.wrapTextContent}>
                <View style={styles.wrapInfo}>
                  <Text numberOfLines={2} style={styles.name}>
                    {item.name}
                  </Text>
                  {item?.priceSale ? (
                    <Text numberOfLines={1} style={styles.price}>
                      {currencyFormat(item?.priceSale, 'đ')}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.wrapAttribute}>
                  <Text numberOfLines={1} style={styles.name}>
                    {dataItem?.options.map((op, idx) => {
                      return (
                        <View
                          style={{
                            borderColor: 'rgba(0,0,0,0.1)',
                            borderLeftWidth: idx !== 0 ? 1 : 0,
                          }}>
                          {/* <Text style={styles.name}>{`${op.label}:`}&nbsp;</Text> */}
                          <Text style={styles.addButtonText}>
                            {`${idx > 0 ? ' ' : ''}${op.value.attrValue} `}
                          </Text>
                        </View>
                      );
                    })}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapAmount}>
                <Text numberOfLines={2} style={styles.count}>
                  x{dataItem?.quantity || 0}
                </Text>
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
