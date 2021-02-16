import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import i18n from 'i18n'

import styles from './styles'

import {ThemeView, Header} from 'components'

import {newFeedActions, storeActions} from 'redux/reducers'
import {
  getNewFeedSelector, 
  getHasLoadMoreSelector, 
  getPageSelector, 
  getLimitSelector,
  getLoadMoreLoadingSelector,
  getNewFeedLoadingSelector
} from 'redux/selectors/newFeed'
import {getTopProduct, getTopProductLoadingSelector} from 'redux/selectors/stores'

const PAGE_DEFAULT = 0
const LIMIT_DEFAULT = 12
const NUMBER_OF_PRODUCT = 3
const TYPE = 'STORE'

const Stores = (props) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false)

  const newFeedList = useSelector(state => getNewFeedSelector(state));
  const topProduct = useSelector(state => getTopProduct(state));
  const page = useSelector(state => getPageSelector(state));
  const limit = useSelector(state => getLimitSelector(state));
  const hasLoadMore = useSelector(state => getHasLoadMoreSelector(state));
  const loadMoreLoading = useSelector(state => getLoadMoreLoadingSelector(state));
  const newFeedLoading = useSelector(state => getNewFeedLoadingSelector(state));
  const topProductLoading = useSelector(state => getTopProductLoadingSelector(state));

  useEffect(() => {
    dispatch(newFeedActions.getNewFeed({ 
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      newFeedType: TYPE,
    }));
    dispatch(storeActions.getTopProduct({ 
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT - 2,
      numberOfProducts: NUMBER_OF_PRODUCT,
    }));
    handleRefreshing(false)
  }, [refreshing, handleRefresh])

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(newFeedActions.handleLoadMore({ 
        page: page + 1,
        limit: LIMIT_DEFAULT,
        newFeedType: TYPE,
    }));
    }
  }

  const handleRefresh = () => {
    handleRefreshing(true)
  }

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
       isDefault
       title={i18n.t('headerTitle.featured_store')}
        />
    </ThemeView>
  )
}

Stores.defaultProps = {
}

Stores.propTypes = {
}

export default Stores
