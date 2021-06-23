import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {
  ContainerWithoutScrollView,
  HeaderBack,
  ButtonRounded,
} from 'components';
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

const StoreAddress = (props) => {
  const navigation = props.navigation ? props.navigation : {};
  const route = useRoute();
  const storeId = route?.params?.storeId || '';
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [selectedAddress, setselectedAddress] = useState();

  const prefecture = useSelector((state) =>
    addressSelectors.getPrefecture(state),
  );
  const branchData = useSelector((state) =>
    branchSelectors.getBranchList(state),
  );
  console.log('branchData', branchData);

  React.useEffect(() => {
    dispatch(addressActions.getPrefecture());
  }, []);

  React.useEffect(() => {
    if (prefecture.length && !selectedAddress) {
      setselectedAddress(79);
    }
  }, [prefecture]);
  React.useEffect(() => {
    if (selectedAddress) {
      console.log(' branchActions.getBranch(');
      dispatch(
        branchActions.getBranch({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          storeId: storeId,
        }),
      );
    }
  }, [selectedAddress]);
  console.log('selectedAddress', selectedAddress);

  const getPrefectureList = () => {
    return prefecture.map((item) => ({
      label: item.name,
      value: item.code,
    }));
  };

  const Dropdown = () => {
    return (
      <View style={styles.dropDownContainer}>
        <Icon name="location-outline" color="grey" size={28} />
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
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <HeaderBack
          onBack={navigation.goBack}
          title={i18n.t('storeAddress.title')}
        />
        <Dropdown />
        <View style={styles.wrapper}>
          <ListStoreAddress style={styles.list} data={branchData} />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonRounded
            style={styles.button}
            label={i18n.t('storeAddress.button')}
          />
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};
export default StoreAddress;
