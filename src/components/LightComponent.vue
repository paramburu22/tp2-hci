<!-- Light Features: Encender, Apagar, Intensidad, Color -->
<!-- icon:'mdi-lightbulb'-->
<script setup>
import { ref } from 'vue';

const item = ref(
//DEFAULT VALUES
{ open: false, title: 'Luz', model: 'Apagada', red: 0, blue: 0, green: 0 , hexa:'#000000', cardColor: 'rgb(0, 0, 0)', intensity: 0, faved: false },
)
const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const updateColor = (item) => {
  item.cardColor = `rgb(${item.red}, ${item.green}, ${item.blue})`;
  item.hexa = rgbToHex(item.red, item.green, item.blue);
  toggleOpen(item);
}
const toggleFaved = (item) => {
    item.faved = !item.faved;
}
function toggleOpen(item) {
    item.open.value = !item.open.value;
}
</script>

<template> 
    <v-card class="light_container">
        <v-row class="mt-1" cols="3">
            <v-icon class="mt-3 ml-3" color="#146C94">mdi-lightbulb</v-icon>
            <p class="heading mt-3 ml-3">{{item.title}}</p> <!-- el titulo pasado como param-->
            <v-spacer></v-spacer>
            <v-btn :icon="true" variant="flat" color="transparent" @click="toggleFaved(item)">
                <v-icon color="#146C94">{{ item.faved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-switch color="#146C94" class="mt-2 ml-4" v-model="item.model" hide-details true-value="Prendido" false-value="Apagado" :label="`${item.model}`"/>
        </v-row>
        <v-divider></v-divider>
            <v-row class="mt-2 ml-1">
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
                                            <v-card-text>
                                                <v-slider v-model="item.red" :max="255" :step="1" label="R" hide-details class="ma-4">
                                                    <template v-slot:append>
                                                        <v-text-field v-model="item.red" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                    </template>
                                                </v-slider>
                                                <v-slider v-model="item.green" :max="255" :step="1" label="G" hide-details class="ma-4" >
                                                    <template v-slot:append>
                                                        <v-text-field v-model="item.green" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                    </template>
                                                </v-slider>
                                                <v-slider v-model="item.blue" :max="255" :step="1" label="B" hide-details class="ma-4">
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
                            <v-btn color="primary" variant="text"  @click="updateColor()">Actualizar</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-menu>
            <v-col>
                <p class="text ml-2">Hexa: {{item.hexa}}</p>
                <p class="text ml-2">R: {{ item.red }} ; G: {{ item.green }} ; B: {{ item.blue }}</p> 
            </v-col> 
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-2">
            <p class="text ml-3">Intensidad: {{item.intensity}}%</p> 
            <v-slider color="#146C94" class="ml-5 mr-5" width="30px" v-model="item.intensity" :max="100" :step="1"></v-slider>
        </v-row>
    </v-card>
</template>



<style scoped>
.light_container {
  font-family: 'Varela Round', sans-serif;
  background-color: transparent;
  border-radius: 20px;
  opacity: 1 !important;
  padding-left: 10px;
  padding-top: 5px;
  padding-right: 10px;
  height: 350px;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.text{
    font-family: 'Varela Round', sans-serif;
    font-size: 12px;
    color:  #76797c;
}
</style>