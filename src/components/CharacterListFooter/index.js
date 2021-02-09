import React, { memo } from 'react'
import { View, Text } from 'react-native'

import Styles from './Styles'

const CharacterListFooter = ({ totalHeight, totalCharacters }) => {
	const height = totalHeight / 2.54
	const heightInFt = Math.floor(height / 12)
	const heightInInch = (height - 12 * heightInFt).toFixed(2)

	return (
		<View style={Styles.container}>
			<Text style={Styles.textStyles}>
				{totalCharacters === 0 ? 'loading...' : `Total Characters: ${totalCharacters}`}
			</Text>
			<Text style={Styles.textStyles}>
				{totalCharacters === 0 ? 'loading...' : `Total Height: ${totalHeight} (${heightInFt}ft/${heightInInch}in)`}
			</Text>
		</View>
	)
}

export default memo(CharacterListFooter)
