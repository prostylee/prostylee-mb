import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles'
import i18n from 'i18n'
import {isEmpty} from 'lodash'

import {Avatar} from 'react-native-paper'

import {ContainerView} from 'components'

import {Heart, Message, More} from 'svg/social';

import FeedSlide from './slide';

const VerticalFeedItem = ({newFeedItem}) => {
  if (isEmpty(newFeedItem)) return null;
  
  const disCountPer = newFeedItem?.priceSale / newFeedItem?.price

  return (
    <View style={styles.container}>
      <ContainerView style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          <Avatar.Image 
            size={32} 
            source={{uri: 'https://www.iphonehacks.com/wp-content/uploads/2020/07/ios-14-home-screen-widgets-alt.png'}} />
          <Text numberOfLines={1} style={styles.textTitle}>{newFeedItem?.name}</Text>
        </View>
        <TouchableOpacity style={styles.wrapFollow}>
          <Text style={styles.textFollow}>{i18n.t('common.textFollow')}</Text>
        </TouchableOpacity>
      </ContainerView>
      <View style={styles.slideWrap}>
        <FeedSlide images= {newFeedItem?.imageUrls || []}/>
        {disCountPer !== 1 && 
        <View style={styles.discountPercent}>
          <Text style={styles.textDiscount}>{`Giảm ${Math.floor(disCountPer * 100)} %`}</Text>
        </View>}
      </View>
      <ContainerView fluid style={styles.description}>
        <View style={styles.wrapInfo}>
          <Text style={styles.productName}>Áo khoác blazer Nữ tay dài</Text>
          <Text style={styles.price}>1000000 đ</Text>
        </View>
        <TouchableOpacity style={styles.touchBuyNow}>
          <Text style={styles.touchTextByNow}>Mua ngay</Text>
        </TouchableOpacity>
      </ContainerView>
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
