import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { generalReducer } from "./generalReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    general: generalReducer,
})

// что бы useSelector был типизированным 
export default rootReducer;




