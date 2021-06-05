import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';
import picture from 'assets/images/signInBg.png';
import {Colors} from 'components';
import {ProgressBar} from 'react-native-paper';
import useCurrentTime from '../../../../hooks/useCurrentTime';
const ItemBadge = () => (
  <View
    style={[
      styles.itemBadge,
      {
        backgroundColor: Colors['$red'],
      },
    ]}>
    <Text style={styles.badgeText}>-50%</Text>
  </View>
);

const type = 0;
const CustomProgressBar = () => {
  return (
    <View style={{flex: 3}}>
      <ProgressBar
        progress={0.5}
        color={Colors['$red']}
        style={styles.progressBar}
      />
      <Text style={styles.progressBarText}>Đã bán: 10</Text>
    </View>
  );
};
const TimeBox = ({time}) => {
  return (
    <View
      style={[
        styles.countDownItem,
        {
          backgroundColor: Colors['$black'],
        },
      ]}>
      <Text
        style={[
          styles.countDownItemText,
          {
            color: Colors['$white'],
          },
        ]}>
        {time}
      </Text>
    </View>
  );
};
const CountDownBox = () => {
  const {hour, minutes, seconds} = useCurrentTime();
  return (
    <View style={styles.countDownContainer}>
      <TimeBox time={hour} />
      <Text>:</Text>
      <TimeBox time={minutes} />
      <Text>:</Text>
      <TimeBox time={seconds} />
    </View>
  );
};

const ProductItem = ({item, index}) => (
  <View style={styles.itemWrapper} key={`${item}-${index}`}>
    <View style={styles.itemInner}>
      <View style={[styles.imageContainer]}>
        <Image style={styles.imageStyle} source={picture} resizeMode="cover" />
        <ItemBadge />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.itemName}>Áo nỉ hoddie trơn đủ màu Unisex</Text>
          <TouchableOpacity>
            <Heart />
          </TouchableOpacity>
        </View>
        {index % 2 === 0 ? (
          <View
            style={[
              styles.flexRow,
              {
                alignItems: 'flex-end',
              },
            ]}>
            <View style={{flexDirection: 'column', flex: 3}}>
              <Text style={styles.itemPrice}>99.000.000.000 đ</Text>
              <Text style={styles.itemDiscountPrice}>99.000 đ</Text>
            </View>

            <CountDownBox />
          </View>
        ) : (
          <>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.itemPrice}>99.000 đ</Text>
              <Text style={styles.itemDiscountPrice}>99.000 đ</Text>
            </View>
            <View
              style={[
                styles.flexRow,
                {
                  alignItems: 'center',
                },
              ]}>
              <CustomProgressBar />
              <CountDownBox />
            </View>
          </>
        )}
      </View>
    </View>
  </View>
);
export default ProductItem;
