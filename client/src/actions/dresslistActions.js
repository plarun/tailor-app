import axios from "axios";

import { GET_ERRORS, GET_DRESSLISTS, DRESSLISTS_LOADING } from "./types";

// Get all tailor profiles
export const getDresslists = () => (dispatch) => {
  dispatch(setDresslistLoading());
  axios
    .get("http://localhost:5000/api/dresslists/all")
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_DRESSLISTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_DRESSLISTS,
        payload: null,
      });
    });
};

export const addDressItem = (dressItem, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/dresslists/create", dressItem)
    .then((res) => history.push("/dress"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Dresslists Loading
export const setDresslistLoading = () => {
  return {
    type: DRESSLISTS_LOADING,
  };
};
