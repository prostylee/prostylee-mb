import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const DATA = [
  {
    id: '0',
    categories: 'Thời trang nam',
    products: 'Sơ mi tay ngắn',
  },
  {
    id: '1',
    categories: 'Thời trang nam',
    products: 'Quần tây',
  },
  {
    id: '2',
    categories: 'Thời trang nam',
    products: 'Áo hoodies nam',
  },
];
const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.fomatItem}>
          <Text style={styles.Card}>{item.categories}</Text>
          <Text style={styles.Card}>/</Text>
          <Text style={styles.Card}>{item.products}</Text>
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
