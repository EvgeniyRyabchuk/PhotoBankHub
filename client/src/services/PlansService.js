import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class PlanService {
    static async getPlans() {
        return await $api.get(`/plans`);
    }

    static async show(id) {
        return await $api.get(`/plans/${id}`);
    }

}