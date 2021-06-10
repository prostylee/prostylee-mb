import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
const DATA = [
  {
    id: '0',
    address: '56 Nguyễn Đình Chiểu',
    hintLocation: 'Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh',
  },
  {
    id: '1',
    address: '100 Nguyễn Công Trứ',
    hintLocation: 'Phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ...',
  },
];
const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon name="clockcircleo" size={15} color="grey" />
        <View style={styles.content}>
          <Text style={styles.Card}>{item.address}</Text>
          <Text style={styles.hintCard}>{item.hintLocation}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="delete" size={15} color="grey" />
        </TouchableOpacity>
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
