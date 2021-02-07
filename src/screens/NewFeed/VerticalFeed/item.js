import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles'

import {Avatar} from 'react-native-paper'

import {ContainerView} from 'components'

import {Heart, Message, More} from 'svg/social';

import FeedSlide from './slide';

const VerticalFeedItem = ({newFeedItem}) => {
  return (
    <View style={styles.container}>
      <ContainerView style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          <Avatar.Image 
            size={32} 
            source={{uri: 'https://www.iphonehacks.com/wp-content/uploads/2020/07/ios-14-home-screen-widgets-alt.png'}} />
          <Text style={styles.textTitle}>{newFeedItem?.name}</Text>
        </View>
        <TouchableOpacity style={styles.wrapFollow}>
          <Text>Follow</Text>
        </TouchableOpacity>
      </ContainerView>
      <FeedSlide images= {newFeedItem?.imageUrls || []}/>
      <ContainerView style={styles.socialActionWrap}>
        <View style={styles.postAction}>
          <TouchableOpacity style={styles.touchHeart}>
            <Heart/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchMes}>
            <Message/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.touchOption}>
          <More/>
        </TouchableOpacity>
      </ContainerView>
    </View>
  )
}

VerticalFeedItem.defaultProps = {
}

VerticalFeedItem.propTypes = {
}

export default VerticalFeedItem
