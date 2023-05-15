import { Api } from "./api";

class RoomApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ""}`;
    }

    static async add(room, controller) {
        return await Api.post(RoomApi.getUrl(), room, controller);
    }

    static async modify(roomId, roomName, controller) {
        return await Api.put(RoomApi.getUrl(roomId), { name: roomName }, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(RoomApi.getUrl(id), controller);
    }

    static async getAll(controller) {
        return await Api.get(RoomApi.getUrl(), controller);
    }

    static async getRoom(roomId) {
      return await Api.get(RoomApi.getUrl(roomId));
    }

    static async addRoomToHome(homeId, roomId) {
        return await Api.post(`${Api.baseUrl}/homes/${homeId}/rooms/${roomId}`);
    }
}

class Room {
    constructor(id, name, home) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.home = home;
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
    getId(){
        return this.id
    }
}

export { RoomApi, Room };
