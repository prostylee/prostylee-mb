import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles'

import {ThemeView} from 'components'

import VerticalFeed from './VerticalFeed'

const NewFeed = (props) => {
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
