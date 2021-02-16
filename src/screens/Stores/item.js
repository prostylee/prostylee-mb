import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles'
import i18n from 'i18n'
import {isEmpty} from 'lodash'

import {Avatar} from 'react-native-paper'

import {ContainerView} from 'components'

import {follow, unfollow} from 'services/api/socialApi'

import ProductOfStore from './products'

const STORE = 'STORE'
const StoreItem = ({storeItem}) => {

  if (isEmpty(storeItem)) return null

  const listProductOfStore = storeItem?.products || []

  const [followed, setFollowed] = useState(false)

  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: storeItem?.id,
        targetType: STORE
      })
      if (res.ok) {
        setFollowed(true)
      }
    } else {
      const res = await unfollow({
        targetId: storeItem?.id,
        targetType: STORE
      })
      if (res.ok) {
        setFollowed(false)
      }
    }
  }
  return (
    <View style={styles.container}>
      <ContainerView style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          <Avatar.Image 
            size={32} 
            source={{uri: storeItem?.logoUrl || null}} />
          <View style={styles.storeName}>
            <Text 
              numberOfLines={1} 
              style={styles.textTitle}>
                {storeItem?.name}
            </Text>
            {storeItem?.isAdvertising && <Text style={styles.isAdvertising}>{i18n.t('common.textAdvertisement')}</Text>}
          </View>
        </View>
        <TouchableOpacity onPress={() => _followPress()} style={styles.wrapFollow}>
          <Text 
            style={!followed ? styles.textFollow : styles.textFollowed}>{
            !followed ? i18n.t('common.textFollow') : i18n.t('common.textFollowed')
          }</Text>
        </TouchableOpacity>
      </ContainerView>
      <ContainerView style={styles.fluidStyle} fluid>
          <ProductOfStore products={listProductOfStore}/>
      </ContainerView>
    </View>
  )
}

StoreItem.defaultProps = {
}

StoreItem.propTypes = {
}

export default StoreItem
