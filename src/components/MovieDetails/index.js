import React, { memo } from 'react'
import { View } from 'react-native'
import StarWars from 'react-native-star-wars'

import Images from '../../assets/images'
import GenderTab from '../GenderTab'
import InformationBar from '../InformationBar'

const MovieDetails = ({
	movieTitle,
	movieCrawl,
	onPressMaleTab,
	onPressFemaleTab,
	onPressAllTab,
	isMaleTabActive,
	isFemaleTabActive,
	isAllTabActive,
	isCharactersInAscendingOrder,
}) => (
	<View>
		<View style={{ height: 200 }}>
			<StarWars content={movieCrawl} title={movieTitle} />
		</View>

		<InformationBar text="GENDER TO DISPLAY" />
		<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
			<GenderTab />
		</View>
		<InformationBar
			hasIcon
			clickedImageSource={Images.arrowDown}
			isAscendingOrder={isCharactersInAscendingOrder}
			text="CHARACTERS"
			unclickedImageSource={Images.arrowUp}
		/>
	</View>
)

export default memo(MovieDetails)
