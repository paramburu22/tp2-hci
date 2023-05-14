import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Routine, RoutineApi } from "@/api/routine";

export const useRoutineStore = defineStore('routine', () => {
    const routines = ref([]);
    const currentRoutine = ref();
    const allActions = ref([
      {
        id: 'go46xmbqeomjrsjr',
        actions: [{
            name: 'turnOn',
            value: 'Encender',
            params: 0,
          },
          {
            name: 'turnOff',
            value: 'Apagar',
            params: 0,
          },
          {
            name: 'setColor',
            value: 'Cambiar color',
            params: 1,
          },
          {
            name: 'setBrightness',
            value: 'Cambiar intensidad',
            params: 1,
            component: 'slider',
            min: 1,
            max: 100,
            step: 1,
            title: 'Intensidad',
          }
        ],
      },
      {
        id:'c89b94e8581855bc',
        actions: [{
            name: 'setVolume',
            value: 'Cambiar volumen',
            params: 1,
            component: 'slider',
            min: 0,
            max: 10,
            step: 1,
            title: 'Volumen',
          },
          {
            name: 'play',
            value: 'Reproducir',
            params: 0,
          },
          {
            name: 'stop',
            value: 'Detener',
            params: 0,
          },
          {
            name: 'pause', 
            value: 'Pausar',
            params: 0,
          },
          {
            name: 'resume',
            value: 'Reanudar',
            params: 0,
          },
          {
            name: 'nextSong',
            value: 'Siguiente canción',
            params: 0,
          },
          {
            name: 'previousSong',
            value: 'Anterior canción',
            params: 0,
          },
          {
            name: 'setGenre',
            value: 'Cambiar género',
            params: 1,
            component: 'select',
            label: 'Seleccione Género',
            options: [
              {
                label: 'Clásica',
                value: 'classical'
              },
              {
                label: 'Country',
                value: 'country'
              },
              {
                label: 'Dance',
                value: 'dance'
              },
              {
                label: 'Latina',
                value: 'latina'
              },
              {
                label: 'Pop',
                value: 'pop'
              },
              {
                label: 'Rock',
                value: 'rock'
              }
            ]
          },
          {
            name: 'getPlaylist',
            value: 'Obtener playlist',
            params: 0,
          },
        ],
      },
      {
        id:'im77xxyulpegfmv8',
        actions: [{
            name: 'turnOn',
            value: 'Encender',
            params: 0,
          },
          {
            name: 'turnOff',
            value: 'Apagar',
            params: 0,
          },
          {
            name: 'setTemperature',
            value: 'Cambiar Temperatura',
            params: 1,
          },
          {
            name: 'setHeat',
            value: 'Cambiar Fuente de Calor',
            params: 1,
            component: 'select',
            options: [
              {
                  label:'Convencional',
                  value: 'conventional'
              },
              {
                  label:'Arriba',
                  value: 'top'
              },
              {
                  label:'Abajo',
                  value: 'bottom'
              },
            ]
          },
          {
            name: 'setGrill',
            value: 'Cambiar Modo Grill',
            params: 1,
            component: 'select',
            options: [
              {
                label:'Apagado',
                value: 'off'
              },
              {
                label:'Economico',
                value: 'eco'
              },
              {
                label:'Completo',
                value: 'large'
              },
            ],
          },
          {
            name: 'setConvection',
            value: 'Cambiar Modo Conveccion',
            component: 'select',
            params: 1,
            options: [
              {
                  label:'Apagado',
                  value: 'off'
              },
              {
                  label:'Economico',
                  value: 'eco'
              },
              {
                  label:'Convencional',
                  value: 'conventional'
              }
            ]
          },
        ],
      },
      {
        id:'li6cbv5sdlatti0j',
        actions: [{
            name: 'turnOn',
            value: 'Encender',
            params: 0,
          },
          {
            name: 'turnOff',
            value: 'Apagar',
            params: 0,
          },
          {
            name: 'setTemperature',
            value: 'Cambiar Temperatura',
            params: 1,
          },
          {
            name: 'setMode',
            value: 'Cambiar Modo',
            params: 1,
            component: 'select',
            options: [
              {
                value: 'heat',
                label: 'Calor'
              },
              {
                value: 'cool',
                label: 'Frio'
              },
              {
                value: 'fan',
                label: 'Ventilador'
              }
            ]
          },
          {
            name: 'setVerticalSwing',
            value: 'Cambiar Desplazamiento Vertical',
            params: 1,
            component: 'select',
            options: [{
              label: 'Auto',
              value: 'auto'
            },
            {
              value: '-90',
              label: '-90°'
            },
            {
              value: '-45',
              label: '-45°'
            },
            {
              value: '0',
              label: '0°'
            },
            {
              value: '45',
              label: '45°'
            },
            {
              value: '90',
              label: '90°'
            }
          ],
          },
          {
            name: 'setHorizontalSwing',
            value: 'Cambiar Desplazamiento Horizontal',
            params: 1,
            component: 'select',
            options: [{
              label: 'auto',
              value: 'auto'
            },
            {
              value: '23',
              label: '23°'
            },
            {
              value: '45',
              label: '45°'
            },
            {
              value: '67',
              label: '67°'
            },
            {
              value: '90',
              label: '90°'
            }
          ],
          },
          {
            name: 'setFanSpeed',
            value: 'Cambiar Velocidad Ventilador',
            params: 1,
            component: 'select',
            options: [
              {
                value: 'auto',
                label: 'Auto'
              },
              {
                value: '25',
                label: '25%' 
              },
              {
                value: '50',
                label: '50%' 
              },
              {
                value: '75',
                label: '75%' 
              },
              {
                value: '100',
                label: '100%' 
              }
            ]
          }
        ],
      },
      ,
      {
        id: 'lsf78ly0eqrjbz91',
        actions: [{
            name: 'open',
            value: 'Abrir',
            params: 0,
          },
          {
            name: 'close',
            value: 'Cerrar',
            params: 0,
          },
          {
            name: 'lock',
            value: 'Bloquear',
            params: 0,
          },
          {
            name: 'unlock',
            value: 'Desbloquear',
            params: 0,
          }
        ],
      }
    ]);

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
    

    return { routines, add, modify, remove, getAll, execute, getRoutine, currentRoutine, allActions }
})
