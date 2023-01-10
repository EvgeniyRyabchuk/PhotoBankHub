
const initialState = {
    cards: [],
    loading: false,
    error: null,
    lastTransaction: null
}

export const cardReducer = (state = initialState, action) => {
    switch(action.type) {
        case CardActionTypes.INIT:
            return { ...state, cards: [...action.payload] }
        case CardActionTypes.SET_LAST_TRANSACTION:
            return { ...state, lastTransaction: action.payload }
        default:
            return state;
    }
}


export const CardActionTypes = {
    INIT: 'INIT',
    SET_LAST_TRANSACTION: 'SET_LAST_TRANSACTION',

}
