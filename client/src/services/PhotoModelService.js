
import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class PhotoModelService {
    static async getEthnicities() {
        return await $api.get(`/photo-models/ethnicities`);
    }
    static async getGenders() {
        return await $api.get(`/photo-models/genders`);
    }


}