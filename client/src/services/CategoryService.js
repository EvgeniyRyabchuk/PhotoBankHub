
import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class CategoryService {
    static async getCategories() {
        return await $api.get(`/categories`);
    }



}