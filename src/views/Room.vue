<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { ref, computed, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { Device } from '@/api/device';
import { Room } from '@/api/room';

const deviceStore = useDeviceStore();

const open = ref(false);
const open2 = ref(false);
const deviceName = ref(null);
const deviceType = ref(null);
const snackbar = ref(false);
const toastText = ref(null);
const controller = ref(null);
const loading = ref(null);
const toastColor = ref(null);

const devicesOptions = ref([
  {
    id: 'go46xmbqeomjrsjr',
    name: 'Lampara',
  },
  {
    id: 'li6cbv5sdlatti0j',
    name: 'Aire Acondicionado',
  },
  {
    id: 'mxztsyjzsrq7iaqc',
    name: 'Alarma',
  },
  {
    id: 'ofglvd9gqx8yfl3l',
    name: 'Aspiradora',
  },
  {
    id:'rnizejqr2di0okho',
    name:'Heladera',
  }
]);
const devices = ref([
{ open: false, title: 'Luz 1', icon:'mdi-lightbulb', model: 'Apagada', red: 0, blue: 0, green: 0 , hexa:'#000000', cardColor: 'rgb(0, 0, 0)', intensity: 0, faved: true},
{ open: false, title: 'Luz 2', icon:'mdi-lightbulb', model: 'Apagada', red: 0, blue: 0, green: 0, hexa:'#000000', cardColor: 'rgb(0, 0, 0)', intensity: 0, faved: false },
])

const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const updateColor = (device) => {
  device.hexa = rgbToHex(device.red, device.green, device.blue);
  device.cardColor = `rgb(${device.red}, ${device.green}, ${device.blue})`;
};

const computedDevices = computed(() => {
  devices.value.forEach((device) => {
    updateColor(device);
  });

  return devices.value;
});

const toggleFaved = (device) => {
    device.faved = !device.faved;
};

function toggleOpen() {
    open.value = !open.value;
    deviceName.value = null;
    deviceType.value = null;
}
function setToast(text, color) {
    toastColor.value = color;
    toastText.value = text;
  }

  function setSnackBarTrue() {
    snackbar.value = true;
  } 
function setSelectedDevice (device) {
    deviceType.value = device;
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

onMounted(async () => {
    await getAllDevices();
})

async function createDevice() {
    const capitalizedDevice = deviceName.value.charAt(0).toUpperCase() + deviceName.value.slice(1);
    //constructor(id, name, type, state, room) {
    const device = new Device(null, capitalizedDevice, deviceType.value);
    try {
      device.value = await deviceStore.add(device);
      // Add device to Room
      setToast(`Dispositivo creado "${capitalizedDevice}" con éxito`, "blue");
    } catch (e) {
      setToast(`Error al crear la habitación "${capitalizedDevice}"`, "#FF6666");
    } finally {
      toggleOpen();
      setSnackBarTrue();
      deviceName.value = null;
    }
  }
  
  async function deleteDevice(id) {
    try {
      const deletedDevice = deviceStore.remove(id);
      devices.value = devices.value.filter(device => device.id !== id);
      setToast(`Dispositivo eliminado con éxito`, "blue");
    } catch (e) {
      setToast(`Error al eliminar el dispositivo`, "#FF6666");
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
                <v-card class="card_container">
                    <v-list-item >
                        <v-card-item title="Habitación 1"/>
                        <template v-slot:append>
                            <v-btn variant="text" size="x-large" icon>
                              <v-icon color="#146C94">mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:prepend>
                            <v-btn variant="text" size="x-large" icon>
                              <v-icon color="#146C94">mdi-chevron-left</v-icon>
                            </v-btn>
                        </template>
                    </v-list-item> 
                    <v-row cols="2">
                      <v-card v-for="(device) in deviceStore.devices.reverse()"
                         class="horizontal_v_list_card"
                        >
                      <v-card-title class="card_content">{{device.name}}</v-card-title>
                      <v-list-item align="center" justify="space-between">
                        <v-btn icon variant="flat" color="transparent">
                            <v-icon @click="deleteDevice(device.id)">mdi-delete-outline</v-icon>
                        </v-btn>
                      </v-list-item>
                    
                      </v-card> 
                    </v-row>
                  </v-card>
        </v-container> 
        <v-container>
            <v-icon class="add_icon" @click="toggleOpen">mdi-plus-circle-outline</v-icon>
        </v-container>
        </v-main>
    </v-layout>
    <v-dialog
        v-model="open"
        width="auto"
    >
        <v-card class="pa-5" width="600">
        <h2 class="dialog_title mb-5">Creando Dispositivo</h2>
        <v-text-field type="input" v-model="deviceName" placeholder="Nombre..." clearable :rules="[required]"/>
        <v-select
            v-model="deviceType"
            :items="devicesOptions"
            item-title="name"
            item-value="id"
            label="Seleccione un dispositivo"
        />
        <v-row class="buttons_container" no-gutters>
            <v-btn @click="toggleOpen" plain>Cerrar</v-btn>
            <v-btn tonal color="blue" @click="createDevice()">Crear</v-btn>
        </v-row>
        </v-card>
    </v-dialog>
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
.card_container{
  border-radius: 20px;
  background-color: #d5dbe0;
  margin-top: 50px;
  margin-left: 50px;
  height: 600px;
  width: 1000px;
  font-family: 'Varela Round', sans-serif, bold;
  color: rgb(20, 108, 148);
}

.dialog_title {
  font-family: 'Varela Round', sans-serif;
  font-size: 26px;
  color: #265187;
}

.horizontal_v_list {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  opacity: 1 !important;

}
.horizontal_v_list_card{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  margin-left: 30px;
  width: 270px;
  margin-bottom: 10px;
}

.text_rgb{
    font-family: 'Varela Round', sans-serif;
    font-size: 10px;
    color:  #76797c;
}
.text_intensity{
    font-family: 'Varela Round', sans-serif;
    font-size: 14px;
    color:  #76797c;
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