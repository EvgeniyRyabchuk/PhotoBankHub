
import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class PhotoModelService {

    static async getAll(search) {
        return await $api.get(`/photo-models${search}`);
    }

    static async getEthnicities() {
        return await $api.get(`/photo-models/ethnicities`);
    }

    static async getGenders() {
        return await $api.get(`/photo-models/genders`);
    }

    static async createPhotoModel(data) {
        return await $api.post(`/photo-models`, {
            ...data
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }


}