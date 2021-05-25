import React, {useCallback} from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, TextInputRounded} from 'components';
import {Searchbar} from 'react-native-paper';
import TopSearch from './TopSearch';
import FeaturedCategories from './FeaturedCategories';
import SearchResult from './SearchResult';
const WIDTH = Dimensions.get('window').width;
import {debounce} from 'lodash';

const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
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
        }}
        leftStyle={{
          height: 30,
        }}
        middleComponent={
          <Searchbar
            style={{
              width: WIDTH - 60,
              backgroundColor: '#F4F5F5',
              height: 35,
              borderRadius: 0,
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
      />
      <View style={styles.wrapContent}>
        {searchQuery === '' ? (
          <>
            <TopSearch />
            <FeaturedCategories />
          </>
        ) : (
          <SearchResult />
        )}
      </View>
    </ThemeView>
  );
};

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
