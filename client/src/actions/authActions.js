import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, ADMIN_EXIST } from './types';

//Register User
export const registerUser =(userData, history) => dispatch => {
	axios.post('http://localhost:5000/api/users/register', userData)
	.then( res => history.push('/login'))
	.catch(err =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Login Get User Token
export const loginUser = userData => dispatch => {
	axios.post('http://localhost:5000/api/users/login', userData)
		.then(res => {
			//Save to localStorage
			const { token } = res.data;
			//Set token to ls
			localStorage.setItem('jwtToken', token);
			//Set token to UserAuth header
			setAuthToken(token);
			//Decode  token to get user data
			const decoded = jwt_decode(token);
			//Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		 );
};

// Check if admin exists
export const IsAdminExists = () => dispatch => {
	axios.get('http://localhost:5000/api/users/admin')
	.then( res => 
		dispatch({
			type: ADMIN_EXIST,
			payload: res.data
		}))
	.catch(err =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
}

//Register User
export const AdminRegister =(user, history) => dispatch => {
	axios.post('http://localhost:5000/api/users/admin-register', user)
	.then( res => history.push('/admin-login'))
	.catch(err =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Login Get User Token
export const AdminLogin = user => dispatch => {
	axios.post('http://localhost:5000/api/users/admin-login', user)
		.then(res => {
			//Save to localStorage
			const { token } = res.data;
			//Set token to ls
			localStorage.setItem('jwtToken', token);
			//Set token to UserAuth header
			setAuthToken(token);
			//Decode  token to get user data
			const decoded = jwt_decode(token);
			//Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		 );
};

export const logoutUser = () => dispatch => {
	// Remove token from localstorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
}

//Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}