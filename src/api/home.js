import { Api } from "./api";

class HomeApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/homes${slug ? `/${slug}` : ""}`;
    }

    static async add(home, controller) {
        return await Api.post(HomeApi.getUrl(), home, controller);
    }
    
    static async modify(homeId, homeName, controller) {
        return await Api.put(RoomApi.getUrl(homeId), { name: homeName }, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(HomeApi.getUrl(id), controller);
    }

    static async getAll(controller) {
        return await Api.get(HomeApi.getUrl(), controller);
    }

    static async getHome(homeId, controller) {
      return await Api.get(HomeApi.getUrl(homeId), controller);
    }
}

class Home {
    constructor(id, name) {
        if (id) {
            this.id = id;
        }
        this.name = name;
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
    getId(){
        return this.id
    }
    getName(){
        return this.name
    }
}

export { HomeApi, Home };
