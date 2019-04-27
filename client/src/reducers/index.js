import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import featureReducer from "./featureReducer";

export default combineReducers({
  auth: authReducer,
  feature: featureReducer,
  errors: errorReducer
});
