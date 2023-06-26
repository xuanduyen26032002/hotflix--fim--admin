import { actionType } from "../actions/type";

const initialState = {
  showtimes: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_SHOWTIMES:
      state.showtimes = action.payload;
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
