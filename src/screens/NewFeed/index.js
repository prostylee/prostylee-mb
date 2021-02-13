import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import styles from './styles'

import {ThemeView} from 'components'

import VerticalFeed from './VerticalFeed'
import HeaderFeed from './HeaderFeed'
import TopTrending from './TopTrending'

import {newFeedActions, storeActions} from 'redux/reducers'
import {getNewFeedSelector} from 'redux/selectors/newFeed'
import {getTopProduct} from 'redux/selectors/stores'

const NewFeed = (props) => {
  const dispatch = useDispatch();
  const newFeedList = useSelector(state => getNewFeedSelector(state));
  const topProduct = useSelector(state => getTopProduct(state));
  console.log(newFeedList)
  useEffect(() => {
    dispatch(newFeedActions.getNewFeed({ 
      page: 0,
      limit: 12,
      newFeedType: "STORE"
    }));
    dispatch(storeActions.getTopProduct({ 
      page: 0,
      limit: 10,
      numberOfProducts: 3,
    }));
  }, [])
  return (
    <ThemeView isFullView>
      <HeaderFeed/>
      <ScrollView
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
      >
        <TopTrending topProduct={topProduct}/>
        <VerticalFeed newFeedList={newFeedList}/>
      </ScrollView>
    </ThemeView>
  )
}

NewFeed.defaultProps = {
}

NewFeed.propTypes = {
}

export default NewFeed
