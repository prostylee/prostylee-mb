import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const Item = ({item, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('ITEM', JSON.stringify(item, null, 2));
        navigation.navigate('Maps', {
          pickedLocation: {...item},
        });
      }}>
      <View style={styles.container}>
        <Text
          style={styles.Card}>{`${item?.addressNumber} ${item?.street}`}</Text>
        <Text
          style={styles.hintCard}>{`${item?.districts} ${item?.city}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListAddress = ({data = []}) => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

export default ListAddress;
