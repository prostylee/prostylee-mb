import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {Header, ButtonRounded, ThemeView} from 'components';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useTheme, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addressActions,
  addressSelectors,
  branchActions,
  branchSelectors,
} from 'reducers';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import ListStoreAddress from './ListStoreAddress';
import EmptyStore from './Empty';
import {MapPin} from 'svg/common';
import Colors from 'components/Colors';

const StoreAddress = (props) => {
  const navigation = props.navigation ? props.navigation : {};
  const route = useRoute();
  const storeId = route?.params?.storeId || '';
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [selectedAddress, setselectedAddress] = useState();

  const prefecture =
    useSelector((state) => branchSelectors.getBranchCityList(state)) || [];
  const branchData = useSelector((state) =>
    branchSelectors.getBranchList(state),
  );
  const branchDataLoading = useSelector((state) =>
    branchSelectors.getBranchListLoading(state),
  );

  React.useEffect(() => {
    dispatch(
      branchActions.getBranchCity({
        id: storeId,
      }),
    );
  }, []);

  React.useEffect(() => {
    if (selectedAddress) {
      dispatch(
        branchActions.getBranch({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          storeId: storeId,
          cityCode: selectedAddress,
        }),
      );
    }
  }, [selectedAddress]);

  const getPrefectureList = () => {
    return prefecture.map((item) => ({
      label: item.cityName,
      value: item.cityCode,
    }));
  };

  const Dropdown = () => {
    return (
      <View style={styles.dropDownContainer}>
        <MapPin width={24} height={24} />
        <View style={styles.dropDown}>
          <RNPickerSelect
            value={selectedAddress}
            onValueChange={(value) => setselectedAddress(value)}
            items={getPrefectureList()}
            onDonePress={(value) => setselectedAddress(value)}
            pickerProps={{
              selectedValue: selectedAddress,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        middleComponent={
          <Text style={styles.headerTitle}>{i18n.t('storeAddress.title')}</Text>
        }
      />
      <Dropdown />
      {!prefecture?.length || !branchData?.length ? (
        <EmptyStore cityList={prefecture} branchList={branchData} />
      ) : (
        <>
          <View style={styles.wrapper}>
            {branchDataLoading ? (
              <View>
                <ActivityIndicator size={'large'} color={Colors.gray} />
              </View>
            ) : (
              <ListStoreAddress style={styles.list} data={branchData} />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <ButtonRounded
              style={styles.button}
              label={i18n.t('storeAddress.button')}
            />
          </View>
        </>
      )}
    </ThemeView>
  );
};
export default StoreAddress;
