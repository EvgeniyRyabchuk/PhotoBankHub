import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class BillingService {

    static async getBills() {
        return await $api.get(`/billings`);
    }

    static async subscribe( plan_id,  creditCardId, valid_period_type, billing_info_id) {
        return await $api.post(`/billings/subscribe`, {
            plan_id, creditCardId, valid_period_type, billing_info_id
        });
    }

    static async unsubscribe() {
        return await $api.delete(`/billings/unsubscribe`);
    }

}