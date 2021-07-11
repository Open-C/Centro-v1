import { createStore, combineReducers } from "redux";
import { wallet } from "./wallet_store";

export const reducer = combineReducers({
  wallet: wallet.reducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
