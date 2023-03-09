import { ORDERS_LOADING, GET_ORDERS, GET_MY_ORDERS } from "../actions/types";

const initialState = {
	orders: null,
	loading: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_ORDERS:
			return {
				...state,
				loading: false,
				orders: action.payload
			}
		case GET_MY_ORDERS:
			return {
				...state,
				loading: false,
				orders: action.payload
			}
		case ORDERS_LOADING:
			return {
				...state,
				loading: true
			}
		default:
			return state;
	}
}