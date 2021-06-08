import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import i18n from 'i18n';
import styles from './styles';
import {Sort, Filter, CaretDown} from 'svg/common';
import {ThemeView, Header, TextInputRounded, Colors} from 'components';
import {
  IconButton,
  Searchbar,
  RadioButton,
  Divider,
  Chip,
} from 'react-native-paper';

import StoreResult from './StoreResult';
import {useDispatch} from 'react-redux';
import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import TagList from './TagList';
import useLocation from '../../../hooks/useLocation';
import ProductSearchList from '../../../components/ProductSearchList';

const WIDTH = Dimensions.get('window').width;

const NearbyStore = ({navigation}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const _handleFilterByTag = (queryObject) => {
    dispatch(
      storeActions.getNearbyStore({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      storeActions.getNearbyStore({
        latitude: location.lat,
        longtitude: location.lon,
      }),
    );
  }, [location]);
  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        containerStyle={{
          paddingBottom: 10,
          borderBottomWidth: 0,
          // height: 50,
          borderBottomWidth: 1,
        }}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Cửa hàng gần đây
          </Text>
        }
      />
      <TagList onTagPress={_handleFilterByTag} />
      <Divider />
      <StoreResult navigation={navigation} />
    </ThemeView>
  );
};

NearbyStore.defaultProps = {};

NearbyStore.propTypes = {};

export default NearbyStore;
