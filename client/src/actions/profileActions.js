import axios from "axios";
import {
  GET_TAILORS_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS,
} from "./types";

// Get all tailor profiles
export const getTailorsProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:5000/api/tailors/all")
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_TAILORS_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_TAILORS_PROFILE,
        payload: null,
      });
    });
};

// // Delete TailorProfile
// export const deleteTailor = () => dispatch => {
// 	if(window.confirm('Are you sure? This can not be undone!')) {
// 		axios
// 			.delete('/api/tailors')
// 			.then(res => {
// 				dispatch({
// 					type: SET_CURRENT_USER,
// 					payload: {}
// 				})
// 			}
// 		)
// 			.catch(err =>
// 				dispatch({
// 					type: GET_ERRORS,
// 					payload: err.response.data
// 				})
// 			);
// 	}
// }

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
