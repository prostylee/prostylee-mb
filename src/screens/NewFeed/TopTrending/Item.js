import React from 'react'
import { Text } from 'react-native'
import { ThemeView } from 'components'
import { Avatar } from "react-native-paper"

import styles from './styles'
import { View } from 'native-base'
import { MapPin } from 'svg/common'

const Item = ({ item, style }) => {
  return (
    <ThemeView colorSecondary style={[styles.itemContainer, style && style]}>
      <Avatar.Image
        source={
          item.logoUrl
            ? { uri: item.logoUrl }
            : require('assets/images/default.png')
        }
        size={60}
        rounded
        containerStyle={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.addressWrap}>
          <MapPin/>
          <Text style={styles.address}>{item?.address}</Text>
        </View>
      </View>
    </ThemeView>
  )
}

export default Item
