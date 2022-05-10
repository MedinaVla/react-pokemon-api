// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import pokesReducer from "./pokesDucks";

// const rootReducer = combineReducers({
//   pokemons: pokesReducer,
// });

// export default function generateStore() {
//   const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
//   );
//   return store;
// }
import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./pokeSlice";

export default configureStore({
  reducer: {
    pokemons: pokeReducer,
  },
});
