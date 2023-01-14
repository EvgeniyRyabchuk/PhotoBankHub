import $api from "../http";


export default class ClientService {

    static async getDownloads(clientId, search) {
        return $api.get(`clients/${clientId}/downloads${search}`);
    }

    static async getViews(clientId, page) {
        return $api.get(`clients/${clientId}/views?page=${page}`);
    }

    static async getLikes(clientId, page) {
        return $api.get(`clients/${clientId}/likes?page=${page}`);
    }

    static async getImageByFavorite(clientId, favoriteId, page) {
        return $api.get(`clients/${clientId}/favorites/${favoriteId}/images?page=${page}`);
    }



}