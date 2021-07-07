import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image, Colors} from 'components';
import {RightArrow} from 'svg/common';
import Feather from 'react-native-vector-icons/Feather';

const HeaderStore = ({header, navigation}) => {
  const {storeName, storeId, storeAvatar} = header;
  const clickItem = () => {};

  return (
    <View style={styles.wrapHeader}>
      <Image
        source={
          storeAvatar
            ? {uri: storeAvatar}
            : require('assets/images/default.png')
        }
        resizeMode="cover"
        style={styles.storeAvatar}
        PlaceholderContent={<ActivityIndicator />}
      />
      <TouchableOpacity onPress={clickItem} style={styles.storeName}>
        <Text style={styles.storeNameText}>&nbsp;{storeName}&nbsp;</Text>
        <RightArrow />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={navigation.goBack}
        style={styles.ellipsisIcon}>
        <Feather name="more-horizontal" color={Colors['$icon']} size={24} />
      </TouchableOpacity>
    </View>
  );
};

HeaderStore.defaultProps = {};

HeaderStore.propTypes = {};

export default HeaderStore;
