import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {
  ContainerWithoutScrollView,
  HeaderBack,
  ButtonRounded,
} from 'components';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addressActions, addressSelectors, branchActions} from 'reducers';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import ListStoreAddress from './ListStoreAddress';

const StoreAddress = (props) => {
  const navigation = props.navigation ? props.navigation : {};
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [selectedAddress, setselectedAddress] = useState();

  const prefecture = useSelector((state) =>
    addressSelectors.getPrefecture(state),
  );
  const branchData = useSelector((state) =>
    addressSelectors.getPrefecture(state),
  );

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
      dispatch(
        branchActions.getBranch({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
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
          <ListStoreAddress style={styles.list} />
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
