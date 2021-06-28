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
import {useDispatch, useSelector} from 'react-redux';
import {Header, ThemeView} from 'components';
import GroupHeaderRightButton from './HeaderRightButton';
import i18n from 'i18n';
import {useRoute} from '@react-navigation/native';
// postProductActions.getListLocation;

const AddressRecent = ({navigation}) => {
  const route = useRoute();

  const getListAddressAction = route?.params?.getListAddressAction || null;

  const dispatch = useDispatch();
  const WIDTH = Dimensions.get('window').width;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearch, setIsSearch] = useState(false);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
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
            onFocus={() => {
              navigation.navigate('AddressTyping');
            }}
          />
        }
        rightComponent={<GroupHeaderRightButton haveNoti={true} />}
      />

      <View style={{padding: 10, color: 'gray'}}>
        <Text style={{color: 'grey', fontSize: 14}}>
          {i18n.t('addProduct.selectedAddress')}
        </Text>
      </View>
      <ListAddress />
    </ThemeView>
  );
};
export default AddressRecent;
