import HandleRequest from '../HandleRequest'
import { GET_MOVIES_FAILURE, GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS } from './Types'

export const getMoviesSuccess = (payload) => ({
	type: GET_MOVIES_SUCCESS,
	payload,
})

export const getMoviesFailure = (payload) => ({
	type: GET_MOVIES_FAILURE,
	payload,
})

export const getMoviesRequest = (payload = {}) => (dispatch) => {
	const { config = {}, ...params } = payload

	dispatch({
		type: GET_MOVIES_REQUEST,
		payload: params,
	})

	return HandleRequest({
		actionSuccess: getMoviesSuccess,
		actionFailure: getMoviesFailure,
		dispatch,
		requestConfig: {
			method: 'get',
			url: 'api/films/',
		},
	})
}
