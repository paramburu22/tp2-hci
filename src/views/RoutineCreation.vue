<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { ref, computed, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoomStore } from '@/stores/roomStore';
import { useRoutineStore } from '@/stores/routineStore';
import { useRouter } from 'vue-router';
import { Routine } from '@/api/routine'

const deviceStore = useDeviceStore();
const roomStore = useRoomStore();
const routineStore = useRoutineStore();
const router = useRouter();

const open = ref(false);
const snackbar = ref(false); 
const toastText = ref(null);
const controller = ref(null);
const loading = ref(null);
const toastColor = ref(null);
const save = ref(false);
const currentName = ref();
const routineName = ref((routineStore.currentRoutine && routineStore.currentRoutine.name))

const newDeviceId = ref();
const newDeviceType = ref();
const newAction = ref();
const newActionParams = ref();
const newActionParamsValue = ref();

const routineId = router.currentRoute.value.path.split('/')[2];

const getActionValue = (id, actionName) => {
  const deviceTypeId = deviceStore.devices.find(device => device.id === id).type.id;
  return routineStore.allActions.find(action => action.id === deviceTypeId).actions.find(action => action.name === actionName).value;
};

const getActionParam = (id, actionName, actionParam) => {
  const deviceTypeId = deviceStore.devices.find(device => device.id === id).type.id;
  const action = routineStore.allActions.find(device => device.id === deviceTypeId).actions.find(action => (action.name === actionName && action.component === 'select'));
  if(action) {
    const finalAction = action.options.find(option => option.value === actionParam);
    return finalAction.label;
  }
  return actionParam
};

function toggleOpen() {
    open.value = !open.value;
    newDeviceId.value = null;
    newDeviceType.value = null;
    newAction.value = null;
    newActionParams.value = null;
    newActionParamsValue.value = null;
}
function setToast(text, color) {
    toastColor.value = color;
    toastText.value = text;
  }

  function setSnackBarTrue() {
    snackbar.value = true;
  } 

async function getAllDevices() {
    try {
      loading.value = true;
      controller.value = new AbortController()
      const devices = await deviceStore.getAll(controller.value)
      controller.value = null
    } catch (e) {
      setToast(`Ha ocurrido un error al traer los dispositivos: ${e && e.description}`, "red");
    } finally {
      loading.value = false;
    }
}

  async function createRoutine() {
    loading.value = true;
    const routine = new Routine(null, routineStore.currentRoutine.name, routineStore.currentRoutine.actions);
      try {
        routine.value = await routineStore.add(routine);
        setToast(`Rutina creada con éxito`, "blue");
        router.push('/myroutines');
      } catch (e) {
        setToast(`Ha ocurrido un error al crear la rutina: ${e && e.description}`, "red");
      } finally {
        setSnackBarTrue();
        loading.value = false;
      }
  }

  const goBack = computed(() => (() => {
    loading.value = true;
    router.push('/myroutines');
  }));

  //For AC
  const increaseAirTemp = () => {
    if(!newActionParamsValue.value) {
      newActionParamsValue.value = 24;
    }
    if (newActionParamsValue.value < 38) {
      newActionParamsValue.value++;
    }
  };
  const decreaseAirTemp = () => {
    if(!newActionParamsValue.value) {
      newActionParamsValue.value = 24;
    }
    if (newActionParamsValue.value > 18) {
      newActionParamsValue.value--;
    };
  }
  
//For Oven
  const increaseOvenTemp = () => {
    if(!newActionParamsValue.value) {
      newActionParamsValue.value = 90;
    }
    if (newActionParamsValue.value < 230) {
      newActionParamsValue.value++;
    }
  };
  const decreaseOvenTemp = () => {
    if(!newActionParamsValue.value) {
      newActionParamsValue.value = 90;
    }
    if (newActionParamsValue.value > 80) {
      newActionParamsValue.value--;
    };
  }

  const addRoutineAction = () => {
  const action = {
    device: { id: newDeviceId.value },
    actionName: newAction.value,
    params: newActionParamsValue.value ? [ newActionParamsValue.value ] : [],
  };

  routineStore.currentRoutine.actions.push(action);
  toggleOpen();
}


  const deleteAction = (deviceId, actionName) => {
    const index = routineStore.currentRoutine.actions.findIndex(action => action.device.id === deviceId && action.actionName === actionName);
    if (index > -1) {
      routineStore.currentRoutine.actions.splice(index, 1);
    }
  }


  onMounted(async () => {
    await getAllDevices();
    routineStore.currentRoutine = {
      name: 'Rutina ' + (routineStore.routines && routineStore.routines.length + 1), 
      actions: [],
    };
  })

</script>

<template>
  <v-layout>
    <NavBarComponent />
    <v-main class="bg"> 
      <v-container>
          <v-card class="card_container">
            <v-list-item>
                <v-card-title class="title card_title">
                 <v-text-field v-if="routineStore.currentRoutine" v-model="routineStore.currentRoutine.name" /> 
                </v-card-title>
                <template v-slot:append>
                  <v-btn @click="createRoutine" :disabled="(!routineStore.currentRoutine || routineStore.currentRoutine.actions.length == 0)" plain>Crear Rutina</v-btn>
                </template>
                <template v-slot:prepend>
                    <v-btn  variant="text" size="x-large" icon @click="goBack">
                      <v-icon color="#146C94">mdi-chevron-left</v-icon>
                    </v-btn>
                </template>
            </v-list-item>
            <img v-if="loading" src="@/assets/loading.gif" alt="loading" class="center" />
            <h2 v-else-if="(!routineStore.currentRoutine || routineStore.currentRoutine.actions.length == 0)" class="no_rooms_text">No hay acciones creadas</h2>
            <v-row v-else class="cards_render">
              <v-col v-for="(action) in (routineStore.currentRoutine && routineStore.currentRoutine.actions)" class="cards_columns">
                <v-card class="card_item">
                  <v-row>
                    <v-col>
                      <p class="title ml-3 mt-2">{{action.name || deviceStore.devices.find(device => device.id === action.device.id).name}}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <p class="subtitle">{{`${getActionValue(action.device.id, action.actionName)}${action.params.length > 0 ? ' : ' + getActionParam(action.device.id, action.actionName, action.params[0]) : '' }`}}</p>
                  </v-row>
                  <v-btn icon variant="flat" color="transparent">
                    <v-icon @click="deleteAction(action.device.id, action.actionName)">mdi-delete-outline</v-icon>
                  </v-btn>
                </v-card> 
              </v-col>
            </v-row>
          </v-card>
        </v-container> 
      <v-icon class="add_icon" color="white" @click="toggleOpen">mdi-plus-circle-outline</v-icon>
    </v-main>
  </v-layout>
  <v-dialog v-model="open" width="auto">
    <v-card class="pa-5" width="600">
      <h2 class="dialog_title mb-5">Seleccione Dispositivo</h2>
      <v-select
        v-model="newDeviceId"
        :items="deviceStore.devices"
        item-title="name"
        item-value="id"
        label="Seleccione un dispositivo"
        @update:modelValue="(value) => {
          newAction = null;
          newActionParamsValue = null;
          newActionParams = null;
          newDeviceType = deviceStore.devices.find(device => device.id === value).type.id;
        }"
      />
      <v-select
        v-model="newAction"
        :items="(newDeviceType && routineStore.allActions.find(action => action.id === newDeviceType).actions)"
        item-title="value"
        item-value="name"
        label="Seleccione una acción"
        @update:modelValue="(value) => {
          newActionParamsValue = null;
          newActionParams = (routineStore.allActions.find(action => action.id === newDeviceType).actions.find(action => action.name === value));
        }"
      />
      <div v-show="(newActionParams && newActionParams.params) === 1">
        <v-color-picker show-swatches v-if="newAction === 'setColor'" v-model="newActionParamsValue"/>
        <div v-if="(newActionParams && newActionParams.component) === 'slider'">
          <p>{{`${newActionParams.title}: ${newActionParamsValue || 0}` }}</p>
          <v-slider :step="newActionParams.step" :min="newActionParams.min" :max="newActionParams.max" v-model="newActionParamsValue" />
        </div>
        <v-select :items="newActionParams.options" v-if="newActionParams && newActionParams.component === 'select'" label="Seleccione una opción" v-model="newActionParamsValue" item-value="value" item-title="label" />
        <v-row align="center" justify="center" v-if="newAction === 'setTemperature' && newDeviceType !== 'im77xxyulpegfmv8'">
          <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseAirTemp()">
              <v-icon>mdi-minus</v-icon>
          </v-btn>
          <p>{{ newActionParamsValue || 24 }}°</p>
          <v-btn :icon="true"  variant="flat" color="transparent" @click="increaseAirTemp()">
              <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
        <v-row class="mt-2 mb-4" align="center" justify="center" v-if="newAction === 'setTemperature' && newDeviceType === 'im77xxyulpegfmv8'">
          <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseOvenTemp()">
              <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-text-field
            v-model="newActionParamsValue"
            :min="80"
            :max="230"
            type="number"
            density="compact"
            hide-details
            variant="outlined"
            class="col-12 col-sm-4"
            :rules="[v => (Number(v) > 80 && Number(v) < 230) || 'La temperatura debe estar entre 80 y 230']"
            placeholder="Seleccione valores entre 80 y 230"
          >
            <template #error="{ errors }">
              <span class="text--error">{{ errors[0] }}</span>
            </template>
          </v-text-field>
          <v-btn :icon="true"  variant="flat" color="transparent" @click="increaseOvenTemp()">
              <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-row class="buttons_container mt-2" no-gutters>
        <v-btn @click="toggleOpen" plain>Cerrar</v-btn>
        <v-btn tonal color="blue" @click="addRoutineAction">Crear</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-model="snackbar"
    timeout=2000
    :color="toastColor"
    width="auto"
  >
    {{ toastText }}
  </v-snackbar>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("@/assets/homeBackground.jpeg");
  background-size: cover;
  overflow-y: scroll;
}
.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card_title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: black;
  margin-top: 10px;
  width: 50%;
}
.subtitle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  color: grey;
}
.device_action {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
  color: grey;
}
.edit_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%
}
.card_container{
  border-radius: 20px;
  background-color: #d5dbe0;
  margin-top: 35px;
  min-height: 400px;
  min-width: 400px;
  max-width: 90%;
  padding-bottom: 30px;
  font-family: 'Varela Round', sans-serif, bold;
  color: rgb(20, 108, 148);
}

.cards_render {
  padding-left: 20px;
  padding-right: 20px;
  gap: 25px;
  justify-content: space-between;
}

.cards_columns {
  justify-content: space-around;
  display: flex;
}
.dialog_title {
  font-family: 'Varela Round', sans-serif;
  font-size: 26px;
  color: #265187;
}
.card_item{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.add_icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #4e5051;
  font-size: 32px;
  margin-right: 15px;
}
.buttons_container {
  display: flex;
  justify-content: space-between;
}

.no_rooms_text {
  color: #265187;
  font-family: 'Varela Round', sans-serif;
  font-size: 32px;
  text-align: center;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
}
</style>