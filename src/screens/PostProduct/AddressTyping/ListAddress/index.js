import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
const DATA = [
  {
    id: '0',
    address: '26 Lý Tự Trọng',
    hintLocation: 'Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
  },
  {
    id: '1',
    address: '268 Tô Hiến Thành',
    hintLocation: 'Phường 15, Quận 10, Thành phố Hồ Chí Minh',
  },
  {
    id: '2',
    address: '266 Lê Hồng Phong',
    hintLocation: 'Phường 4, Quận 5, Thành phố Hồ Chí Minh',
  },
  {
    id: '3',
    address: '26 Ung Văn Khiêm',
    hintLocation: 'Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh',
  },
  {
    id: '4',
    address: '268 Đường Trần Hưng Đạo',
    hintLocation: 'Phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ...',
  },
];
const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.Card}>{item.address}</Text>
        <Text style={styles.hintCard}>{item.hintLocation}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Project = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

export default Project;
