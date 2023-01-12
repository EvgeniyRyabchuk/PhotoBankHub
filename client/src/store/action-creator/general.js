import {GeneralActionTypes} from "../reducers/generalReducer";
import CategoryService from "../../services/CategoryService";


export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({type: GeneralActionTypes.FETCH_CATEGORIES})
            const response = await CategoryService.getCategories();
            dispatch({type: GeneralActionTypes.FETCH_CATEGORIES_SUCCESS, payload: response.data})

        } catch (err) {
            dispatch({type: GeneralActionTypes.FETCH_CATEGORIES_ERROR,
                payload: 'Произошла ошибка при загрузки пользователя - ' + err.message});
            throw err;
        }

    }
}