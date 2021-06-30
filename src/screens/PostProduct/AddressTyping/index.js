import React, {useEffect, useState} from 'react';

import {Text, View} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';
import styles from './styles';
import ListAddress from './ListAddress';
import {postProductActions} from 'redux/reducers';

import {Header, ThemeView} from 'components';
import GroupHeaderRightButton from './HeaderRightButton';
import i18n from 'i18n';
import Geocoder from 'react-native-geocoding';
import {debounce} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {userSelectors} from 'reducers';
import {userActions} from 'redux/reducers';
import {SearchBar} from 'components';
import {useRoute} from '@react-navigation/native';

const mock = {
  plus_code: {
    compound_code: 'QMPW+V3 Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
    global_code: '7P28QMPW+V3',
  },
  results: [
    {
      address_components: [
        {
          long_name: '44',
          short_name: '44',
          types: ['street_number'],
        },
        {
          long_name: 'Phùng Khắc Khoan',
          short_name: 'Phùng Khắc Khoan',
          types: ['route'],
        },
        {
          long_name: 'Quận 1',
          short_name: 'Quận 1',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Thành phố Hồ Chí Minh',
          short_name: 'Thành phố Hồ Chí Minh',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Việt Nam',
          short_name: 'VN',
          types: ['country', 'political'],
        },
      ],
      formatted_address:
        '44 Phùng Khắc Khoan, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
      geometry: {
        location: {
          lat: 10.8873864,
          lng: 106.7952546,
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: 10.7887353802915,
            lng: 106.6966035802915,
          },
          southwest: {
            lat: 10.7860374197085,
            lng: 106.6939056197085,
          },
        },
      },
      place_id: 'ChIJrUl_kjQvdTERvMxskGW7wZM',
      plus_code: {
        compound_code: 'QMPW+X4 Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
        global_code: '7P28QMPW+X4',
      },
      types: ['street_address'],
    },
    {
      address_components: [
        {
          long_name: 'Số 23',
          short_name: 'Số 23',
          types: ['street_number'],
        },
        {
          long_name: 'Phùng Khắc Khoan',
          short_name: 'Phùng Khắc Khoan',
          types: ['route'],
        },
        {
          long_name: 'Quận 1',
          short_name: 'Quận 1',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Thành phố Hồ Chí Minh',
          short_name: 'Thành phố Hồ Chí Minh',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Việt Nam',
          short_name: 'VN',
          types: ['country', 'political'],
        },
      ],
      formatted_address:
        'Số 23 Phùng Khắc Khoan, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
      geometry: {
        location: {
          lat: 10.806406363857086,
          lng: 106.6634168400805,
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: 10.7886318802915,
            lng: 106.6965052802915,
          },
          southwest: {
            lat: 10.7859339197085,
            lng: 106.6938073197085,
          },
        },
      },
      place_id: 'ChIJ_WPBjTQvdTERMH3NybifB00',
      plus_code: {
        compound_code: 'QMPW+W3 Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
        global_code: '7P28QMPW+W3',
      },
      types: [
        'establishment',
        'health',
        'pharmacy',
        'point_of_interest',
        'store',
      ],
    },
    {
      address_components: [
        {
          long_name: '44',
          short_name: '44',
          types: ['street_number'],
        },
        {
          long_name: 'Phùng Khắc Khoan',
          short_name: 'Phùng Khắc Khoan',
          types: ['route'],
        },
        {
          long_name: 'Quận 1',
          short_name: 'Quận 1',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Thành phố Hồ Chí Minh',
          short_name: 'Thành phố Hồ Chí Minh',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Việt Nam',
          short_name: 'VN',
          types: ['country', 'political'],
        },
      ],
      formatted_address:
        '44 Phùng Khắc Khoan, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
      geometry: {
        bounds: {
          northeast: {
            lat: 10.787566,
            lng: 106.6953976,
          },
          southwest: {
            lat: 10.7873614,
            lng: 106.6951772,
          },
        },
        location: {
          lat: 10.7874814,
          lng: 106.6952932,
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: 10.7888126802915,
            lng: 106.6966363802915,
          },
          southwest: {
            lat: 10.7861147197085,
            lng: 106.6939384197085,
          },
        },
      },
      place_id: 'ChIJf7j0kjQvdTERDa8fpC0fNf0',
      types: ['premise'],
    },
    {
      address_components: [
        {
          long_name: '40',
          short_name: '40',
          types: ['street_number'],
        },
        {
          long_name: 'Phùng Khắc Khoan',
          short_name: 'Phùng Khắc Khoan',
          types: ['route'],
        },
        {
          long_name: 'Quận 1',
          short_name: 'Quận 1',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Thành phố Hồ Chí Minh',
          short_name: 'Thành phố Hồ Chí Minh',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Việt Nam',
          short_name: 'VN',
          types: ['country', 'political'],
        },
      ],
      formatted_address:
        '40 Phùng Khắc Khoan, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
      geometry: {
        location: {
          lat: 10.7872047,
          lng: 106.6950985,
        },
        location_type: 'RANGE_INTERPOLATED',
        viewport: {
          northeast: {
            lat: 10.7885536802915,
            lng: 106.6964474802915,
          },
          southwest: {
            lat: 10.7858557197085,
            lng: 106.6937495197085,
          },
        },
      },
      place_id:
        'Ek80MCBQaMO5bmcgS2jhuq9jIEtob2FuLCDEkGEgS2FvLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFtIhoSGAoUChIJCxqEjDQvdTERPwqXE3EuJCMQKA',
      types: ['street_address'],
    },
    {
      address_components: [
        {
          long_name: '65-37',
          short_name: '65-37',
          types: ['street_number'],
        },
        {
          long_name: 'Phùng Khắc Khoan',
          short_name: 'Phùng Khắc Khoan',
          types: ['route'],
        },
        {
          long_name: 'Quận 1',
          short_name: 'Quận 1',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Thành phố Hồ Chí Minh',
          short_name: 'Thành phố Hồ Chí Minh',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Việt Nam',
          short_name: 'VN',
          types: ['country', 'political'],
        },
      ],
      formatted_address:
        '65-37 Phùng Khắc Khoan, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
      geometry: {
        bounds: {
          northeast: {
            lat: 10.7875195,
            lng: 106.6958004,
          },
          southwest: {
            lat: 10.7865678,
            lng: 106.6947516,
          },
        },
        location: {
          lat: 10.7870437,
          lng: 106.695276,
        },
        location_type: 'GEOMETRIC_CENTER',
        viewport: {
          northeast: {
            lat: 10.7883926302915,
            lng: 106.6966249802915,
          },
          southwest: {
            lat: 10.7856946697085,
            lng: 106.6939270197085,
          },
        },
      },
      place_id: 'ChIJCxqEjDQvdTERPgqXE3EuJCM',
      types: ['route'],
    },
  ],
  status: 'OK',
};

const AddressTyping = (navigation) => {
  const route = useRoute();
  const dispatch = useDispatch();

  const getListAddressAction = route?.params?.getListAddressAction || null;
  const getListAddressSelectorFunc =
    route?.params?.getListAddressSelectorFunc || null;
  const getListAddressHistorySelectorFunc =
    route?.params?.getListAddressHistorySelectorFunc || null;
  const getListAddressLoadingSelectorFunc =
    route?.params?.getListAddressLoadingSelectorFunc || null;

  const locationRedux =
    useSelector((state) => userSelectors.getUserLocation(state)) || {};
  const lat = locationRedux?.lat || 10.806406363857086;
  const lon = locationRedux?.lon || 106.6634168400805;
  const maxLat = parseFloat(lat) + 0.0003;
  const maxLon = parseFloat(lon) + 0.01;
  const minLat = parseFloat(lat) - 0.0003;
  const minLon = parseFloat(lon) - 0.01;

  const isListAddressLoading =
    useSelector((state) => getListAddressLoadingSelectorFunc(state)) || false;
  const listAddress =
    useSelector((state) => getListAddressSelectorFunc(state)) || [];
  const listHistoryAddress =
    useSelector((state) => getListAddressHistorySelectorFunc(state)) || [];

  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLocation, setListLocation] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [listUserLocation, setListUserLocation] = useState([
    ...listAddress,
    ...listHistoryAddress,
  ]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    getAddress(query);
  };

  const getAddress = debounce(
    async (keyword) => {
      try {
        setLoading(true);
        // const json = await Geocoder.from(keyword, {
        //   southwest: {lat: minLat, lng: minLon},
        //   northeast: {lat: maxLat, lng: maxLon},
        // });
        // console.log('JSON',JSON.stringify(json,null,2))
        let arrayLocation = mock.results?.map((item) => formatAddress(item));
        setListLocation(arrayLocation);
      } catch (err) {
        console.log('GET ADDRESS ERR', err);
      } finally {
        setLoading(false);
      }
    },
    1000,
    {trailing: true, leading: false, maxWait: 4000},
  );
  const formatAddress = (result) => {
    let addressNumber = 0,
      street = '',
      districts = '',
      ward = '',
      city = '',
      fullAddress = '',
      lat = 0,
      lon = 0;
    if (
      result &&
      result?.address_components &&
      result?.address_components?.length
    ) {
      result.address_components.map((item) => {
        if (item.types[0] === 'street_number') {
          addressNumber = item.long_name;
        }
        if (item.types[0] === 'route') {
          street = item.long_name;
        }
        if (item.types[0] === 'administrative_area_level_2') {
          districts = item.long_name;
        }
        if (item.types[0] === 'administrative_area_level_1') {
          city = item.long_name;
        }
        return item;
      });
    }
    fullAddress = result?.formatted_address || '';
    lat = result.geometry.location.lat;
    lon = result.geometry.location.lng;
    return {
      addressNumber,
      street,
      districts,
      city,
      fullAddress,
      lat,
      lon,
    };
  };
  useEffect(() => {
    if (!searchQuery && isTyping) {
      setIsTyping(false);
      return;
    }
    if (searchQuery && !isTyping) {
      setIsTyping(true);
      return;
    }
  }, [searchQuery]);
  useEffect(() => {
    dispatch(
      getListAddressAction({
        page: 0,
        limit: 12,
      }),
    );
  }, []);
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
          <SearchBar
            style={styles.search}
            multiline={false}
            placeholder={i18n.t('cart.address')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            defaultValue={searchQuery}
            placeholderTextColor="#555"
          />
        }
        rightComponent={<GroupHeaderRightButton haveNoti={true} />}
      />
      {!isTyping ? (
        <>
          <View style={{padding: 10, color: 'gray'}}>
            <Text style={{color: 'grey', fontSize: 14}}>
              {i18n.t('addProduct.selectedAddress')}
            </Text>
          </View>
          <ListAddress data={listUserLocation} />
        </>
      ) : loading ? (
        <View style={styles.indicatorView}>
          <ActivityIndicator />
        </View>
      ) : (
        <ListAddress data={listLocation} />
      )}
    </ThemeView>
  );
};
export default AddressTyping;
