import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles'

import {Header} from 'components'

import {Search, Bag, FeedStore, DubHeart} from 'svg/common'
import {Message} from 'svg/social';

const HeaderFeed = (props) => {
  return (
    <Header
      leftIcon={
        <TouchableOpacity style={styles.leftHeader}>
          <Search/>
        </TouchableOpacity>
      }
      middleComponent={
        <View style={styles.midHeader}>
          <View style={styles.midBorder}>
            <TouchableOpacity 
              style={styles.midTouch}>
              <FeedStore/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.midTouch}>
              <DubHeart/>
            </TouchableOpacity>
          </View>
        </View>
      }
      rightComponent={
        <View style={styles.rightHeader}>
          <TouchableOpacity 
            style={styles.touch}>
            <Message/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.touch}>
            <Bag/>
          </TouchableOpacity>
        </View>
      }
      />
  )
}

HeaderFeed.defaultProps = {
}

HeaderFeed.propTypes = {
}

export default HeaderFeed
