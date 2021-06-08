import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
const DATA = [
  {
    id: '0',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '1',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '2',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '3',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '4',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '5',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '6',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '7',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '8',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '9',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '10',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '11',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '12',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '13',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '14',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '15',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
  {
    id: '16',
    title: 'Uniqlo',
    url: '../../../../assets/images/uniqlo.png',
  },
];
const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/images/uniqlo.png')}
          resizeMode={'cover'}
          style={styles.img}
        />
        <Text style={styles.Card}>{item.title}</Text>
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
    <View style={styles.MainContainer}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={3}
      />
    </View>
  );
};

export default Project;
