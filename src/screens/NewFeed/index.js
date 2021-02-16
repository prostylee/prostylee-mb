import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import styles from './styles'

import {ThemeView} from 'components'

import VerticalFeed from './VerticalFeed'
import HeaderFeed from './HeaderFeed'
import TopTrending from './TopTrending'

import {newFeedActions, storeActions} from 'redux/reducers'
import {
  getNewFeedSelector, 
  getHasLoadMoreSelector, 
  getPageSelector, 
  getLimitSelector,
  getLoadMoreLoadingSelector,
} from 'redux/selectors/newFeed'
import {getTopProduct} from 'redux/selectors/stores'

const PAGE_DEFAULT = 0
const LIMIT_DEFAULT = 12
const NUMBER_OF_PRODUCT = 3
const TYPE = 'STORE'

const NewFeed = (props) => {
  const dispatch = useDispatch();
  const [refreshing, handleRefreshing] = useState(false)

  const newFeedList = useSelector(state => getNewFeedSelector(state));
  const topProduct = useSelector(state => getTopProduct(state));
  const page = useSelector(state => getPageSelector(state));
  const limit = useSelector(state => getLimitSelector(state));
  const hasLoadMore = useSelector(state => getHasLoadMoreSelector(state));
  const loadMoreLoading = useSelector(state => getLoadMoreLoadingSelector(state));

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
    <ThemeView isFullView>
      <HeaderFeed/>
      <ScrollView
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
      >
        <TopTrending topProduct={topProduct}/>
        <VerticalFeed
          handleRefresh={handleRefresh}
          handleLoadMore={handleLoadMore} 
          newFeedList={newFeedList}
          refreshing={refreshing}
          loadMoreLoading={loadMoreLoading}
          />
      </ScrollView>
    </ThemeView>
  )
}

NewFeed.defaultProps = {
}

NewFeed.propTypes = {
}

export default NewFeed
