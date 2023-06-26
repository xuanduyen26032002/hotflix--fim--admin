import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import users from "./reducers/users";
import movies from "./reducers/movies";
import showtimes from "./reducers/showtimes";

const reducer = combineReducers({
  auth,
  users,
  movies,
  showtimes,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
