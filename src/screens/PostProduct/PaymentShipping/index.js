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
import {ProgressBar, Button, List} from 'react-native-paper';
import {Header, ButtonRounded, HeaderBack} from 'components';
import RadioForm from 'react-native-simple-radio-button';
import Modal from 'react-native-modalbox';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ListShippingMethod from './ListShipping';
import ListPayment from './ListPayment';
import {useNavigation} from '@react-navigation/native';
const ProductInfor = () => {
  const navigation = useNavigation();
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState([]);

  const onChangeLocationPress = () => {
    navigation.navigate('AddressRecent');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text style={styles.middleComponent}>Thông tin sản phẩm</Text>
        }
      />
      <ProgressBar progress={1} color="#823FFD" />
      <View style={styles.container}>
        <View style={styles.boxWrap}>
          <View style={styles.status}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="ios-location-sharp" size={20} color="grey" />
              <Text style={styles.title}>Địa điểm của bạn</Text>
            </View>
            <TouchableOpacity onPress={onChangeLocationPress}>
              <Text style={styles.rightTitle}>Thay đổi địa điểm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.location}>
            <Text style={{fontSize: 15}}>
              56 Nguyễn Đình Chiểu Đa Kao, Quận 1, TP Hồ Chí Minh
            </Text>
          </View>
        </View>

        <View style={styles.boxWrap}>
          <ListPayment
            setSelectedPaymentMethods={setSelectedPaymentMethods}
            selectedPaymentMethods={selectedPaymentMethods}
          />
        </View>

        <View style={styles.boxWrap}>
          <ListShippingMethod
            setSelectedDeliveryType={setSelectedDeliveryType}
            selectedDeliveryType={selectedDeliveryType}
          />
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded label="Tiếp tục" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ProductInfor;
