import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Home, HomeApi } from "@/api/home";

export const useHomeStore = defineStore('home', () => {
    const homes = ref([]);
    const currentHome= ref();

    async function add(home, controller = null) {
        const result = await HomeApi.add(home, controller)
        await getAll()
        return Object.assign(new Home(), result)
    }
    async function modify(homeId, homeName, controller = null) {
        const result = await HomeApi.modify(homeId, homeName, controller)
        await getAll()
        return result
    }

    async function remove(id, controller = null) {
        const result = await HomeApi.remove(id, controller)
        await getAll()
        return result
    }

    async function getAll(controller = null) {
        let result = await HomeApi.getAll(controller);
        result = result.map((home) => Object.assign(new Home(), home));
        homes.value = result
        return result
    }

    async function getHome(homeId, controller = null) {
      const response = await HomeApi.getHome(homeId, controller)
      currentHome.value = response;
    }

    return { homes, currentHome, add, modify, remove, getAll, getHome }
})
