import React from 'react'
import { Text } from 'react-native'
import { ThemeView } from 'components'
import { Avatar } from "react-native-paper"

import styles from './styles'
import { View } from 'native-base'

const Item = ({ item, style }) => {
  console.log(item)
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
        <Text style={styles.address}>{item?.address}</Text>
      </View>
    </ThemeView>
  )
}

export default Item
