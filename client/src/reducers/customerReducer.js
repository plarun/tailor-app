import { CUSTOMERS_LOADING, GET_CUSTOMERS } from "../actions/types";

const initialState = {
	customers: null,
	loading: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_CUSTOMERS:
			return {
				...state,
				loading: false,
				customers: action.payload
			}
		case CUSTOMERS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}