import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Rating} from 'components';
import {Heart} from 'svg/common';
import styles from './styles';
import picture from 'assets/images/signInBg.png';
import {Colors} from 'components';
import {TicketCutLine} from 'svg/common';
const ItemTopSide = () => <View style={styles.topSideWrapper}></View>;
const ItemBottomSide = () => (
  <View style={styles.bottomSideWrapper}>
    <View style={styles.leftCutPoint}></View>
    <View style={styles.rightCutPoint}></View>
  </View>
);
const VoucherItem = ({item, index}) => (
  <View style={styles.itemWrapper} key={`${item}-${index}`}>
    <View style={styles.itemInner}>
      <ItemTopSide />
      <TicketCutLine height={3} />
      <ItemBottomSide></ItemBottomSide>
    </View>
  </View>
);

export default VoucherItem;
