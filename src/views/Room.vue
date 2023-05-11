<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { ref, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();

const open = ref(false);
const deviceName = ref(null);
const deviceType = ref(null);
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

// const computedDevices = computed(() => {
//   devices.value.forEach((device) => {
//     updateColor(device);
//   });

//   return devices.value;
// });

  function toggleOpen() {
    open.value = !open.value;
    deviceName.value = null;
    deviceType.value = null;
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
  
</script>

<template>
    <v-layout>
        <NavBarComponent />
        <v-main class="bg"> 
            <v-container>
               <v-card class="card_container">
                    <v-list-item>
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
                    <v-list class="horizontal_v_list d-flex align-start">
                        <v-list-item active="false" class="horizontal_v_list_card mt-2 flex-column text-left"
                            v-for="(item, index) in deviceStore.devices"
                            :key="index"
                            :value="index"
                        >
                            <v-list-item class="mb-2">
                                <v-list-item-title flexibility="space-between"  v-text="item.title"></v-list-item-title> 
                                <template v-slot:prepend>
                                        <v-icon color="#146C94">{{item.icon}}</v-icon>
                                </template>
                                <template v-slot:append>
                                        <v-icon color="#146C94">mdi-heart</v-icon>
                                </template>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-row>
                                <v-list-item >
                                    <v-list-item  v-text="item.statelight"></v-list-item>
                                    <template v-slot:append>
                                        <v-switch class="mt-5"></v-switch>
                                    </template>
                                </v-list-item>
                            </v-row>
                            <v-divider></v-divider>
                            <v-list-item>
                            <v-row class="mb-2 mt-2 ml-1">
                                <v-menu  v-model="item.open" :close-on-content-click="false" location="end" >
                                    <template v-slot:activator="{ props }" v-slot:prepend>
                                        <v-btn :style="{ background: `rgb(${item.red}, ${item.green}, ${item.blue})` }" elevation="4" class="mt-2 mb-2"  v-bind="props"></v-btn>
                                    </template>
                                    <div>
                                    <v-card min-width="250">
                                        <v-list>
                                            <v-list-item class="pr-7 pl-5" >
                                                <p>Cambia el color</p>
                                            </v-list-item>
                                        </v-list>
                                        <v-divider></v-divider>
                                        <v-list>
                                            <v-list-item>
                                                <v-row align="center" justify="space-between" no-gutters>
                                                    <v-card width="400" height="370" style="margin: auto">
                                                        <v-responsive :style="{ background: `rgb(${item.red}, ${item.green}, ${item.blue})` }" height="150px"></v-responsive>
                                                        <v-card-text class="menu2">
                                                            <v-slider v-model="item.red" :max="255" :step="1" label="R" hide-details class="ma-4" @input="updateColor">
                                                                <template v-slot:append>
                                                                    <v-text-field v-model="item.red" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                                </template>
                                                            </v-slider>
                                                            <v-slider v-model="item.green" :max="255" :step="1" label="G" hide-details class="ma-4" @input="updateColor">
                                                                <template v-slot:append>
                                                                    <v-text-field v-model="item.green" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                                </template>
                                                            </v-slider>
                                                            <v-slider v-model="item.blue" :max="255" :step="1" label="B" hide-details class="ma-4" @input="updateColor">
                                                                <template v-slot:append>
                                                                    <v-text-field v-model="item.blue" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                                </template>
                                                            </v-slider>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-row>
                                            </v-list-item>
                                        </v-list>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" variant="text" v-model="item.open" :close-on-content-click="true">Actualizar</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </div>
                            </v-menu>
                            <v-list-item>
                                <p class="text_rgb ml-2">Hexa: {{item.hexa}}</p>
                                <p class="text_rgb ml-2">R: {{ item.red }} ; G: {{ item.green }} ; B: {{ item.blue }}</p>
                            </v-list-item>
                        </v-row>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="mt-5 mb-3">
                        <v-list-subtitle>Intensidad: </v-list-subtitle>
                        <v-list-subtitle class="text_intensity ml-1 mb-2">{{ item.intensity }}%</v-list-subtitle>
                        <v-slider class="ml-5 mr-5" width="30px" v-model="item.intensity" :max="100" :step="1"></v-slider>
                    </v-list-item>
                </v-list-item>
                <v-list-item>
                    <v-footer class="add-button-container" absolute>
                        <v-btn variant="flat" icon="mdi-plus-circle-outline" size="50px" @click="toggleOpen"></v-btn>   <!-- hay q cambiar la accion del click-->
                    </v-footer>
                </v-list-item>
            </v-list> 
        </v-card> 
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
            <v-btn tonal color="blue" @click="toggleOpen">Crear</v-btn>
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
  box-shadow: 3px 4px 5px #6394a2;
  transform: translateZ(0);
  
}

.buttons_container {
  display: flex;
  justify-content: space-between;
}

  .add-button-container {
  position: fixed;
  bottom: 16px;
  right: 32px;
  background-color: transparent;
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
</style>