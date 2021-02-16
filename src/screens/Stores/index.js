import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, FlatList} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import { isEmpty } from 'lodash'
import i18n from 'i18n'

import styles from './styles'

import StoreItem from './item'

import {ThemeView, Header} from 'components'

import {storeActions} from 'redux/reducers'

import {
  getLoadingFuturedStoresSelector,
  listOfFuturedStoresSelector,
} from 'redux/selectors/stores'

const PAGE_DEFAULT = 0
const LIMIT_DEFAULT = 12

const Stores = (props) => {
  const dispatch = useDispatch();

  const loading = useSelector(state => getLoadingFuturedStoresSelector(state));
  const listOfFuturedStores = useSelector(state => listOfFuturedStoresSelector(state));

  if (isEmpty(listOfFuturedStores)) return null

  const listData = listOfFuturedStores?.content || []

  useEffect(() => {
    dispatch(storeActions.getListOfFuturedStore({ 
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
    }))
  }, [])

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
       isDefault
       title={i18n.t('headerTitle.featured_store')}
      />
       <FlatList
        data={listData}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, _i }) => (
          <StoreItem
            key = {'stores' + _i}
            storeItem={item}
          /> 
          )}
        onEndReached={() => {}}
        // refreshing={refreshing}
        // onRefresh={handleRefresh}
        // ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        initialNumToRender={10} 
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
    />
    </ThemeView>
  )
}

Stores.defaultProps = {
}

Stores.propTypes = {
}

export default Stores
