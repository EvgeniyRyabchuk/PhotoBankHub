import $api from "../http";


export default class CollectionService {

    static async getCollections(userId, imageId) {
        return $api.get('collections');
    }

    static async createCollection(userId, imageId) {

    }

    static async addOrRemoveImageInCollection(userId, imageId) {

    }

}