import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import featureReducer from "./featureReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  feature: featureReducer,
  errors: errorReducer
});
