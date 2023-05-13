import axios from "axios";

import { GET_ERRORS, GET_DRESSLISTS, DRESSLISTS_LOADING } from "./types";

// Get all dresses
export const getDresses = () => (dispatch) => {
  dispatch(setDresslistLoading());
  axios
    .get("http://localhost:5000/api/dresses")
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

export const addDress = (dress, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/dresses", dress)
    .then((res) => history.push("/dress"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete dress
export const deleteDress = (dressId) => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/dresses/${dressId}`)
    .then((res) => console.log(res))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

// Dresslists Loading
export const setDresslistLoading = () => {
  return {
    type: DRESSLISTS_LOADING,
  };
};
