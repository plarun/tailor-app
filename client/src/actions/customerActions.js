import axios from 'axios';

import { GET_ERRORS, GET_CUSTOMERS, CUSTOMERS_LOADING, FETCH_CUSTOMER_BY_PHONE, LOAD_CUSTOMER, CUSTOMER_LOADING } from './types';

// Get all tailor profiles
export const getCustomers = () => dispatch => {
	dispatch(setCustomersLoading());
	axios.get('http://localhost:5000/api/customers/all')
	.then( res => {
		console.log(res)
		dispatch({
			type: GET_CUSTOMERS,
			payload: res.data
		})}
	)
	.catch(err => {
		console.log(err)
		dispatch({
			type: GET_CUSTOMERS,
			payload: null
		})}
	);
};

export const createCustomers = (customer, history) => dispatch => {
	axios
	.post('http://localhost:5000/api/customers/create', customer)
	.then(res => history.push('/customers'))
	.catch(err =>
		dispatch({
		type: GET_ERRORS,
		payload: err.response.data
		})
	);
};

export const updateCustomer = (customer, history) => dispatch => {
	console.log("updateCustomer: ", customer)
	axios
	.post('http://localhost:5000/api/customers/edit', customer)
	.then(res => {
		console.log(res)
		history.push('/customers')
	})
	.catch(err => {
		console.log(err)
		return dispatch({
			type: GET_ERRORS,
			payload: err.response
		})
	}
	);
};

export const getCustomerByPhone = (phone) => dispatch => {
	dispatch(setCustomersLoading());
	axios.get('http://localhost:5000/api/customers/phone', { params: phone })
	.then( res => {
		dispatch({
			type: FETCH_CUSTOMER_BY_PHONE,
			payload: res.data
		})
	}
	)
	.catch(err => {
		console.log(err)
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})}
	);
}

// Load current customer
export const loadCustomer = (customer) => dispatch => {
	dispatch(setCustomerLoading())
	return dispatch({
		type: LOAD_CUSTOMER,
		payload: customer
	})
}

// Customers loading
export const setCustomersLoading = () => {
	return {
		type: CUSTOMERS_LOADING
	};
};

// Customers loading
export const setCustomerLoading = () => {
	return {
		type: CUSTOMER_LOADING
	};
};