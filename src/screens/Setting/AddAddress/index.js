import React, {useState} from 'react';
import {Header, ThemeView, CustomTextInput, RadioSelectGroup} from 'components';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import I18n from 'i18n';
import styles from './styles';
import {Field, Formik} from 'formik';
import {Switch} from 'react-native-paper';
import {MapIcon} from 'svg/common';

const addAddress = ({route, navigation}) => {
  const {addressCount} = route.params;

  const onChangeProvince = () => {};

  const onChangeDistrict = () => {};

  const onChangeWard = () => {};

  return (
    <ThemeView isFullView style={styles.container}>
      <Header
        title={I18n.t('settingAddress.addAddress')}
        rightIcon={<MapIcon />}
        rightPress={() => console.log('right pressed')}
        isDefault
      />
      <View style={{paddingHorizontal: 16, paddingTop: 16}}>
        {addressCount != 0 ? (
          <Text style={{color: '#8B9399'}}>
            {I18n.t('settingAddress.noAddress')}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <ScrollView>
        <Formik
          validateOnMount={true}
          initialValues={{
            name: '',
            province: '',
            district: '',
            ward: '',
          }}
          onSubmit={(values) => console.log(values)}>
          {({handleSubmit, values, isValid}) => (
            <View>
              <View style={styles.viewContactInfo}>
                <View style={styles.viewStyle}>
                  <Text style={{color: '#8B9399'}}>
                    {I18n.t('settingAddress.contact')}
                  </Text>
                </View>
                <View style={styles.wrapContactInfo}>
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
                </View>
              </View>
              <View style={styles.viewAddressInfo}>
                <View style={styles.viewStyle}>
                  <Text style={{color: '#8B9399'}}>
                    {I18n.t('settingAddress.address')}
                  </Text>
                </View>
                <View style={styles.wrapAddressInfo}>
                  <TouchableOpacity onPress={() => onChangeProvince()}>
                    <Field
                      component={CustomTextInput}
                      disabled
                      name="province"
                      label={I18n.t('settingAddress.province')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => onChangeDistrict()}>
                    <Field
                      component={CustomTextInput}
                      disabled
                      name="district"
                      label={I18n.t('settingAddress.district')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => onChangeWard()}>
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
                </View>
              </View>

              <View style={styles.viewDivider}></View>
              <View style={styles.viewSwitch}>
                <View style={styles.viewSwitchText}>
                  <Text style={styles.labelSwitchText}>
                    {I18n.t('setting.setAddressAsDefault')}
                  </Text>
                </View>
                <View style={styles.viewSwitchButton}>
                  <Switch value={true} />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </ThemeView>
  );
};

export default addAddress;
