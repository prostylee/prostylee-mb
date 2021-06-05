import {size} from 'lodash';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Checkbox, RadioButton} from 'react-native-paper';
import styles from './styles';

const DATA = [
  {
    id: '0',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '1',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '2',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '3',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '4',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '5',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '6',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '7',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
  {
    id: '8',
    title: 'Nike',
    address: '95 Đ. Nguyễn Trãi, Phường Phạm Ngũ L...',
    range: '0.2',
  },
];
const Item = ({item, onPress}) => {
  const [value, setValue] = React.useState('');
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}>
            <View>
              <RadioButton
                value="first"
                uncheckedColor={'#F0F0F0'}
                status={value != 'first' ? 'checked' : 'unchecked'}
              />
            </View>
          </RadioButton.Group>
          <View style={styles.fomatItem}>
            <Text style={styles.Card}>{item.title}</Text>
            <Text style={[styles.fomat]}>{item.address}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="location-outline"
                color="grey"
                size={13}
                style={{paddingRight: 5}}
              />
              <Text style={{fontSize: 13, color: 'grey'}}>{item.range}km</Text>
            </View>
          </View>
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
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
  );
};

export default ListStoreAddress;
