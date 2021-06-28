import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {
  getProductLocationSelector,
  getProductLocationLoadingSelector,
} from 'redux/selectors/postProduct';
import {ActivityIndicator} from 'react-native-paper';
import i18n from 'i18n';
import {Colors} from 'components';
import {cartActions} from 'reducers';
import {useRoute} from '@react-navigation/native';

const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon name="clockcircleo" size={15} color="grey" />
        <View style={styles.content}>
          <Text style={styles.Card}>{item.address}</Text>
          <Text style={styles.hintCard}>{item.hintLocation}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="delete" size={15} color="grey" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Project = ({isSearch = false, listAddress = [], historyAddress = []}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {params} = route;

  const getListAddressSelectorFunc =
    params?.getListAddressSelectorFunc || (() => {});

  const getListAddressHistorySelectorFunc =
    params?.getListAddressHistorySelectorFunc || (() => {});

  const getListAddressLoadingSelectorFunc =
    params?.getListAddressLoadingSelectorFunc || (() => {});

  const setSelectedAddressAction = params?.setSelectedAddressAction || {};

  const setSelectedAddressHistoryAction =
    params?.setSelectedAddressAction || {};

  const loading = useSelector((state) =>
    getListAddressLoadingSelectorFunc(state),
  );
  const historyAddress = useSelector((state) =>
    getListAddressHistorySelectorFunc(state),
  );
  const listAddress = useSelector((state) => getListAddressSelectorFunc(state));

  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => onItemPress(item)} />;
  };

  const onItemPress = (item) => {
    dispatch(setSelectedAddressAction(item));
    dispatch(setSelectedAddressHistoryAction(item));
  };
  return (
    <View style={styles.mainContainer}>
      {!isSearch ? (
        loading ? (
          <ActivityIndicator />
        ) : listLocation.length ? (
          <FlatList
            data={[...listAddress, ...historyAddress]}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={{color: Colors['$gray']}}>
            {i18n.t('Search.resultsNotfound')}
          </Text>
        )
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Project;
