import { Api } from "./api";

class DeviceApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(device, controller) {
        return await Api.post(DeviceApi.getUrl(), device, controller);
    }

    static async modify(device, controller) {
        return await Api.put(DeviceApi.getUrl(device.id), device, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(DeviceApi.getUrl(id), controller);
    }

    static async getAll(controller) {
      return await Api.get(DeviceApi.getUrl(), controller);
  }

}

class Device {
    constructor(id, name, type, state, room) {
      if (id) {
          this.id = id;
      }
      this.name = name;
      this.type = type;
      this.state = state;
      this.room = room;
    }
    toString() {
      return JSON.stringify(this, null, 2);
    }
}

export { DeviceApi, Device };
