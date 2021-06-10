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
import img from '../../../assets/images/avatar.jpg';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const DATA = [
  {
    id: '0',
    name: 'Hương Thu',
    mess: 'The new short-sleeved T-shirt is',
    status: 'Vừa xong',
  },
  {
    id: '1',
    name: 'Hương Thu',
    mess: 'The new short-sleeved T-shirt is',
    status: 'Vừa xong',
  },
  {
    id: '2',
    name: 'Hương Thu',
    mess: 'The new short-sleeved T-shirt is',
    status: 'Vừa xong',
  },
  {
    id: '3',
    name: 'Hương Thu',
    mess: 'The new short-sleeved T-shirt is',
    status: 'Vừa xong',
  },
];
const Item = ({item, onPress}) => {
  renderRightActions = () => {
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Text style={styles.actionText}>
          <AntIcon name="delete" size={20} color="white" />
        </Text>
      </RectButton>
    );
  };
  return (
    <Swipeable renderRightActions={this.renderRightActions}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image source={img} resizeMode={'cover'} style={styles.img}></Image>
            <View style={styles.fomatItem}>
              <Text style={styles.Card}>{item.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.status}>
                  <Text style={[styles.fomat]}>{item.mess}</Text>
                  <View style={{paddingLeft: 10}}>
                    <Icon name="ellipse-sharp" size={3} color="grey" />
                  </View>
                  <View style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 13, color: 'grey'}}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View style={{paddingLeft: 20, marginBottom: 15}}>
                  <Icon name="ellipse-sharp" size={7} color="#EA3F49" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
const ListStoreAddress = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };
  return (
    <ScrollView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </ScrollView>
  );
};

export default ListStoreAddress;
