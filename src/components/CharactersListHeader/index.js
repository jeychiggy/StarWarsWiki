import _ from 'lodash'
import React, { memo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Styles from './Styles'

const CharactersListHeader = ({ onPress }) => {
	const headerLabels = [
		{ id: 1, title: 'NAME' },
		{ id: 2, title: 'GENDER' },
		{ id: 3, title: 'HEIGHT' },
	]

	return (
		<TouchableOpacity style={Styles.touchableContainer} onPress={onPress}>
			{_.map(headerLabels, (headerLabel) => (
				<View key={headerLabel.id} style={Styles.labelContainer}>
					<Text style={Styles.textStyles}>{headerLabel.title}</Text>
				</View>
			))}
		</TouchableOpacity>
	)
}

export default memo(CharactersListHeader)
