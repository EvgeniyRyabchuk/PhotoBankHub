
import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";


export default class ImageService {


    static async getAll(searchParams = '') {
        return await $api(`/images${searchParams}`);
    }

    static async show(imageId) {
        return await $api(`/images/${imageId}`);
    }

    static async download(imageId, variantId) {
        const promise = $api.get(`/images/${imageId}/variants/${variantId}/download`, {
            responseType: 'blob',
        });

        toast.promise(promise,
            {
                pending: PromiseAlert.FETCH_LOGIN_PENDING,
                success: PromiseAlert.FETCH_LOGIN_SUCCESS,
                error: PromiseAlert.FETCH_LOGIN_ERROR
            }
        )

        const data = (await promise).data;
        // console.log(data)
        const href = URL.createObjectURL(data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', '1.png'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);

        // return promise;
    }


    static async getMinMaxValues() {
        return $api.get(`/images/min-max`);
    }


    static async getLevels() {
        return await $api(`/images/levels`);
    }


    static async getSizes() {
        return await $api(`/images/sizes`);
    }

    static async getOrientations() {
        return await $api(`/images/orientations`);
    }

    static async likeable(id) {
        return await $api(`/images/${id}/likeable`)
    }
}