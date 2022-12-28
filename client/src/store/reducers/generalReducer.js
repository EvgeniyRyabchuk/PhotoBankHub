

const category = {

}

const initialState = {
    categories: [],
    loadingCategories: false,
    errorCategories: null,


}

export const generalReducer = (state= initialState, action) => {
    switch(action.type) {
        case GeneralActionTypes.FETCH_CATEGORIES:
            return {...state, loadingCategories: true, error: null, }

        case GeneralActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {loadingCategories: false, errorCategories: null, categories: action.payload}

        case GeneralActionTypes.FETCH_CATEGORIES_ERROR:
            return {loadingCategories: false, errorCategories: action.payload, categories: null}


        default:
            return {...state};
    }


}

export const GeneralActionTypes = {
    FETCH_CATEGORIES: 'FETCH_CATEGORIES',
    FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_ERROR: 'FETCH_CATEGORIES_ERROR',

}




