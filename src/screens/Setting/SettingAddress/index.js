import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Header, ThemeView} from 'components';
import {useDispatch, useSelector} from 'react-redux';
import {userActions, userSelectors} from 'reducers';
import {LocationIcon, RightArrow, PlusSign} from 'svg/common';
import {Divider} from 'react-native-paper';
import styles from './styles';
import I18n from 'i18n';
import {useNavigation} from '@react-navigation/native';

const SettingAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.getUserAddress());
  }, []);

  const userAddress = useSelector((states) =>
    userSelectors.getUserAddress(states),
  );

  const FooterButton = () => {
    return (
      <>
        {userAddress.length ? <View style={{height: 6}} /> : null}
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingAddAddress')}>
          <View style={styles.addAddressButtonView}>
            <PlusSign />
            <Text style={{paddingLeft: 15}}>
              {I18n.t('setting.newAddress')}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.addressView}>
          <View style={styles.addressIconView}>
            <LocationIcon color="#8B9399" />
          </View>
          <View style={styles.addressDetailView}>
            <Text>
              {item.name} {item.phone}
            </Text>
            <Text style={styles.subText}>{item.address}</Text>
            <Text style={styles.subText}>{item.ward}</Text>
            <Text style={styles.subText}>{item.district}</Text>
            <Text style={styles.subText}>{item.province}</Text>
          </View>
          <View style={styles.addressDefaultView}>
            <Text style={styles.isDefaultText}>
              {item.isDefault === 1 ? I18n.t('setting.default') : ''}
            </Text>
            <RightArrow />
          </View>
        </View>
        {index !== userAddress.length - 1 ? <Divider /> : null}
      </>
    );
  };

  return (
    <ThemeView isFullView style={styles.container}>
      <Header title={I18n.t('setting.address')} isDefault />
      <FlatList
        style={{flex: 1}}
        data={userAddress || []}
        renderItem={renderItem}
        keyExtractor={(_, index) => `address_item_${index}`}
        ListFooterComponent={<FooterButton />}
      />
    </ThemeView>
  );
};

export default SettingAddress;
