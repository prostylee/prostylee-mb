import React, {useState} from 'react';

import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import styles from './styles';
import {
  getProductLocationSelector,
  getProductLocationLoadingSelector,
} from 'redux/selectors/postProduct';
import {ActivityIndicator} from 'react-native-paper';
import i18n from 'i18n';
import {Colors} from 'components';

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

const Project = ({isSearch = false}) => {
  const loading = useSelector((state) =>
    getProductLocationLoadingSelector(state),
  );
  const listLocationSelector = useSelector((state) =>
    getProductLocationSelector(state),
  );
  const listLocation = listLocationSelector.content || [];

  console.log('LIST LOCATION', listLocationSelector);

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };
  return (
    <View style={styles.mainContainer}>
      {!isSearch ? (
        loading ? (
          <ActivityIndicator />
        ) : listLocation.length ? (
          <FlatList
            data={listLocation}
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
