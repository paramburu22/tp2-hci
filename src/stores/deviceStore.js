import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Device, DeviceApi } from "@/api/device";

export const useDeviceStore = defineStore('device', () => {
    const devices = ref([]);

    async function add(device) {
        const result = await DeviceApi.add(device)
        return Object.assign(new Device(), result)
    }
    async function modify(device) {
        const result = await DeviceApi.modify(device)
        await getAll()
        return result
    }

    async function remove(id) {
        const result = await DeviceApi.remove(id)
        await getAll()
        return result
    }

    async function getAll(controller = null) {
        let result = await DeviceApi.getAll(controller);
        result = result.map((device) => Object.assign(new Device(), device));
        devices.value = result
        return result
    }

    async function addDeviceToRoom(roomId, deviceId) {
      const response = await DeviceApi.addDeviceToRoom(roomId, deviceId)
      await getAll()
    }

    async function makeAction(deviceId, action, value) {
        const response = await DeviceApi.makeAction(deviceId, action, value)
        await getAll()
      }
    return { devices, add, modify, remove, getAll, addDeviceToRoom, makeAction }
})
