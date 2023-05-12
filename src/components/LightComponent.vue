<!-- Light Features: Encender, Apagar, Intensidad, Color -->
<!-- icon:'mdi-lightbulb'-->

<template>
    <v-card>
        <v-list class="d-flex align-start overflow-y-auto" >
            <v-list-item active="false" class="light_container"
                v-for="(item, index) in functions" :key="index" :value="index">
                <v-list-item-title flexibility="space-between"  v-text="item.title"></v-list-item-title> 
                <template v-slot:prepend>
                    <v-icon color="#146C94">mdi-lightbulb</v-icon>
                </template>
                <template v-slot:append>
                    <v-btn :icon="true" variant="flat" color="transparent" @click="toggleFaved(item)">
                        <v-icon>{{ item.faved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    </v-btn>
                </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-row>
                <v-list-item >
                    <v-list-item  v-text="item.statelight"></v-list-item>
                    <template v-slot:append>
                        <v-switch class="mt-1 mb-1" v-model="item.model" hide-details
                            true-value="Prendido"
                            false-value="Apagado"
                            :label="`${item.model}`">
                        </v-switch>
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
                                    <v-btn color="primary" variant="text"  @click="toggleOpen" >Actualizar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </v-menu>
                </v-row>
            </v-list-item>
            <v-list-item>
                <p class="text_rgb ml-2">Hexa: {{item.hexa}}</p>
                <p class="text_rgb ml-2">R: {{ item.red }} ; G: {{ item.green }} ; B: {{ item.blue }}</p>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item align="center" justify="space-between">
                <v-btn icon variant="flat" color="transparent">
                    <v-icon @click="deleteDevice(device.id)">mdi-delete-outline</v-icon>
                </v-btn>
                </v-list-item>
            </v-list>
    </v-card>
</template>

<script>
const functions = ref([
//DEFAULT VALUES
{ open: false, title: 'Luz', model: 'Apagada', red: 0, blue: 0, green: 0 , hexa:'#000000', cardColor: 'rgb(0, 0, 0)', intensity: 0, faved: false },
])
export default {
    data() {
        return {
        }
    },
}

const toggleFaved = (device) => {
    device.faved = !device.faved;
};
</script>

<style scoped>
.light_container {
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  margin-left: 30px;
  width: 270px;
  color: #265187;
  box-shadow: 5px 9px 0px 0px #146C94;
}
.text {
    color: #265187;
    font-family: 'Varela Round', sans-serif;
    font-size: 12px;
}

</style>