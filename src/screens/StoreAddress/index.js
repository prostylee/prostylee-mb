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
import {useTheme} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import ListStoreAddress from './ListStoreAddress';

const StoreAddress = (props) => {
  const navigation = props.navigation ? props.navigation : {};
  const {colors} = useTheme();
  const [selectedAddress, setselectedAddress] = useState('HCM');
  const Dropdown = () => {
    return (
      <View style={styles.dropDownContainer}>
        <Icon name="location-outline" color="grey" size={28} />
        <View style={{width: 200, marginHorizontal: -10}}>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              {label: 'Football', value: 'football'},
              {label: 'Baseball', value: 'baseball'},
              {label: 'Hockey', value: 'hockey'},
            ]}
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
