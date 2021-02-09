import * as Types from '../Types'

const initialState = {
	movies: [],
}

export default (currentState = initialState, action) => {
	const { payload: { movies } = {} } = action

	switch (action.type) {
	case Types.MOVIES_UPDATE:
		return {
			...currentState,
			movies: movies || currentState.movies,
		}

	case Types.MOVIES_CLEAR:
		return {
			...initialState,
		}

	default:
		return currentState
	}
}
