import { actionType } from "../actions/type";

const initialState = {
  moviesList: [],
  movieDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_MOVIES:
      state.moviesList = action.payload;
      return { ...state };

    case actionType.SET_MOVIE_DETAIL:
      state.movieDetail = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
