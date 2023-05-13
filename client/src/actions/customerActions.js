import axios from "axios";

import {
  GET_ERRORS,
  GET_CUSTOMERS,
  CUSTOMERS_LOADING,
  FETCH_CUSTOMER_BY_PHONE,
  LOAD_CUSTOMER,
  CUSTOMER_LOADING,
} from "./types";

// Get all customers
export const getCustomers = () => (dispatch) => {
  dispatch(setCustomersLoading());
  axios
    .get("http://localhost:5000/api/customers")
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CUSTOMERS,
        payload: null,
      });
    });
};

// Create a new customer
export const createCustomer = (customer, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/customers", customer)
    .then((res) => history.push("/customers"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Update fields of existing customer
export const updateCustomer = (fields, history) => (dispatch) => {
  console.log("updateCustomer: ", fields);
  const custId = fields._id;
  axios
    .patch(`http://localhost:5000/api/customers/${custId}`, fields)
    .then((res) => {
      console.log(res);
      history.push("/customers");
    })
    .catch((err) => {
      console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

// Get customer by phone number if exists
export const getCustomerByPhone = (phone) => (dispatch) => {
  dispatch(setCustomersLoading());
  axios
    .get("http://localhost:5000/api/customers/phone", { params: phone })
    .then((res) => {
      dispatch({
        type: FETCH_CUSTOMER_BY_PHONE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Load current customer
export const loadCustomer = (customer) => (dispatch) => {
  dispatch(setCustomerLoading());
  return dispatch({
    type: LOAD_CUSTOMER,
    payload: customer,
  });
};

// Customers loading
export const setCustomersLoading = () => {
  return {
    type: CUSTOMERS_LOADING,
  };
};

// Customers loading
export const setCustomerLoading = () => {
  return {
    type: CUSTOMER_LOADING,
  };
};
