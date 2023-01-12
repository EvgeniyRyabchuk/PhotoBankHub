import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class CreditCardService {

    static async getCards() {
        return await $api.get(`/credit-cards`);
    }

    static async addCard({
         number,
         expire_month,
         expire_year,
         cvc,
         issuer,
         isMain = true
    }) {
        return await $api.post(`/credit-cards`, {
            number, expire_month, expire_year, cvc, issuer, isMain
        });
    }

    static async updateCard({
        id: creditCardId,
        number,
        expire_month,
        expire_year,
        cvc,
        issuer,
        isMain
    }) {
        return await $api.put(`/credit-cards/${creditCardId}`, {
            number, expire_month, expire_year, cvc, issuer, isMain
        });
    }

    static async deleteCard( creditCardId) {
        return await $api.delete(`/credit-cards/${creditCardId}`);
    }

}