import * as Types from '../Types'

export const moviesUpdate = (payload) => ({
	type: Types.MOVIES_UPDATE,
	payload,
})

export const moviesClear = (payload) => ({
	type: Types.MOVIES_CLEAR,
	payload,
})
