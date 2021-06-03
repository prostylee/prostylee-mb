/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'components';
import {RightArrow} from 'svg/common';

const HeaderStore = ({header, navigation}) => {
  const {storeName, storeId, storeAvatar} = header;
  const clickItem = () => {
    console.log('Cliked!', storeId);
  };

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
    </View>
  );
};

HeaderStore.defaultProps = {};

HeaderStore.propTypes = {};

export default HeaderStore;
