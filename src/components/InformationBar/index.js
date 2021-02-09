import React, { memo } from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'

import Styles from './Styles'

const InformationBar = ({
	text,
	isInformationVisible,
	onPress,
	hasIcon,
	clickedImageSource,
	unclickedImageSource,
	isAscendingOrder,
}) => {
	return (
		<TouchableOpacity style={Styles.informationBar} onPress={onPress}>
			<Text style={{ fontSize: 20, color: 'yellow' }}>{text}</Text>
			{hasIcon && (
				<Image source={isInformationVisible || isAscendingOrder ? clickedImageSource : unclickedImageSource} />
			)}
		</TouchableOpacity>
	)
}

export default memo(InformationBar)
