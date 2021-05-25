import React, {useCallback, useState} from 'react';
import {Dimensions, View, Text, Image, TouchableOpacity} from 'react-native';
import i18n from 'i18n';

import styles from './styles';
import {Sort, Filter, CaretDown} from 'svg/common';
import {ThemeView, Header, TextInputRounded} from 'components';
import {IconButton, Searchbar, RadioButton, Divider} from 'react-native-paper';
import {Colors} from 'components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RnRatingTap, Picker} from 'components';

import SearchProductFilter from './SearchProductFilter';

const WIDTH = Dimensions.get('window').width;
import {debounce} from 'lodash';

const CustomBadge = ({content = '', size = ''}) => (
  <View style={styles.customBadge}>
    {content ? <Text>{content}</Text> : null}
  </View>
);
const GroupHeaderRightButton = () => {
  return (
    <View style={styles.headerGroupButtonRight}>
      <IconButton
        icon="message-outline"
        size={25}
        color={Colors['$lightGray']}
        style={{marginLeft: 0}}
      />
      <IconButton
        icon="bell-outline"
        size={25}
        color={Colors['$lightGray']}
        style={{marginLeft: 0}}
      />
    </View>
  );
};

const SearchProducts = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);
  const handlerSearch = useCallback(
    debounce((query) => {
      console.log('searchQuery');
      console.log(query);
    }, 1000),
    [],
  );

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
        }}
        middleComponent={
          <Searchbar
            style={{
              minWidth: WIDTH - 150,
              backgroundColor: '#F4F5F5',
              height: 35,
              borderRadius: 4,
              elevation: 0,
              padding: 0,
            }}
            inputStyle={{
              height: 35,
              fontSize: 14,
              lineHeight: 18,
              elevation: 0,
            }}
            placeholder={i18n.t('Search.inputPlaceholder')}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        }
        rightComponent={<GroupHeaderRightButton />}
      />
      <View style={styles.wrapBlockOne}>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View style={styles.contentBlockOne}>
            <View>
              <Sort />
            </View>
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('sort')}
            </Text>
            <View>
              <CaretDown />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FilterProduct')}>
          <View style={styles.wrapBlockFilter}>
            <Text numberOfLines={1} style={styles.textSpace}>
              |
            </Text>
            <Filter />
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('filter')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
      <Picker visible={visible} setVisible={setVisible} setAction={setAction}>
        <RadioButton.Group
          value={valueSort}
          onValueChange={(value) => setValueSort(value)}
          color="#823ffd">
          <RadioButton.Item label="Liên quan nhất" value="default" />
          <RadioButton.Item label="Phổ biến nhất" value="new" />
        </RadioButton.Group>
      </Picker>
      <View style={styles.wrapContent}></View>
    </ThemeView>
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProductFilter;
