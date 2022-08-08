import { combineReducers, createStore } from "redux";
import userEvenetsReducer from "./user-events";


const rootReducer = combineReducers({
    userEvents: userEvenetsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;