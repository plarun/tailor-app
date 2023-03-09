import axios from 'axios';

import { GET_ERRORS, GET_CUSTOMERS, CUSTOMERS_LOADING} from './types';

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


// Customer loading
export const setCustomersLoading = () => {
	return {
	  type: CUSTOMERS_LOADING
	};
  };