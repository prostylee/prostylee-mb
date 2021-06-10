import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const DATA = [
  {
    id: '0',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
  {
    id: '1',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
  {
    id: '2',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
  {
    id: '3',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
  {
    id: '4',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
  {
    id: '5',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
  {
    id: '6',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
  {
    id: '7',
    icon: 'https://images.vexels.com/media/users/3/142652/isolated/preview/09b31f7503c22e6cd040ee71e14e8cbb-black-suit-clothing-icon-by-vexels.png',
    categories: 'Thời trang nam',
  },
];
const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.fomatItem}>
          <Icon name="tshirt" size={16} />
          <Text style={styles.Card}>{item.categories}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListStoreAddress = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };
  return (
    <SafeAreaView>
      <View style={styles.spaceHeader}>
        <Text style={styles.textSpace}>Danh mục sản phẩm</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default ListStoreAddress;
