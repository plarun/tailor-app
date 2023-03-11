import axios from 'axios';

import { GET_ERRORS, GET_ORDERS,GET_MY_ORDERS, ORDERS_LOADING, CLEAR_ORDER_CUSTOMER } from './types';

// Add new order
export const addOrder = (order, history) => dispatch => {
	axios
		.post('http://localhost:5000/api/orders/create', order)
		.then(res => history.push('/orders'))
		.catch(err =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Get My orders
export const getMyOrders = (user) => dispatch => {
	dispatch(setOrdersLoading());
	axios.get('http://localhost:5000/api/orders/myorders', {params: {user}})
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

// Clear profile
export const clearOrderCustomer = () => {
	console.log("clear order customer")
	return {
		type: CLEAR_ORDER_CUSTOMER
	};
};
  