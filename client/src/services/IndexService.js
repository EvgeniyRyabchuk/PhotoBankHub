import $api from "../http";


export default class IndexService {

    static async getLevels() {
        return await $api(`/levels`);
    }


}