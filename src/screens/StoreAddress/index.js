import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './styles';
import {ThemeView, Header, ButtonRounded} from 'components';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import ListStoreAddress from './ListStoreAddress';

const StoreAddress = ({navigation}) => {
  const [selectedAddress, setselectedAddress] = useState('HCM');
  const Dropdown = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 15,
          backgroundColor: 'white',
        }}>
        <Icon name="location-outline" color="grey" size={28} />
        <View style={{width: 200, marginHorizontal: -10}}>
          <Picker
            selectedValue={selectedAddress}
            onValueChange={(itemValue, itemIndex) =>
              setselectedAddress(itemValue)
            }>
            <Picker.Item label="TP.Hồ Chí Minh" value="HCM" />
            <Picker.Item label="Hà Nội" value="HN" />
            <Picker.Item label="Đà nẵng" value="DN" />
            <Picker.Item label="Cần Thơ" value="CT" />
            <Picker.Item label="Quy Nhơn" value="QN" />
            <Picker.Item label="Hà Tĩnh" value="HT" />
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ThemeView>
        <Header
          isDefault
          containerStyle={{
            paddingBottom: 10,
            borderBottomWidth: 0,
            height: 50,
            borderBottomWidth: 1,
          }}
          leftStyle={{
            height: 30,
            fontWeight: 'bold',
          }}
          middleComponent={
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Cửa hàng
            </Text>
          }
        />
        <Dropdown />
      </ThemeView>
      <View style={styles.wrapper}>
        <ListStoreAddress style={styles.list} />
        <View style={styles.button}>
          <TouchableOpacity>
            <ButtonRounded label="Mua tại cửa hàng" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default StoreAddress;
