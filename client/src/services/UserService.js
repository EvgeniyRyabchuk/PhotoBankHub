
import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class UserService {
    static async update(userId, data) {
        return await $api.post(`/users/${userId}`, {
            ...data,
            _method: 'put'
        }, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }



}