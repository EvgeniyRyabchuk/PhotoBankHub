
import $api from "../http";
import {toast} from "react-toastify";
import {
    PromiseAlert,
} from "../utills/alert";
import {downloadFile} from "../utills/axios";


export default class ImageService {

    static async getAll(searchParams = '') {
        return await $api(`/images${searchParams}`);
    }

    static async show(imageId) {
        return await $api(`/images/${imageId}`);
    }

    static async downloadPreview(imageId) {
        const promise = $api.get(`/images/${imageId}/download`, {
            responseType: 'blob',
        });

        toast.promise(promise,
            {
                pending: PromiseAlert.FETCH_IMAGE,
                success: PromiseAlert.FETCH_IMAGE_SUCCESS,
                error: PromiseAlert.FETCH_IMAGE_ERROR
            }
        )

        const data = (await promise).data;
        downloadFile(data);
    }

    static async download(imageId, variantId) {
        const promise = $api.get(`/images/${imageId}/variants/${variantId}/download`, {
            responseType: 'blob',
        });

        toast.promise(promise,
            {
                pending: PromiseAlert.FETCH_IMAGE,
                success: PromiseAlert.FETCH_IMAGE_SUCCESS,
                error: `${PromiseAlert.FETCH_IMAGE_ERROR}`
            }
        )

        const data = (await promise).data;
        downloadFile(data);
    }

    static async like(imageId) {
        return $api.post(`/images/${imageId}/likes`);
    }

    static async view(imageId) {
        return $api.post(`/images/${imageId}/views`);
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