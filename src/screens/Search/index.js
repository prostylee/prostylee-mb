import React, {useCallback} from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, TextInputRounded} from 'components';
import {Searchbar} from 'react-native-paper';
import TopSearch from './TopSearch';
import FeaturedCategories from './FeaturedCategories';
import SearchResult from './SearchResult';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
import {searchActions} from 'redux/reducers';
let timeoutSearch = null;
const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => {
    clearTimeout(timeoutSearch);
    setSearchQuery(query);
    timeoutSearch = setTimeout(() => {
      dispatch(
        searchActions.getHintProductSearch({
          keyword: query,
          type: 'product',
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
        }),
      );
      dispatch(
        searchActions.getFeaturedProductSearch({
          keyword: query,
          // type: 'product',
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
        }),
      );
      dispatch(
        searchActions.getStoreSearch({
          keyword: query,
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          sorts: 'name',
        }),
      );
    }, 1000);
  };
  React.useEffect(() => {
    if (!searchQuery) {
      dispatch(
        searchActions.setCurrentKeyword({
          keyword: '',
        }),
      );
    }
  }, [searchQuery]);

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
            style={styles.wrapSearchBar}
            inputStyle={styles.wrapSearchBarInput}
            placeholder={i18n.t('Search.inputPlaceholder')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={() => {
              navigation.navigate('SearchProducts');
            }}
          />
        }
      />
      <View style={styles.wrapContent}>
        {searchQuery === '' ? (
          <>
            <TopSearch navigation={navigation} />
            <FeaturedCategories navigation={navigation} />
          </>
        ) : (
          <SearchResult navigation={navigation} />
        )}
      </View>
    </ThemeView>
  );
};

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
