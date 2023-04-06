import { LOAD_STATS, GET_STATS } from "../actions/types";

const initialState = {
  stats: null,
  stats_loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_STATS:
      return {
        ...state,
        stats_loading: false,
      };
    case GET_STATS:
      return {
        ...state,
        stats_loading: false,
        stats: action.payload,
      };
    default:
      return state;
  }
}
