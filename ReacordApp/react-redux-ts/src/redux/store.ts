import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import recorderReducer from "./recorder";
import userEvenetsReducer from "./user-events";

// @ts-ignore
const rootReducer = combineReducers({
    userEvents: userEvenetsReducer,
    recorder: recorderReducer
});

// @ts-ignore
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;