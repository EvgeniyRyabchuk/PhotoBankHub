import $api from "../http";


export default class CreatorService {

    static async getAllCreator(search) {
        return $api.get(`/creators${search}`);
    }

    static async getCreator(creatorId) {
        return $api.get(`/creators/${creatorId}`);
    }

    static async upload(creatorId, page) {
        return $api.post(`/creators`);
    }



}