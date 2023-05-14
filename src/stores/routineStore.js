import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Routine, RoutineApi } from "@/api/routine";

export const useRoutineStore = defineStore('routine', () => {
    const routines = ref([]);
    const currentRutine = ref();

    async function add(routine) {
        const result = await RoutineApi.add(routine)
        return Object.assign(new Routine(), result)
    }
    async function modify(routine) {
        const result = await RoutineApi.modify(routine)
        await getAll()
        return result
    }

    async function remove(id) {
        const result = await RoutineApi.remove(id)
        await getAll()
        return result
    }

    async function execute(routineId) {
        const result = await RoutineApi.execute(routineId)
        return result;
    }

    async function getAll(controller = null) {
        let result = await RoutineApi.getAll(controller);
        result = result.map((routine) => Object.assign(new Routine(), routine));
        routines.value = result;
        return result;
    }

    async function getRoutine(routineId) {
      const response = await RoutineApi.getRoutine(routineId)
      currentRoom.value = response;
    }

    return { routines, add, modify, remove, getAll, execute, getRoutine }
})
