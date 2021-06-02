import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Header, ThemeView} from 'components';
import {LocationIcon, RightArrow, PlusSign} from 'svg/common';
import {Divider} from 'react-native-paper';
import {Field, Formik} from 'formik';
import styles from './styles';
import addressList from './address';
import I18n from 'i18n';

const SettingAddress = () => {
  return (
    <ThemeView isFullView style={styles.container}>
      <Header title={I18n.t('setting.address')} isDefault/>
      <ScrollView>
        {
          addressList.map((address, index) => {
            return (
              <View>
                <View style={styles.addressView} key={index}>
                  <View style={styles.addressIconView}>
                    <LocationIcon color="#8B9399"/>
                  </View>
                  <View style={styles.addressDetailView}>
                    <Text>{address.name}   {address.phone}</Text>
                    <Text style={styles.subText}>{address.address}</Text>
                    <Text style={styles.subText}>{address.ward}</Text>
                    <Text style={styles.subText}>{address.district}</Text>
                    <Text style={styles.subText}>{address.province}</Text>
                  </View>
                  <View style={styles.addressDefaultView}>
                    <Text style={styles.isDefaultText}>{address.isDefault==1?'Mặc định':''}</Text>
                    <Text></Text>
                    <RightArrow/>
                  </View>
                </View>
                {index!=addressList.length-1?<Divider></Divider>:<></>}
              </View>
            );
          })
        }
        <View style={{height: 6}}></View>
        <TouchableOpacity>
          <View style={styles.addAddressButtonView}>
            <PlusSign/>
            <Text style={{paddingLeft: 15}}>Thêm địa chỉ mới</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ThemeView>
  );
}

export default SettingAddress;