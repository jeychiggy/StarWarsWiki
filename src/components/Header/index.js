import React, { memo } from 'react'
import { View, Text } from 'react-native'

import Styles from './Styles'

const Header = ({ children }) => (
	<View style={Styles.informationBar}>
		<Text style={Styles.textStyles}>{children}</Text>
	</View>
)

export default memo(Header)
