import React from 'react'

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '~/Theme/Components'
import { padding } from '~/Theme/Configs/spacing'
import { sizes } from '~/Theme/Configs/dimension'

const Title = ({ title, subTitle, onPress, subTitleComponent, style, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <Text medium style={[styles.textTitle, style && style]}>
        {title}
      </Text>
      {subTitleComponent
        ? subTitleComponent
        : subTitle ? (
          <TouchableOpacity onPress={onPress} style={styles.touchSubtitle}>
            <Text colorThird h6>
              {subTitle}
            </Text>
          </TouchableOpacity>
        ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: padding.big,
  },
  textTitle: {
    flex: 1,
    fontSize: sizes.h3,
    paddingRight: padding.large,
  },
  touchSubtitle: {
    paddingVertical: 5,
    justifyContent: 'center',
  },
})

Title.defaultProps = {
  onPress: () => { },
}

export default Title
