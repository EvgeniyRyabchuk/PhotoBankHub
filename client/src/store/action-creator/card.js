import { CardActionTypes } from '../reducers/cardReducer';

export const setCards = (cards) => {
   return { type: CardActionTypes.INIT, payload: cards};
}

export const setLastTransaction = (transaction) => {
   return { type: CardActionTypes.SET_LAST_TRANSACTION, payload: transaction};
}


