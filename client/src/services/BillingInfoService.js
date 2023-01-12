import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class BillingInfoService {

    static async getBillingInfo() {
        return await $api.get(`/billing-infos`);
    }

    static async addBillingInfo(data) {
        return await $api.post(`/billing-infos`, {
            ...data
        });
    }

    static async updateBillingInfo(data, id) {
        return await $api.put(`/billing-infos/${id}`, {
            ...data
        });
    }

}