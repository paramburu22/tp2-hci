import { Api } from "./api";

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ""}`;
    }

    static async getAll(controller) {
      return await Api.get(RoutineApi.getUrl(), controller);
    }

    static async add(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), routine, controller);
    }

    static async modify(routine, controller) {
        return await Api.put(RoutineApi.getUrl(routine.id), routine, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(RoutineApi.getUrl(id), controller);
    }

    static async execute(routineId) {
      return await Api.post(`${Api.baseUrl}/rooms/${routineId}/execute`);
    }

    static async getRoutine(routineId) {
      return await Api.get(RoutineApi.getUrl(routineId));
    }
}

class Routine {
    constructor(id, name, actions) {
      if (id) {
          this.id = id;
      }
      this.name = name;
      this.actions = actions;
    }
    toString() {
      return JSON.stringify(this, null, 2);
    }
}

export { RoutineApi, Routine };
