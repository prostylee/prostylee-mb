import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import styles from './styles';

const Item = ({item, onPress, isActive}) => {
  const location = item.location ? item.location : {};
  const address = `${location.address ? location.address : 'unknow'}, ${
    location.state ? location.state : 'unknow'
  }, ${location.city ? location.city : 'unknow'}, ${
    location.country ? location.country : 'unknow'
  }`;
  const distance = item.distance ? item.distance : 'unknow';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <RadioButton.Item
            uncheckedColor={'#F0F0F0'}
            status={isActive ? 'checked' : 'unchecked'}
            mode="android"
          />

          <View style={styles.fomatItem}>
            <Text style={styles.Card}>{item.name}</Text>
            <Text style={[styles.fomat]}>{address}</Text>
            <View style={styles.iconContainer}>
              <Icon
                name="location-outline"
                color="grey"
                size={13}
                style={styles.iconStyle}
              />
              <Text style={styles.textDistance}>{distance}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListStoreAddress = (props) => {
  const data = props.data ? props.data : [];
  const [selectedId, setSelectedId] = useState(null);
  console.log('Active item', selectedId);
  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          console.log('SELECT ID', item.id);
          setSelectedId(item.id);
        }}
        isActive={item?.id === selectedId ? true : false}
      />
    );
  };
  return (
    // <FlatList
    //   data={data}
    //   renderItem={renderItem}
    //   keyExtractor={(item) => item.id}
    //   // extraData={selectedId}
    // />
    <RadioButton.Group>
      {data && data.length
        ? data.map((v) => (
            <Item
              item={v}
              onPress={() => {
                console.log('SELECT ID', v.id);
                setSelectedId(v.id);
              }}
              isActive={v?.id === selectedId ? true : false}
            />
          ))
        : null}
    </RadioButton.Group>
  );
};

export default ListStoreAddress;
