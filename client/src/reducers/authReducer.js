import isEmpty from '../validation/is-empty';
import { ADMIN_EXIST, SET_CURRENT_USER } from '../actions/types'

const initialState = {
	isAuthenticated: false,
	user: {},
	adminExists: false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			}
		case ADMIN_EXIST:
			return {
				...state,
				adminExists: action.payload.exists
			}
		default: 
			return state;
	}
}