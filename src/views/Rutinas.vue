<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { useRoutineStore } from '@/stores/routineStore';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();
const routineStore = useRoutineStore();
const router = useRouter();
const snackbar = ref(false); 
const toastText = ref(null);
const controller = ref(null);
const loading = ref(null);
const toastColor = ref(null);

async function getAllRoutines() {
  try {
    loading.value = true;
    controller.value = new AbortController()
    const routines = await routineStore.getAll(controller.value)
    controller.value = null;
  } catch (e) {
    setToast(`Ha ocurrido un error al obtener rutinas: ${e && e.description}`, "red");
    setSnackBarTrue();
  } finally {
    loading.value = false;
  }
}

async function getAllDevices() {
  try {
    loading.value = true;
    controller.value = new AbortController()
    const devices = await deviceStore.getAll(controller.value)
    controller.value = null
  } catch (e) {
    setToast(`Ha ocurrido un error al obtener los dispositivos: ${e && e.description}`, "red");
    setSnackBarTrue()
  } finally {
    loading.value = false;
  }
}

function setToast(text, color) {
    toastColor.value = color;
    toastText.value = text;
  }

  function setSnackBarTrue() {
    snackbar.value = true;
  } 

async function deleteRoutine(routineId) {
    try {
      loading.value = true;
      await routineStore.remove(routineId);
      setToast(`Rutina eliminada con éxito`, "blue");
    } catch (e) {
      setToast(`Ha ocurrido un error al eliminar la rutina: ${e && e.description}`, "red");
    } finally {
      setSnackBarTrue();
      loading.value = false;
    }
  }

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

onMounted(async () => {
  await getAllDevices();
  await getAllRoutines();
})

const goToRoutineCreation = computed(() => () => router.push('/routinecreation'));

async function executeActions(routine){
  try {
      await routineStore.execute(routine.id);
      setToast(`Rutina ejecutada con éxito`, "blue");
    } catch (e) {
      setToast(`Ha ocurrido un error al ejecutar la rutina: ${e && e.description}`, "red");
    } finally {
      setSnackBarTrue();
    }
}

</script>

<template>
  <v-layout>
      <NavBarComponent />
      <v-main class="bg"> 
          <v-container>
             <img v-if="loading" src="@/assets/loading.gif" alt="loading" class="center" />
              <h2 v-else-if="!(routineStore.routines || routineStore.routines.length == 0)" class="no_rooms_text">No hay rutinas creadas</h2>
              <v-row v-else class="rooms_container">
                <v-card v-for="(routine) in routineStore.routines"
                  class="card_container" 
                >
                <v-row class="mt-4 ml-4 mb-2">
                  <v-card-title>{{ routine.name }}</v-card-title>
                    <v-btn icon variant="flat" color="transparent">
                      <v-icon @click="executeActions(routine)">mdi-play-circle-outline</v-icon>
                    </v-btn>
               </v-row>
                <v-card-item v-for="(action) in (routine.actions)" class="cards_columns">
                  <v-card class="card_item">
                    <v-row>
                      <v-col>
                        <p class="title ml-3 mt-2">{{action.name || (deviceStore.devices && deviceStore.devices.find(device => device.id === action.device.id).name)}}</p>
                      </v-col>
                    </v-row>
                    <v-row>
                      <p class="subtitle">{{`${getActionValue(action.device.id, action.actionName)}${action.params.length > 0 ? ' : ' + getActionParam(action.device.id, action.actionName, action.params[0]) : '' }`}}</p>
                    </v-row>
                  </v-card> 
                  
                </v-card-item>
                <v-spacer></v-spacer>
                <v-row class="d-flex align-center flex-column">
                  <v-btn icon variant="flat" color="transparent">
                  <v-icon @click="deleteRoutine(routine.id)">mdi-delete-outline</v-icon>
                </v-btn>
                </v-row>
               
                </v-card>
              </v-row>
          </v-container> 
          <v-icon class="add_icon" color="white" @click="goToRoutineCreation">mdi-plus-circle-outline</v-icon>
      </v-main>
      <v-snackbar
        v-model="snackbar"
        timeout=2000
        :color="toastColor"
        width="auto"
      >
        {{ toastText }}
    </v-snackbar>
  </v-layout>
  
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

.edit_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card_container{
  border-radius: 20px;
  background-color: #d5dbe0;
  margin-top: 35px;
  padding-bottom: 30px;
  margin-left: 30px;
  margin-right: 15px;
  height: 100%;
  font-family: 'Varela Round', sans-serif, bold;
  color: rgb(20, 108, 148);
}

.card_title {
  margin-bottom: 15px;
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
  justify-content: space-between;
  width: 350px;
  height: 80px;
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

.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.subtitle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  color: grey;
  margin-left: 30px;
}

.rooms_container {
  gap: 25px;
  margin: 0;
  justify-content: flex-start;
}

</style>