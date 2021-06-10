import React, {useState} from 'react';

import {View, TouchableOpacity, Dimensions} from 'react-native';
import {Header, ButtonRounded, ThemeView} from 'components';
import {Searchbar} from 'react-native-paper';
import i18n from 'i18n';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

import styles from './styles';
import ListBrand from './ListBrands';
const Brands = (props) => {
  const {colors} = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedBrand, setSelectedBrand] = React.useState();
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        leftIcon={
          <IonIcons name={'ios-close'} size={24} color={colors['$black']} />
        }
        title={i18n.t('addProduct.brandFashionsTitle')}
        containerStyle={styles.header}
      />
      <View style={styles.searchBarContainer}>
        <Searchbar
          style={styles.searchBarStyle}
          inputStyle={styles.searchBarInput}
          placeholder={'Tìm kiếm'}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ListBrand
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />
      <View style={styles.button}>
        <TouchableOpacity>
          <ButtonRounded
            label="Chọn"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </TouchableOpacity>
      </View>
    </ThemeView>
  );
};
export default Brands;
