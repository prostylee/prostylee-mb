import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import i18n from 'i18n';
import styles from './styles';

import {ThemeView, Header, TagList} from 'components';
import {Divider} from 'react-native-paper';

import StoreResult from './StoreResult';
import {useDispatch, useSelector} from 'react-redux';
import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {userSelectors} from 'reducers';

const NearbyStore = ({navigation}) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => userSelectors.getUserLocation(state));

  const [filterTags, setFilterTags] = useState([
    {
      label: 'Gần đây',
      value: {
        latitude: location?.lat || 10.806406363857086,
        longitude: location?.lon || 106.6634168400805,
      },
    },
    {
      label: 'Best-seller',
      value: {
        bestSeller: true,
      },
    },
    {
      label: 'Sale',
      value: {
        sale: true,
      },
    },
  ]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      setFilterTags([
        {
          label: 'Gần đây',
          value: {
            latitude: location?.lat,
            longitude: location?.lon,
          },
        },
        {
          label: 'Best-seller',
          value: {
            bestSeller: true,
          },
        },
        {
          label: 'Sale',
          value: {
            sale: true,
          },
        },
      ]);
    }
  }, [location?.lat, location?.lon]);

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
        latitude: location?.lat,
        longtitude: location?.lon,
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
          borderBottomWidth: 1,
        }}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        title={i18n.t('stores.textNear')}
      />
      <TagList onTagPress={_handleFilterByTag} options={filterTags} />
      <Divider />
      <StoreResult navigation={navigation} />
    </ThemeView>
  );
};

NearbyStore.defaultProps = {};

NearbyStore.propTypes = {};

export default NearbyStore;
