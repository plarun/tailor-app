import { ORDERS_LOADING, GET_ORDERS, GET_MY_ORDERS, FETCH_CUSTOMER_BY_PHONE, CLEAR_ORDER_CUSTOMER } from "../actions/types";

const initialState = {
	customer: null,
	orders: null,
	loading: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_CUSTOMER_BY_PHONE:
			return {
				...state,
				errors: action.errors,
				loading: false,
				customer: action.payload
			}
		case GET_ORDERS:
			return {
				...state,
				loading: false,
				errors: action.errors,
				orders: action.payload
			}
		case GET_MY_ORDERS:
			return {
				...state,
				loading: false,
				errors: action.errors,
				orders: action.payload
			}
		case ORDERS_LOADING:
			return {
				...state,
				loading: true
			}
		case CLEAR_ORDER_CUSTOMER:
			return {
				...state,
				errors: null,
				customer: null
			}
		default:
			return state;
	}
}