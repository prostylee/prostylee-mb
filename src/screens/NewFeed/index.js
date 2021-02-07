import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles'

import {ThemeView} from 'components'

import VerticalFeed from './VerticalFeed'

import {newFeedActions} from 'redux/reducers'

const NewFeed = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newFeedActions.getNewFeed({ 
      page: 1,
      limit: 12,
      newFeedType: "STORE"
    }));
  }, [])
  return (
    <ThemeView isFullView>
      <ScrollView
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
      >
        <View style={{height: 80}}></View>
        <VerticalFeed/>
      </ScrollView>
    </ThemeView>
  )
}

NewFeed.defaultProps = {
}

NewFeed.propTypes = {
}

export default NewFeed
