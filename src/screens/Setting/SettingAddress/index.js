import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Header, ThemeView} from 'components';
import {LocationIcon, RightArrow, PlusSign} from 'svg/common';
import {Divider} from 'react-native-paper';
import styles from './styles';
import addressList from './address';
import I18n from 'i18n';
import {useNavigation} from '@react-navigation/native';

const SettingAddress = () => {
  const navigation = useNavigation();

  const [addressListCount, setAddressListCount] = useState(0);

  useEffect(() => {
    setAddressListCount(addressList.length);
  });

  return (
    <ThemeView isFullView style={styles.container}>
      <Header title={I18n.t('setting.address')} isDefault />
      <ScrollView>
        {addressList.map((address, index) => {
          return (
            <View>
              <View style={styles.addressView} key={index}>
                <View style={styles.addressIconView}>
                  <LocationIcon color="#8B9399" />
                </View>
                <View style={styles.addressDetailView}>
                  <Text>
                    {address.name} {address.phone}
                  </Text>
                  <Text style={styles.subText}>{address.address}</Text>
                  <Text style={styles.subText}>{address.ward}</Text>
                  <Text style={styles.subText}>{address.district}</Text>
                  <Text style={styles.subText}>{address.province}</Text>
                </View>
                <View style={styles.addressDefaultView}>
                  <Text style={styles.isDefaultText}>
                    {address.isDefault == 1 ? I18n.t('setting.default') : ''}
                  </Text>
                  <Text></Text>
                  <RightArrow />
                </View>
              </View>
              {index != addressList.length - 1 ? <Divider></Divider> : <></>}
            </View>
          );
        })}
        <View style={{height: 6}}></View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SettingAddAddress', {
              addressCount: addressListCount,
            })
          }>
          <View style={styles.addAddressButtonView}>
            <PlusSign />
            <Text style={{paddingLeft: 15}}>
              {I18n.t('setting.newAddress')}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ThemeView>
  );
};

export default SettingAddress;
