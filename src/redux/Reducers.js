import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistCombineReducers } from 'redux-persist'

import { NetworkReducers, ContainerReducers } from '../state/src'

const config = {
	key: 'root',
	storage: AsyncStorage,
	debug: true,
}

const rootReducer = persistCombineReducers(config, {
	container: ContainerReducers,
	network: NetworkReducers,
})

export default rootReducer
