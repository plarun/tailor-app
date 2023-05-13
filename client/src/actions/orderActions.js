import axios from "axios";

import {
  GET_ERRORS,
  GET_ORDERS,
  GET_MY_ORDERS,
  ORDERS_LOADING,
  CLEAR_ORDER_CUSTOMER,
  LOAD_ORDER,
  ORDER_LOADING,
} from "./types";

// Add new order
export const addOrder = (order, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/orders", order)
    .then((res) => history.push("/orders"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete order
export const deleteOrder = (order, history) => (dispatch) => {
  const orderId = order._id;
  axios
    .delete(`http://localhost:5000/api/orders/${orderId}`, order)
    .then((res) => history.push("/orders"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

// Get My orders
export const getMyOrders = (userId) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get(`http://localhost:5000/api/users/${userId}/orders`) //, { params: { user } })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_MY_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_MY_ORDERS,
        payload: null,
      });
    });
};

// Get My orders
export const getDeliveredOrders = (user) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get("http://localhost:5000/api/orders/delivered", { params: { user } })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_MY_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_MY_ORDERS,
        payload: null,
      });
    });
};

export const updateOrder = (order, history) => (dispatch) => {
  console.log("updateOrder: ", order);
  axios
    .patch("http://localhost:5000/api/orders", order)
    .then((res) => {
      console.log(res);
      history.push("/orders");
    })
    .catch((err) => {
      console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

// Get all orders
export const getOrders = () => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get("http://localhost:5000/api/orders")
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ORDERS,
        payload: null,
      });
    });
};

// Load current order
export const loadOrder = (order) => (dispatch) => {
  dispatch(setOrderLoading());
  return dispatch({
    type: LOAD_ORDER,
    payload: order,
  });
};

// Order loading
export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING,
  };
};

// Orders Loading
export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};

// Clear profile
export const clearOrderCustomer = () => {
  console.log("clear order customer");
  return {
    type: CLEAR_ORDER_CUSTOMER,
  };
};
