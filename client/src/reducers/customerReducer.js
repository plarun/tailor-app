import { CUSTOMERS_LOADING, GET_CUSTOMERS, LOAD_CUSTOMER, CUSTOMER_LOADING  } from "../actions/types";

const initialState = {
	customer: null,
	customers: null,
	loading: false,
	cust_loading: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case LOAD_CUSTOMER:
			return {
				...state,
				customer: action.payload,
				cust_loading: false
			}
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
		case CUSTOMER_LOADING:
			return {
				...state,
				cust_loading: true
			};
		default:
			return state;
	}
}