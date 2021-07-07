import React from 'react';
import {Header, ThemeView, CustomTextInput} from 'components';
import {View, Text, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {addressActions, addressSelectors, userActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import I18n from 'i18n';
import styles from './styles';
import {SUCCESS, POST_SUCCESS} from 'constants';
import {Field, Formik} from 'formik';
import {
  validateFullname,
  validatePhone,
  validatePrefecture,
  validateDistrict,
  validateWard,
  validateAddress,
} from 'utils/validatorUtils';
import {Switch} from 'react-native-paper';
import {MapIcon} from 'svg/common';
import {
  addUserAddress as addUserAddressApi,
  updateUserAddress as updateUserAddressApi,
} from 'services/api/userApi';
import RNPickerSelect from 'react-native-picker-select';

const AddAddress = ({route, navigation}) => {
  const dispatch = useDispatch();
  const addressCount = route.params?.addressCount || 0;
  const currentAddress = route.params?.currentAddress || null;
  const addressId = route.params?.addressId || null;
  const [prefectureValue, setPrefectureValue] = React.useState('');
  const [districtValue, setDistrictValue] = React.useState('');
  const [wardValue, setWardValue] = React.useState('');
  const prefectureRef = React.useRef();
  const districtRef = React.useRef();
  const wardRef = React.useRef();

  const setDefaultData = (data) => {
    setPrefectureValue(data.cityCode);
    setDistrictValue(data.districtCode);
    setWardValue(data.wardCode);
    dispatch(addressActions.getDistrict({parentCode: data.cityCode}));
    dispatch(addressActions.getWard({parentCode: data.districtCode}));
  };
  const addressDefaultValue =
    currentAddress && currentAddress.fullAddress
      ? currentAddress.fullAddress.split(',')
      : null;

  // PREFECTURE
  React.useEffect(() => {
    dispatch(addressActions.getPrefecture());
    if (addressId) {
      setDefaultData(currentAddress);
    }
  }, []);
  const prefectureList = useSelector((state) =>
    addressSelectors.getPrefecture(state),
  );
  const prefectureListData = () => {
    return prefectureList.map((item) => ({
      value: {
        value: item.code,
        label: item.name,
      },
      label: item.name,
    }));
  };

  // DISTRICT
  const getDistrictData = (value) => {
    if (value) {
      dispatch(addressActions.getDistrict({parentCode: value}));
    }
  };
  const districtList = useSelector((state) =>
    addressSelectors.getDistrict(state),
  );
  const districtListData = () => {
    return districtList.map((item) => ({
      value: {
        value: item.code,
        label: item.name,
      },
      label: item.name,
    }));
  };

  // WARD
  const getWardData = (value) => {
    if (value) {
      dispatch(addressActions.getWard({parentCode: value}));
    }
  };
  const wardList = useSelector((state) => addressSelectors.getWard(state));
  const wardListData = () => {
    return wardList?.map((item) => ({
      value: {
        value: item.code,
        label: item.name,
      },
      label: item.name,
    }));
  };

  const HeaderRightIcon = (props) => {
    const onPress = props.onPress ? props.onPress : () => {};
    return (
      <TouchableOpacity style={styles.headerIcon} onPress={onPress}>
        <MapIcon />
      </TouchableOpacity>
    );
  };

  const addUserAddress = async (values) => {
    const res = await addUserAddressApi({
      contactName: values.name,
      contactPhone: values.phone,
      cityCode: prefectureValue,
      districtCode: districtValue,
      wardCode: wardValue,
      address: values.address,
      priority: values.isDefault,
    });
    if (res.ok && res.data.status === POST_SUCCESS) {
      await dispatch(userActions.getUserAddress());
      navigation.goBack();
    }
  };

  const updateUserAddress = async (values) => {
    const res = await updateUserAddressApi({
      addressId: addressId,
      data: {
        contactName: values.name,
        contactPhone: values.phone,
        cityCode: prefectureValue,
        districtCode: districtValue,
        wardCode: wardValue,
        address: values.address,
        priority: values.isDefault,
      },
    });
    if (
      res.ok &&
      (res.data.status === POST_SUCCESS || res.data.status === SUCCESS)
    ) {
      await dispatch(userActions.getUserAddress());
      navigation.goBack();
    }
  };

  const actionButton = (values) => {
    if (addressId) {
      updateUserAddress(values);
    } else {
      addUserAddress(values);
    }
  };

  return (
    <ThemeView isFullView style={styles.container}>
      <Formik
        validateOnMount={true}
        initialValues={{
          name:
            currentAddress && currentAddress.contactName
              ? currentAddress.contactName
              : '',
          phone:
            currentAddress && currentAddress.contactPhone
              ? currentAddress.contactPhone
              : '',
          province: addressDefaultValue ? addressDefaultValue[3] : '',
          district: addressDefaultValue ? addressDefaultValue[2] : '',
          ward: addressDefaultValue ? addressDefaultValue[1] : '',
          address:
            currentAddress && currentAddress.address
              ? currentAddress.address
              : '',
          isDefault:
            currentAddress && typeof currentAddress.priority !== 'undefined'
              ? currentAddress.priority
              : true,
        }}
        onSubmit={actionButton}>
        {({handleSubmit, values, isValid, setFieldValue}) => {
          return (
            <>
              <Header
                title={I18n.t('settingAddress.addAddress')}
                rightIcon={<HeaderRightIcon onPress={handleSubmit} />}
                rightPress={() => {}}
                isDefault
              />
              <ScrollView>
                <View style={styles.scrollViewContent}>
                  <View style={styles.topMessage}>
                    {addressCount === 0 ? (
                      <Text style={styles.topMessagetext}>
                        {I18n.t('settingAddress.noAddress')}
                      </Text>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View style={styles.viewContactInfo}>
                    <View style={styles.viewStyle}>
                      <Text style={styles.topMessagetext}>
                        {I18n.t('settingAddress.contact')}
                      </Text>
                    </View>
                    <View style={styles.wrapContactInfo}>
                      <Field
                        component={CustomTextInput}
                        name="name"
                        validate={validateFullname}
                        label={I18n.t('settingProfile.name')}
                        style={styles.textInputStyle}
                      />
                      <Field
                        component={CustomTextInput}
                        name="phone"
                        validate={validatePhone}
                        label={I18n.t('settingProfile.phone')}
                        style={styles.textInputStyle}
                      />
                    </View>
                  </View>
                  <View style={styles.viewAddressInfo}>
                    <View style={styles.viewStyle}>
                      <Text style={styles.topMessagetext}>
                        {I18n.t('settingAddress.address')}
                      </Text>
                    </View>
                    <View style={styles.wrapAddressInfo}>
                      <TouchableOpacity
                        style={styles.addressButtonContainer}
                        onPress={() => {
                          if (Platform.OS === 'android') {
                            prefectureRef.current.focus();
                          } else {
                            prefectureRef.current.togglePicker(true);
                          }
                        }}>
                        <TouchableOpacity
                          style={styles.addressButton}
                          onPress={() => {
                            if (Platform.OS === 'android') {
                              prefectureRef.current.focus();
                            } else {
                              prefectureRef.current.togglePicker(true);
                            }
                          }}
                        />
                        <Field
                          editable={false}
                          component={CustomTextInput}
                          name="province"
                          validate={validatePrefecture}
                          label={I18n.t('settingAddress.province')}
                          onFocus={() => {
                            prefectureRef.current.togglePicker(true);
                          }}
                          style={styles.textInputStyle}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.addressButtonContainer}
                        onPress={() => {
                          if (Platform.OS === 'android') {
                            districtRef.current.focus();
                          } else {
                            districtRef.current.togglePicker(true);
                          }
                        }}>
                        <TouchableOpacity
                          style={styles.addressButton}
                          onPress={() => {
                            if (Platform.OS === 'android') {
                              districtRef.current.focus();
                            } else {
                              districtRef.current.togglePicker(true);
                            }
                          }}
                        />
                        <Field
                          editable={false}
                          component={CustomTextInput}
                          name="district"
                          validate={validateDistrict}
                          label={I18n.t('settingAddress.district')}
                          onFocus={() => {
                            districtRef.current.togglePicker(true);
                          }}
                          style={styles.textInputStyle}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.addressButtonContainer}
                        onPress={() => {
                          if (Platform.OS === 'android') {
                            wardRef.current.focus();
                          } else {
                            wardRef.current.togglePicker(true);
                          }
                        }}>
                        <TouchableOpacity
                          style={styles.addressButton}
                          onPress={() => {
                            if (Platform.OS === 'android') {
                              wardRef.current.focus();
                            } else {
                              wardRef.current.togglePicker(true);
                            }
                          }}
                        />
                        <Field
                          editable={false}
                          component={CustomTextInput}
                          name="ward"
                          validate={validateWard}
                          label={I18n.t('settingAddress.ward')}
                          style={styles.textInputStyle}
                          onPress={() => {
                            if (Platform.OS === 'android') {
                              wardRef.current.focus();
                            } else {
                              wardRef.current.togglePicker(true);
                            }
                          }}
                          onFocus={() => {
                            if (Platform.OS === 'android') {
                              wardRef.current.focus();
                            } else {
                              wardRef.current.togglePicker(true);
                            }
                          }}
                        />
                      </TouchableOpacity>
                      <Field
                        component={CustomTextInput}
                        name="address"
                        validate={validateAddress}
                        label={I18n.t('settingAddress.detailAddress')}
                        style={styles.textInputStyle}
                      />
                    </View>
                  </View>

                  <View style={styles.viewDivider} />
                  <View style={styles.viewSwitch}>
                    <View style={styles.viewSwitchText}>
                      <Text style={styles.labelSwitchText}>
                        {I18n.t('setting.setAddressAsDefault')}
                      </Text>
                    </View>
                    <View style={styles.viewSwitchButton}>
                      <Switch
                        value={values.isDefault}
                        onValueChange={() => {
                          setFieldValue('isDefault', !values.isDefault);
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.pickerContainer}>
                    <RNPickerSelect
                      ref={Platform.OS === 'ios' ? prefectureRef : null}
                      pickerProps={{
                        ref: Platform.OS === 'android' ? prefectureRef : null,
                      }}
                      onValueChange={(value) => {
                        setFieldValue('province', value?.label);
                        getDistrictData(value?.value);
                        setPrefectureValue(value?.value);
                        // district
                        setFieldValue('district', '');
                        setDistrictValue('');
                        // ward
                        setFieldValue('ward', '');
                        setWardValue('');
                        getWardData(0);
                      }}
                      items={prefectureListData()}
                      style={styles.pickerContainer}
                    />
                  </View>
                  <View style={styles.pickerContainer}>
                    <RNPickerSelect
                      ref={Platform.OS === 'ios' ? districtRef : null}
                      pickerProps={{
                        ref: Platform.OS === 'android' ? districtRef : null,
                      }}
                      onValueChange={(value) => {
                        setFieldValue('district', value?.label);
                        getWardData(value?.value);
                        setDistrictValue(value?.value);
                        // ward
                        setFieldValue('ward', '');
                        setWardValue('');
                      }}
                      items={districtListData()}
                      style={styles.pickerContainer}
                    />
                  </View>
                  <View style={styles.pickerContainer}>
                    <RNPickerSelect
                      ref={Platform.OS === 'ios' ? wardRef : null}
                      pickerProps={{
                        ref: Platform.OS === 'android' ? wardRef : null,
                      }}
                      onValueChange={(value) => {
                        setFieldValue('ward', value?.label);
                        setWardValue(value?.value);
                      }}
                      items={wardListData()}
                      style={styles.pickerContainer}
                    />
                  </View>
                </View>
              </ScrollView>
            </>
          );
        }}
      </Formik>
    </ThemeView>
  );
};

export default AddAddress;
