import React from 'react'

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

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
            <Text>
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
    alignItems: 'center',
  },
  textTitle: {
    flex: 1,
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
