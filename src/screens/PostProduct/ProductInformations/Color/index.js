import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Checkbox} from 'react-native-paper';

import {Header, ButtonRounded, HeaderBack} from 'components';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
const COLOR = [
  {
    id: '0',
    title: 'Đen',
  },
  {
    id: '1',
    title: 'Trắng',
  },
  {
    id: '2',
    title: 'Xám ',
  },
  {
    id: '3',
    title: 'Cam',
  },
  {
    id: '4',
    title: 'Hồng',
  },
  {
    id: '5',
    title: 'Đỏ',
  },
  {
    id: '6',
    title: 'Tím',
  },
  {
    id: '7',
    title: 'Xanh lá cây',
  },
  {
    id: '8',
    title: 'Khác',
  },
];
const Item = ({item, onPress}) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.item}>
      <Checkbox.Android status="unchecked" color="#3470FB" />
      <Text>{item.title}</Text>
    </View>
  );
};
const ColorInfor = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={COLOR}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={styles.listWrapper}
        ListFooterComponent={
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Placeholder"
              keyboardType="numeric"
            />
          </View>
        }
      />

      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Chọn" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ColorInfor;
