import $api from "../http";


export default class FavoriteService {

    static async getFavorites(clientId) {
        return $api.get(`/clients/${clientId}/favorites`);
    }

    static async createFavorite(clientId, title) {
        return $api.post(`/clients/${clientId}/favorites`, {
            title
        });
    }

    static async addImageToFavorite(clientId, favoriteId, imageId) {
        return $api.post(`/clients/${clientId}/favorites/${favoriteId}/images`, {
            imageId
        });
    }

    static async removeImageFromFavorite(clientId, favoriteId, imageId) {
        return $api.delete(`/clients/${clientId}/favorites/${favoriteId}/images/${imageId}`);
    }

    static async removeImagesFromFavorite(clientId, favoriteId, imageIds) {
        return $api.delete(`/clients/${clientId}/favorites/${favoriteId}/images/many`, {
            data: {
                imageIds
            }
        });
    }

}