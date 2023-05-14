<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import LightComponent from '@/components/LightComponent.vue';
import AirComponent from '@/components/AirComponent.vue';
import SpeakerComponent from '@/components/SpeakerComponent.vue';
import OvenComponent from '@/components/OvenComponent.vue';
import LightRoutine from '@/components/LightRoutine.vue';
import { ref, computed, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoomStore } from '@/stores/roomStore';
import { useRoutineStore } from '@/stores/routineStore';
import { Device } from '@/api/device';
import { useRouter } from 'vue-router';

const deviceStore = useDeviceStore();
const roomStore = useRoomStore();
const routineStore = useRoutineStore();
const router = useRouter();

const open = ref(false);
const colorDialog = ref(false);
const snackbar = ref(false); 
const toastText = ref(null);
const controller = ref(null);
const loading = ref(null);
const toastColor = ref(null);
const save = ref(false);
const currentName = ref();

const devices = ref([]);
const newDeviceId = ref();

const routineId = router.currentRoute.value.path.split('/')[2];

const currentRoutines = computed(() => deviceStore.devices.filter((device) => (device.room && device.room.id) === routineId));

function toggleOpen() {
    open.value = !open.value;
    newDeviceId.value = null;
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
    } finally {
      loading.value = false;
    }
}

async function getRoom() {
  try {
    loading.value = true;
    controller.value = new AbortController()
    currentRoom = await roomStore.getRoom(routineId)
    controller.value = null
  } catch (e) {
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
    await getAllDevices();
    await getRoom();
})

async function createDevice() {
  const device = deviceStore.devices.find(device => {
   return device.id === newDeviceId.value
  });
  if(device) {
    devices.value.push(device);
  }
  toggleOpen();
}
  
  async function deleteDevice(id) {
    try {
      deviceStore.remove(id);
      setToast(`Dispositivo eliminado con éxito`, "blue");
    } catch (e) {
      setToast(`Error al eliminar el dispositivo`, "#FF6666");
    } finally {
      setSnackBarTrue();
    }
  }

  async function deleteRoom() {
    try {
      loading.value = true;
      await roomStore.remove(routineId);
      setToast(`Dispositivo eliminado con éxito`, "blue");
      router.push('/misdispositivos');
    } catch (e) {
      setToast(`Error al eliminar el dispositivo`, "#FF6666");
    } finally {
      setSnackBarTrue();
      loading.value = false;
    }
  }

  const updateContent = (e)  => {
    save.value = true;
    const inputText = e.target.innerText;
    currentName.value = inputText;
  }

  const goBack = computed(() => (() => {
    loading.value = true;
    router.push('/misdispositivos');
  }));

  async function editRoom () {
    try {
      await roomStore.modify(routineId, currentName.value.trim());
      setToast(`Habitación editada con éxito`, "blue");
    } catch (e) {
      setToast(`Error al editar la habitación`, "#FF6666");
    } finally {
      setSnackBarTrue();
      save.value = false;
    }
  }

</script>

<template>
    <v-layout>
        <NavBarComponent />
        <v-main class="bg"> 
            <v-container>
                <v-card class="card_container">
                    <v-list-item class="card_title">
                        <div class="edit_title">
                          <v-card-item width="70%" contenteditable @input="updateContent($event)" class="title">
                            {{ currentName || 'Rutina ' + (routineStore.routines.length + 1)}}
                          </v-card-item>
                          <v-btn @click="editRoom" :disabled="!save" plain>Guardar</v-btn>
                        </div>
                        <template v-slot:append>
                            <v-btn variant="text" size="x-large" icon @click="deleteRoom">
                              <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:prepend>
                            <v-btn variant="text" size="x-large" icon @click="goBack">
                              <v-icon color="#146C94">mdi-chevron-left</v-icon>
                            </v-btn>
                        </template>
                    </v-list-item> 
                    <img v-if="loading" src="@/assets/loading.gif" alt="loading" class="center" />
                    <h2 v-else-if="devices.length == 0" class="no_rooms_text">No hay acciones creadas</h2>
                    <v-row v-else class="cards_render">
                      <v-col v-for="(device) in devices" class="cards_columns">
                        <v-card class="card_item">
                          <LightComponent v-if="device.type.id === 'go46xmbqeomjrsjr'" :item="device" />
                          <AirComponent v-if="device.type.id === 'li6cbv5sdlatti0j'" :item="device" />
                          <SpeakerComponent v-if="device.type.id === 'c89b94e8581855bc'" :item="device"/>
                          <OvenComponent v-if="device.type.id === 'im77xxyulpegfmv8'" :item="device"/>
                          <v-list-item align="center" justify="space-between">
                            <v-btn icon variant="flat" color="transparent">
                                <v-icon @click="deleteDevice(device.id)">mdi-delete-outline</v-icon>
                            </v-btn>
                          </v-list-item>
                        </v-card> 
                      </v-col>
                    </v-row>
                  </v-card>
                </v-container> 
          <v-icon class="add_icon" @click="toggleOpen">mdi-plus-circle-outline</v-icon>
        </v-main>
    </v-layout>
    <v-dialog
        v-model="open"
        width="auto"
    >
        <v-card class="pa-5" width="600">
        <h2 class="dialog_title mb-5">Seleccione Dispositivo</h2>
        <v-select
          v-model="newDeviceId"
          :items="deviceStore.devices"
          item-title="name"
          item-value="id"
          label="Seleccione un dispositivo"
        />
        <LightRoutine />
        <v-row class="buttons_container" no-gutters>
            <v-btn @click="toggleOpen" plain>Cerrar</v-btn>
            <v-btn tonal color="blue" @click="createDevice()">Crear</v-btn>
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
  gap: 15px;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
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
  min-height: 400px;
  min-width: 400px;
  max-width: 90%;
  padding-bottom: 30px;
  font-family: 'Varela Round', sans-serif, bold;
  color: rgb(20, 108, 148);
}

.card_title {
  margin-bottom: 15px;
}

.div_width {
  width: 40%;
  margin-left: 15px;
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
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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