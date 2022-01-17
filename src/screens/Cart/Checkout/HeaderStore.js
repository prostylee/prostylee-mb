import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'components';
import {RightArrow} from 'svg/common';

const HeaderStore = ({header}) => {
  const navigation = useNavigation();
  const {storeName, storeId, storeAvatar} = header;
  const clickItem = () => {
    navigation.navigate('StoreProfileMain', {storeId: storeId});
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
        <Text style={styles.storeNameText}>{storeName}</Text>
        <RightArrow />
      </TouchableOpacity>
    </View>
  );
};

HeaderStore.defaultProps = {};

HeaderStore.propTypes = {};

export default HeaderStore;
