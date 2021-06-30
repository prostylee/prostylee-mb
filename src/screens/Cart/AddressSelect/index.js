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
        {userAddress && userAddress.length ? (
          <View style={styles.dividerStyle} />
        ) : null}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SettingAddAddress', {
              addressCount:
                userAddress && userAddress.length ? userAddress.length : 0,
            })
          }>
          <View style={styles.addAddressButtonView}>
            <PlusSign />
            <Text style={styles.newAddressText}>
              {I18n.t('setting.newAddress')}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const RenderItem = ({item, index}) => {
    const [itemHeight, setItemHeight] = React.useState(0);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SettingAddAddress', {
            addressCount:
              userAddress && userAddress.length ? userAddress.length : 0,
            currentAddress: item,
            addressId: item.id,
          })
        }>
        <View
          style={styles.addressView}
          onLayout={(e) => setItemHeight(e.nativeEvent.layout.height)}>
          <View style={styles.addressIconView}>
            <LocationIcon color="#8B9399" />
          </View>
          <View style={styles.addressDetailView}>
            <Text>
              {item.contactName} {item.contactPhone}
            </Text>
            <Text style={styles.subText}>{item.fullAddress}</Text>
          </View>
          <View style={styles.addressDefaultView}>
            <Text style={styles.isDefaultText}>
              {item.priority === true ? I18n.t('setting.default') : ''}
            </Text>
          </View>
          <View style={[styles.rightArrowContainer, {top: itemHeight / 2 - 8}]}>
            <RightArrow />
          </View>
        </View>
        {userAddress && index !== userAddress.length - 1 ? <Divider /> : null}
      </TouchableOpacity>
    );
  };

  return (
    <ThemeView isFullView style={styles.container}>
      <Header title={I18n.t('setting.address')} isDefault />
      <FlatList
        style={styles.listContainer}
        data={userAddress || []}
        renderItem={({item, index}) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(_, index) => `address_item_${index}`}
        ListFooterComponent={<FooterButton />}
      />
    </ThemeView>
  );
};

export default SettingAddress;
