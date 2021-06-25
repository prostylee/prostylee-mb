import React, {useEffect} from 'react';
import {Text} from 'react-native';
import i18n from 'i18n';
import styles from './styles';

import {ThemeView, Header, TagList} from 'components';
import {Divider} from 'react-native-paper';

import StoreResult from './StoreResult';
import {useDispatch} from 'react-redux';
import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import useLocation from 'hooks/useLocation';

const NearbyStore = ({navigation}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const FILTER_TAGS = [
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
  ];

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
            {i18n.t('stores.textNear')}
          </Text>
        }
      />
      <TagList onTagPress={_handleFilterByTag} options={FILTER_TAGS} />
      <Divider />
      <StoreResult navigation={navigation} />
    </ThemeView>
  );
};

NearbyStore.defaultProps = {};

NearbyStore.propTypes = {};

export default NearbyStore;
