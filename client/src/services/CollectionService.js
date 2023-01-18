import $api from "../http";


export default class CollectionService {

    static async getCollections(search = '') {
        return $api.get(`/collections${search}`);
    }

    static async getCollection(collectionId) {
        return $api.get(`/collections/${collectionId}`);
    }

    static async getImagesByCollection(collectionId) {
        return $api.get(`/collections/${collectionId}/images`);
    }

    static async createCollection(name, description) {
        return $api.post('/collections', {
            name, description
        });
    }

    static async updateCollection(userId, collectionId) {
        return $api.put(`/collections/${collectionId}`);
    }

    static async deleteCollection(userId, collectionId) {
        return $api.delete(`/collections/${collectionId}`);
    }


    static async addImageToCollection(collectionId, imageId) {
        return $api.post(`/collections/${collectionId}/images`, {
            imageId
        });
    }

    static async removeImageFromCollection(collectionId, imageId) {
        return $api.delete(`/collections/${collectionId}/images/${imageId}`);
    }

}