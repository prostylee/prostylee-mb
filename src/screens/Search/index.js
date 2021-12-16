import React from 'react';
import {View, Platform} from 'react-native';
import i18n from 'i18n';
import styles from './styles';

import {ThemeView, Header, SearchBar} from 'components';
import TopSearch from './TopSearch';
import FeaturedCategories from './FeaturedCategories';
import SearchResult from './SearchResult';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions, storeProfileActions} from 'redux/reducers';
import {getCurrentKeyword} from 'redux/selectors/search';
import {useIsFocused} from '@react-navigation/native';
let timeoutSearch = null;
const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));
  const [searchQuery, setSearchQuery] = React.useState(currentKeyword);

  const onChangeSearch = (query) => {
    clearTimeout(timeoutSearch);
    setSearchQuery(query);
    dispatch(searchActions.setHintProductSearchLoading(true));
    dispatch(searchActions.setStoreSearchLoading(true));

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
        searchActions.getStoreSearch({
          keyword: query,
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          sorts: 'name',
          numberOfProducts: 10,
        }),
      );

      dispatch(searchActions.setCurrentKeyword(query));
    }, 1000);
  };
  React.useEffect(() => {
    if (!searchQuery) {
      dispatch(searchActions.setCurrentKeyword(''));
    }
  }, [searchQuery]);
  React.useEffect(() => {
    setSearchQuery(currentKeyword);
  }, [currentKeyword]);
  React.useEffect(() => {
    if (isFocused) {
      dispatch(searchActions.clearProductsFilterState());
      dispatch(storeProfileActions.clearStoreProfileFilterState());
    }
  }, [isFocused]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        containerStyle={{
          paddingBottom: 5,
        }}
        leftStyle={{
          height: 30,
          paddingRight: 4,
        }}
        middleComponent={
          <SearchBar
            style={styles.wrapSearchBar}
            inputStyle={styles.wrapSearchBarInput}
            placeholder={i18n.t('Search.inputPlaceholder')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            multiline={false}
            onClear={() => onChangeSearch('')}
            onSubmitEditing={() => {
              navigation.navigate('SearchProducts');
              dispatch(
                searchActions.getStoreSearch({
                  keyword: searchQuery,
                  page: PAGE_DEFAULT,
                  limit: LIMIT_DEFAULT,
                  sorts: 'name',
                  numberOfProducts: 10,
                }),
              );
            }}
          />
        }
        rightComponent={<View style={{width: 16}} />}
      />
      <View style={styles.wrapContent}>
        <SearchResult navigation={navigation} />
        {searchQuery === '' ? (
          <View style={styles.wrapSuggestion}>
            <TopSearch navigation={navigation} />
            <FeaturedCategories navigation={navigation} />
          </View>
        ) : null}
      </View>
    </ThemeView>
  );
};

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
