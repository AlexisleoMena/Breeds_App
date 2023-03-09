// import { applyMiddleware, createStore, compose } from "redux";
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducer";

// const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const store = createStore( rootReducer, applyMiddleware(thunk));

export default store;