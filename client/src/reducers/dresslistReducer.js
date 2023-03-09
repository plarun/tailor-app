import { DRESSLISTS_LOADING, GET_DRESSLISTS } from "../actions/types";

const initialState = {
	dresslist: null,
	loading: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_DRESSLISTS:
			return {
				...state,
				loading: false,
				dresslist: action.payload
			}
		case DRESSLISTS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}

}