import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Divider} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
const Item = ({item, onPress}) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.itemPayment}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <View style={{marginLeft: -15}}>
            <Text style={{fontSize: 16, paddingBottom: 3}}>Credit Card</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../../../assets/images/visa.png')}
            resizeMode={'cover'}
            style={styles.image}
          />
          <Image
            source={require('../../../../assets/images/master.png')}
            resizeMode={'cover'}
            style={styles.image}
          />
          <Image
            source={require('../../../../assets/images/american.png')}
            resizeMode={'cover'}
            style={styles.image}
          />
          <Image
            source={require('../../../../assets/images/discovery.png')}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
      </View>
      <Divider />

      <View style={styles.itemPayment}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <View style={{marginLeft: -15}}>
            <Text style={{fontSize: 16, paddingBottom: 3}}>Momo</Text>
          </View>
        </View>

        <View>
          <Image
            source={require('../../../../assets/images/momo.png')}
            resizeMode={'cover'}
            style={styles.img}
          />
        </View>
      </View>

      <Divider />
      <View style={styles.item}>
        <CheckBox value={isSelected} onValueChange={setSelection} />
        <View style={{marginLeft: -15}}>
          <Text style={{fontSize: 16, paddingBottom: 3}}>COD</Text>
        </View>
      </View>
      <Divider />

      <View style={styles.item}>
        <CheckBox value={isSelected} onValueChange={setSelection} />
        <View style={{marginLeft: -15}}>
          <Text style={{fontSize: 16, paddingBottom: 3}}>
            Thanh toán tại cửa hàng
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Item;
