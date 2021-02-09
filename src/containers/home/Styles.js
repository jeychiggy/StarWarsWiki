import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	item: {
		height: 60,
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: 'yellow',
		paddingHorizontal: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	background: {
		height: '100%',
		width: '100%',
	},
	logo: {
		width: 350,
		height: 350,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 45,
	},
	movieTitleText: {
		fontSize: 20,
		color: 'yellow',
	},
	characterContainer: {
		height: 32,
		backgroundColor: 'black',
		borderRightWidth: 1,
		borderColor: 'yellow',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		borderBottomWidth: 1,
	},
	characterItem: {
		width: '33.3%',
		borderRightWidth: 1,
		borderRightColor: 'yellow',
		justifyContent: 'center',
		alignItems: 'center',
	},
	characterText: {
		color: 'yellow',
	},
	flatListContainer: {
		height: 300,
	},
})
