<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { ref, defineProps } from 'vue';

const props = defineProps(['item']);

const open = ref(false);
const title = ref('Horno');
const temp = ref(100);
const status = ref('Apagado');
const src = ref('Convencional');
const conv = ref('Apagado');
const grill = ref('Apagado');
const mode = ref('Ventilador');
const faved = ref(true);

const speedOptions = ref(['auto','25%', '50%', '75%', '100%']);

const modeOptions = ref([{
  value: 'hot',
  name: 'Calor'
},
{
  value: 'cool',
  name: 'Frio'
},
{
  value: 'fan',
  name: 'Ventilador'
}
]);

const grillOptions = ref(['Apagado', 'Economico', 'Completo'])
const convOptions = ref(['Apagado', 'Economico','Convencional'])
const srcOptions = ref(['Convencional', 'Arriba','Abajo'])


valuesRule: [
  v => !!v || 'Se necesita un valor',
  v => (v && v<90) || 'El valor debe ser mayor a 90°',
  v => (v && v>230) || 'El valor debe ser menor a 230°'
]

const toggleFaved = () => {
    faved.value = !faved.value;
};

const increaseTemp = () => {
    temp.value++;
}

const decreaseTemp = () => {
    temp.value=temp.value-1;
}
</script>

<template>
    <v-card active="false" class="horizontal_v_list_card mt-2">
        <v-row flexibility="space-between" class="same_line ml-6 mr-6">
            <v-icon color="#146C94">mdi-stove</v-icon>
            <p>{{title}}</p>
            <v-btn :icon="true" variant="flat" color="transparent" @click="toggleFaved">
                <v-icon>{{ faved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
        </v-row> 
        <v-divider></v-divider>
        <v-row >
            <v-switch class="is_on ml-6" v-model="model" hide-details
                true-value="Prendido"
                false-value="Apagado"
                :label="`${status}`">
            </v-switch>
        </v-row>
        <v-divider></v-divider>
        <v-col align-center >
            <p class="same_line"> Temperatura</p>
            <v-row class="same_line">
                <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseTemp">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                    <v-text-field v-model="temp" type="number" density="compact" style="width:40px" hide-details variant="outlined" lazy-validation :rules= "[(v) => (Number(v)>80  && Number(v) < 230) || 'Required']"></v-text-field>
                <v-btn :icon="true"  variant="flat" color="transparent" @click="increaseTemp">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-row>
        </v-col>
        <v-divider ></v-divider>
        <v-select
            hide-details
            v-model="src"
            :items="srcOptions"
            label="Fuente de Calor"
        />
        <v-select
            hide-details
            v-model="grill"
            :items="grillOptions"
            item-value="value"
            label="Modo Grill"
        />
        <v-select
            hide-details
            v-model="conv"
            :items="convOptions"
            item-value="value"
            label="Modo Conveccion"
        />
        <v-row justify="center" no-gutters>
            <v-btn :icon="true" variant="flat" color="transparent" @click="toggleFaved">
                <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
        </v-row>

    </v-card>
</template>

<style>

.horizontal_v_list_card{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  width: 250px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 6px
}
.go_up{
    margin-top:-10px;
    margin-bottom:-10px
}
.same_line{
    justify-content: space-between;
    margin: 0;
    align-items: center;
}

.is_on{
    justify-content: space-between;
    margin: 0;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>