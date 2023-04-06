import axios from "axios";
import { GET_STATS, LOAD_STATS } from "./types";

// Get all tailor profiles
export const getOrdersStats = (data) => (dispatch) => {
  dispatch(setStatsLoading());
  axios
    .get("http://localhost:5000/api/orders/stats/", { params: data })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_STATS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Stats loading
export const setStatsLoading = () => {
  return {
    type: LOAD_STATS,
  };
};
