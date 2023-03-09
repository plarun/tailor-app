import axios from 'axios';

import { GET_ERRORS, GET_ORDERS,GET_MY_ORDERS, ORDERS_LOADING } from './types';

// Get My orders
export const getMyOrders = () => dispatch => {
	dispatch(setOrdersLoading());
	axios.get('http://localhost:5000/api/orders/myorders')
	.then( res => {
		console.log(res)
		dispatch({
			type: GET_MY_ORDERS,
			payload: res.data
		})}
	)
	.catch(err => {
		console.log(err)
		dispatch({
			type: GET_MY_ORDERS,
			payload: null
		})}
	);
};



// Get all orders
export const getOrders = () => dispatch => {
	dispatch(setOrdersLoading());
	axios.get('http://localhost:5000/api/orders/all')
	.then( res => {
		console.log(res)
		dispatch({
			type: GET_ORDERS,
			payload: res.data
		})}
	)
	.catch(err => {
		console.log(err)
		dispatch({
			type: GET_ORDERS,
			payload: null
		})}
	);
};

// Orders Loading
export const setOrdersLoading = () => {
	return {
		type: ORDERS_LOADING
	}
}

