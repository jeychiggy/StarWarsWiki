import _ from 'lodash'
import React, { memo, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

import Styles from './Styles'

const GenderTab = ({ isActive, onPress }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isActiveTab, setActiveTab] = useState(false)

	const tabs = [
		{
			id: 0,
			label: 'ALL',
		},
		{
			id: 1,
			label: 'FEMALE',
		},
		{
			id: 2,
			label: 'MALE',
		},
		{
			id: 3,
			label: 'OTHER',
		},
	]

	const onPressTab = (activeIndex) => {
		setActiveIndex(activeIndex)
	}

	return _.map(tabs, (tabItem) => {
		return (
			<TouchableOpacity
				key={tabItem.id}
				style={[Styles.tabContainer, { backgroundColor: tabItem.id === activeIndex ? 'black' : 'white' }]}
				onPress={() => onPressTab(tabItem.id)}
			>
				<Text style={[Styles.tabLabel, { color: tabItem.id === activeIndex ? 'yellow' : 'black' }]}>
					{tabItem.label}
				</Text>
			</TouchableOpacity>
		)
	})
}
export default memo(GenderTab)
