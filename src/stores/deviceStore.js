import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Device, DeviceApi } from "@/api/device";

export const useDeviceStore = defineStore('device', () => {
    const devices = ref([]);

    async function add(device, controller = null) {
        const result = await DeviceApi.add(device, controller)
        return Object.assign(new Device(), result)
    }
    async function modify(device, controller = null) {
        const result = await DeviceApi.modify(device, controller)
        await getAll()
        return result
    }

    async function remove(id, controller = null) {
        const result = await DeviceApi.remove(id, controller)
        await getAll()
        return result
    }

    async function getAll(controller = null) {
        let result = await DeviceApi.getAll(controller);
        result = result.map((device) => Object.assign(new Device(), device));
        devices.value = result
        return result
    }

    async function addDeviceToRoom(roomId, deviceId, controller = null) {
      const response = await DeviceApi.addDeviceToRoom(roomId, deviceId, controller)
      await getAll()
    }

    async function makeAction(deviceId, action, value, controller = null) {
        const response = await DeviceApi.makeAction(deviceId, action, value, controller)
        return response;
    }

    async function getDeviceState(deviceId, controller = null) {
        let result = await DeviceApi.getDeviceState(deviceId, controller);
        return result;
    }
    return { devices, add, modify, remove, getAll, addDeviceToRoom, makeAction, getDeviceState }
})
