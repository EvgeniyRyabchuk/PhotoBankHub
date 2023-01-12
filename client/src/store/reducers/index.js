import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { generalReducer } from "./generalReducer";
import { cardReducer } from "./cardReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    general: generalReducer,
    card: cardReducer
})

// что бы useSelector был типизированным 
export default rootReducer;




