import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";
import reelReducer from "./reducers/reelReducer";
import categoryReducer from "./reducers/categoryReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  reels: reelReducer,
  categories: categoryReducer,
});

export default rootReducer;
