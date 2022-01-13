import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image, Colors} from 'components';
import {RightArrow, TrashIcon, CheckBox} from 'svg/common';

const HeaderStore = ({
  header,
  onRemove,
  dataVariantList,
  selectedItems,
  setSelectedItems,
}) => {
  const navigation = useNavigation();
  const {storeName, storeId, storeAvatar} = header;
  const clickItem = () => {
    navigation.navigate('StoreProfileMain', {storeId: storeId});
  };
  let checker = (arr, target) => target.every((item) => arr.includes(item));

  return (
    <View style={styles.wrapHeader}>
      <TouchableOpacity
        style={styles.checkStore}
        onPress={() => {
          if (checker(selectedItems, dataVariantList)) {
            setSelectedItems([]);
          } else {
            setSelectedItems(dataVariantList);
          }
        }}>
        {checker(selectedItems, dataVariantList) ? (
          <CheckBox width={14} height={14} color={Colors['$blue500']} />
        ) : (
          <View style={styles.checkNone} />
        )}
      </TouchableOpacity>
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
      <TouchableOpacity onPress={onRemove} style={styles.ellipsisIcon}>
        <TrashIcon color={Colors['$black']} />
      </TouchableOpacity>
    </View>
  );
};

HeaderStore.defaultProps = {};

HeaderStore.propTypes = {};

export default HeaderStore;
