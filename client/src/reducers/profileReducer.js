import isEmpty from '../validation/is-empty';
import { GET_TAILORS_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from '../actions/types'

const initialState = {
	loading: false,
	tailors: null
};

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_TAILORS_PROFILE:
			return {
				...state,
				loading: false,
				tailors: action.payload
			}
		case PROFILE_LOADING:
			return {
				...state,
				loading: true
			}
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			}
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null
			}
		default: 
			return state;
	}
}