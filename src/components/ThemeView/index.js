import React from 'react'
import { StyleSheet, View } from 'react-native'

const ThemeView = ({ colorSecondary, isFullView, style, ...restProps }) => {
	return (
		<View
			{...restProps}
			style={StyleSheet.flatten([
				isFullView && { flex: 1 },
				style && style,
			])}
		/>
	)
}

export default ThemeView
