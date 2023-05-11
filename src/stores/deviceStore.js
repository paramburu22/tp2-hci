import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Device, DeviceApi } from "@/api/device";

export const useDeviceStore = defineStore('device', () => {
    const devices = ref([]);

    async function add(device) {
        const result = await DeviceApi.add(device)
        await getAll()
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

    return { devices, add, modify, remove, getAll }
})
