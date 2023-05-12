import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Room, RoomApi } from "@/api/room";

export const useRoomStore = defineStore('room', () => {
    const rooms = ref([]);
    const currentRoom = ref();

    async function add(room) {
        const result = await RoomApi.add(room)
        await getAll()
        return Object.assign(new Room(), result)
    }
    async function modify(room) {
        const result = await RoomApi.modify(room)
        await getAll()
        return result
    }

    async function remove(id) {
        const result = await RoomApi.remove(id)
        await getAll()
        return result
    }

    async function getAll(controller = null) {
        let result = await RoomApi.getAll(controller);
        result = result.map((room) => Object.assign(new Room(), room));
        rooms.value = result
        return result
    }

    async function getRoom(roomId) {
      const response = await RoomApi.getRoom(roomId)
      currentRoom.value = response;
    }

    return { rooms, currentRoom, add, modify, remove, getAll, getRoom }
})
