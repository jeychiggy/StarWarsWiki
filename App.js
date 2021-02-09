/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Thunk from 'redux-thunk'

import Home from './src/containers/home'
import reducers from './src/redux/Reducers'

const store = createStore(reducers, compose(applyMiddleware(Thunk)))
const persistor = persistStore(store)

const App = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Home />
		</PersistGate>
	</Provider>
)

export default App
