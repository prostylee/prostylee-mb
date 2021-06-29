import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text
          style={styles.Card}>{`${item?.addressNumber} ${item?.street}`}</Text>
        <Text
          style={styles.hintCard}>{`${item?.districts} ${item?.city}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListAddress = ({data = []}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const getListAddressAction = route?.params?.getListAddressAction || null;
  const setSelectedAddressAction =
    route?.params?.setSelectedAddressAction || null;
  const setSelectedAddressHistoryAction =
    route?.params?.setSelectedAddressHistoryAction || null;

  const goBackScreen = route?.params?.goBackScreen || '';

  const _handlePress = (item) => {
    navigation.navigate('Maps', {
      pickedLocation: {...item},
      goBackScreen: goBackScreen,
      setSelectedAddressAction: setSelectedAddressAction,
      setSelectedAddressHistoryAction: setSelectedAddressHistoryAction,
      getListAddressAction: getListAddressAction,
    });
  };
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => _handlePress(item)} />;
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + item?.fullAddress}
      />
    </View>
  );
};

export default ListAddress;
