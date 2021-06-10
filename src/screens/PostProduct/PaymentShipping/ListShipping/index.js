import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Header, ButtonRounded, HeaderBack} from 'components';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const COLOR = [
  {
    id: '0',
    title: 'Grab',
  },
  {
    id: '1',
    title: 'Viettel Post',
  },
  {
    id: '2',
    title: 'VN Express ',
  },
  {
    id: '3',
    title: 'Giao hàng tiết kiệm',
  },
  {
    id: '4',
    title: 'Tự lấy hàng',
  },
];
const Item = ({item, onPress}) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.item}>
      <CheckBox value={isSelected} onValueChange={setSelection} />
      <View style={{marginLeft: -15}}>
        <Text style={{fontSize: 16, paddingBottom: 3}}>{item.title}</Text>
      </View>
    </View>
  );
};
const ColorInfor = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };
  return (
    <SafeAreaView>
      <FlatList
        data={COLOR}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={{paddingTop: 10, marginHorizontal: -20}}
      />
    </SafeAreaView>
  );
};
export default ColorInfor;
