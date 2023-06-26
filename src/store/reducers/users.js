import { actionType } from "../actions/type";

const initialState = {
  usersList: [],
  userDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USERS:
      state.usersList = action.payload;
      return { ...state };
    case actionType.SET_USER_DETAIL:
      state.userDetail = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
