import React, {useState} from 'react';
import {Header, ThemeView, CustomTextInput, RadioSelectGroup} from 'components';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import I18n from 'i18n';
import styles from './styles';
import {Field, Formik} from 'formik';
import { Switch } from 'react-native-paper';

const addAddress = ({ route, navigation }) => {
  const { addressCount } = route.params;

  const onChangeProvince = () => {

  }

  const onChangeDistrict = () => {

  }

  const onChangeWard = () => {

  }

  return (
    <ThemeView isFullView style={styles.container}>
      <Header title={I18n.t('settingAddress.addAddress')} isDefault/>
      <View style={{paddingHorizontal: 16, paddingTop: 16}}>
        {addressCount!=0?<Text style={{color: '#8B9399'}}>{I18n.t('settingAddress.noAddress')}</Text>:<></>}
      </View>
      <Formik>
        <ScrollView>
          <View>
            <View style={styles.viewStyle}>
              <Text style={{color: '#8B9399'}}>{I18n.t('settingAddress.contact')}</Text>
            </View>
            <Field
              component={CustomTextInput}
              name="name"
              label={I18n.t('settingProfile.name')}
            />
            <Field
              component={CustomTextInput}
              name="phone"
              label={I18n.t('settingProfile.phone')}
            />

            <View style={styles.viewStyle}>
              <Text style={{color: '#8B9399'}}>{I18n.t('settingAddress.address')}</Text>
            </View>
            
            <TouchableOpacity
              onPress={() => onChangeProvince()}
            >
              <Field
                component={CustomTextInput}
                disabled
                name="province"
                label={I18n.t('settingAddress.province')}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => onChangeDistrict()}
            >
              <Field
                component={CustomTextInput}
                disabled
                name="district"
                label={I18n.t('settingAddress.district')}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => onChangeWard()}
            >
              <Field
                component={CustomTextInput}
                disabled
                name="ward"
                label={I18n.t('settingAddress.ward')}
              />
            </TouchableOpacity>
            <Field
              component={CustomTextInput}
              name="detailAddress"
              label={I18n.t('settingAddress.detailAddress')}
            />
            <View style={styles.viewDivider}></View>
            <View style={styles.viewSwitch}>
              <View style={styles.viewSwitchText}>
                <Text>Địa chỉ làm mặc định</Text>
              </View>
              <View style={styles.viewSwitchButton}>
                <Switch value={true} />
              </View>
            </View>
          </View>
        </ScrollView>
      </Formik>
    </ThemeView>
  );
}

export default addAddress;