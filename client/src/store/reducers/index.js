import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    user: userReducer,

})

// что бы useSelector был типизированным 
export default rootReducer;




