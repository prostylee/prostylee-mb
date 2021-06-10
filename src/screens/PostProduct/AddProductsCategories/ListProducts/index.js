import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import i18n from 'i18n';

const DATA = [
  {
    id: '0',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Thời trang nam',
  },
  {
    id: '1',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Thời trang nữ',
  },
  {
    id: '2',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Giày dép nam',
  },
  {
    id: '3',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Giày dép nữ',
  },
  {
    id: '4',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Túi thời trang nam',
  },
  {
    id: '5',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Túi thời trang nữ',
  },
  {
    id: '6',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Balo và vali',
  },
  {
    id: '7',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    label: 'Phụ kiện',
  },
];
const Item = ({item, index, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.itemContainer,
          {
            borderTopColor: index !== 0 ? colors['$bgColor'] : 'transparent',
          },
        ]}>
        <Icon name="tshirt" size={16} />
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};
const ListStoreAddress = (props) => {
  const selectAction = props.selectAction ? props.selectAction : () => {};
  const renderItem = ({item, index}) => {
    return (
      <Item item={item} index={index} onPress={() => selectAction(item)} />
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.spaceHeader}>
        <Text style={styles.textSpace}>
          {i18n.t('addProduct.productCategory')}
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentStyle}
        style={styles.flatlistStyle}
      />
    </SafeAreaView>
  );
};

export default ListStoreAddress;
