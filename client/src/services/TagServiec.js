import $api from "../http";

export default class TagServiec {
    static async getAll() {
        return await $api.get(`/tags`);
    }


}