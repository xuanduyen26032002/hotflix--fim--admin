import { actionType } from "../actions/type";

const initialState = {
  auth: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ME: {
      state.auth = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
