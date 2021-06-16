import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Divider} from 'react-native-paper';
import {searchActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch} from 'react-redux';
const ResultProductSearchResultItem = ({item, index, navigation}) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(searchActions.setCurrentKeyword(item));
    dispatch(
      searchActions.getProductsSearch({
        keyword: item,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
      }),
    );
    dispatch(
      searchActions.getStoreSearch({
        keyword: item,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        numberOfProducts: 10,
      }),
    );
    dispatch(
      searchActions.getHintProductSearch({
        keyword: item,
        type: 'product',
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    navigation.navigate('SearchProducts');
  };
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity
        onPress={() => {
          handlePress(item);
        }}>
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      </TouchableOpacity>
      <View style={{paddingLeft: 16, paddingRight: 16}}>
        <Divider />
      </View>
    </View>
  );
};

ResultProductSearchResultItem.defaultProps = {};

ResultProductSearchResultItem.propTypes = {};

export default ResultProductSearchResultItem;
