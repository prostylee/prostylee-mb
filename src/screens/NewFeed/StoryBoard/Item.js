import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemeView, Text } from 'components'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { margin, padding, borderRadius } from '~/Theme/Configs/spacing'
import { Avatar, useTheme } from "react-native-paper"

const Item = ({ item, style }) => {
  const theme = useTheme()
  return (
    <ThemeView colorSecondary style={[styles.container, style && style]}>
      <Avatar.Image
        source={
          item.gravatar
            ? { uri: item.gravatar }
            : require('assets/images/default.png')
        }
        size={60}
        rounded
        containerStyle={styles.image}
      />
    </ThemeView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.large,
    width: 135,
    padding: padding.large,
    alignItems: 'center',
  },
  image: {
    marginBottom: margin.small + 1,
  },
  name: {
    marginBottom: 2,
    textAlign: 'center',
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRating: {
    marginRight: 5,
  },
})

export default Item
