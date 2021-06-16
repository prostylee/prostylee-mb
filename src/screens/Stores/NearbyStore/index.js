import React, {useEffect} from 'react';
import {Text} from 'react-native';
import i18n from 'i18n';
import styles from './styles';

import {ThemeView, Header} from 'components';
import {Divider} from 'react-native-paper';

import StoreResult from './StoreResult';
import {useDispatch} from 'react-redux';
import {storeActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import TagList from './TagList';
import useLocation from '../../../hooks/useLocation';

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
      <TagList onTagPress={_handleFilterByTag} />
      <Divider />
      <StoreResult navigation={navigation} />
    </ThemeView>
  );
};

NearbyStore.defaultProps = {};

NearbyStore.propTypes = {};

export default NearbyStore;
