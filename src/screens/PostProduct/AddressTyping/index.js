import React, {useEffect, useState} from 'react';

import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import styles from './styles';
import ListAddress from './ListAddress';
import {postProductActions} from 'redux/reducers';
import {useDispatch} from 'react-redux';
import {Header, ThemeView} from 'components';
import GroupHeaderRightButton from './HeaderRightButton';
import i18n from 'i18n';

const AddressTyping = (navigation) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    handlerSearch(query);
  };
  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        containerStyle={{
          paddingBottom: 5,
          borderBottomWidth: 0,
        }}
        leftStyle={{
          height: 30,
          justifyContent: 'center',
        }}
        middleComponent={
          <Searchbar
            style={styles.search}
            inputStyle={{
              height: '100%',
              fontSize: 14,
              lineHeight: 16,
              elevation: 0,
              numberOfLines: 1,
              overflow: 'hidden',
            }}
            multiline={false}
            placeholder={i18n.t('Search.inputPlaceholder')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            defaultValue={searchQuery}
          />
        }
        rightComponent={<GroupHeaderRightButton haveNoti={true} />}
      />
      <ListAddress />
    </ThemeView>
  );
};
export default AddressTyping;
