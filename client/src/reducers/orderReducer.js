import {
  ORDERS_LOADING,
  GET_ORDERS,
  GET_MY_ORDERS,
  FETCH_CUSTOMER_BY_PHONE,
  CLEAR_ORDER_CUSTOMER,
  LOAD_ORDER,
  ORDER_LOADING,
} from "../actions/types";

const initialState = {
  customer: null,
  orders: null,
  loading: false,
  order: null,
  order_loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDER:
      return {
        ...state,
        order: action.payload,
        order_loading: false,
      };
    case FETCH_CUSTOMER_BY_PHONE:
      return {
        ...state,
        errors: action.errors,
        loading: false,
        customer: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        orders: action.payload,
      };
    case GET_MY_ORDERS:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        orders: action.payload,
      };
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ORDER_CUSTOMER:
      return {
        ...state,
        errors: null,
        customer: null,
      };
    case ORDER_LOADING:
      return {
        ...state,
        order_loading: true,
      };
    default:
      return state;
  }
}
