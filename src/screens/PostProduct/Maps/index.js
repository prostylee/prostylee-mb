import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {Header, ButtonRounded} from 'components';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
const Maps = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text style={styles.middleComponent}>Chọn điạ điểm</Text>
        }
      />
      <View style={styles.cotainer}>
        <Text>Maps</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.textFooter}>
          <Text style={styles.title}>Địa chỉ của bạn</Text>
          <View style={{paddingVertical: 10}}>
            <Text style={styles.address}>56 Nguyễn Đình Chiểu</Text>
            <Text style={{color: 'black', fontSize: 14}}>
              Đa Kao, Quận 1, Thành phố Hồ Chí Minh
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <ButtonRounded label="Sử dụng địa chỉ này" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Maps;
