<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { ref, defineProps } from 'vue';

const props = defineProps(['item']);

const open = ref(false);
const title = ref('Aire');
const temp = ref(24);
const status = ref('Apagado');
const speed = ref('auto');
const hor = ref('45°');
const vert = ref('45°');
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

const horOptions = ref([{
    value: 'Auto'
},
{
    value: '23°'
},
{
    value: '45°'
},
{
    value: '67°'
},
{
    value: '90°'
}
]);

const vertOptions = ref([{
    value: 'Auto'
},
{
    value: '-90°'
},
{
    value: '-45°'
},
{
    value: '0°'
},
{
    value: '45°'
},
{
    value: '90°'
}
]);


const toggleFaved = () => {
    faved.value = !faved.value;
};

const increaseTemp = () => {
  if(temp.value < 38) {
    temp.value++;
  }
}

const decreaseTemp = () => {
  if(temp.value > 18)
      temp.value=temp.value-1;
}


</script>


<template>
    <v-card active="false" class="horizontal_v_list_card">
        <v-row flexibility="space-between" class="same_line ml-6 mr-6">
            <v-icon color="#146C94">mdi-air-conditioner</v-icon>
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
        <v-select
            hide-details
            v-model="mode"
            :items="modeOptions"
            item-title="name"
            item-value="value"
            label="Seleccione un modo"
        />
        <v-col align-center >
            <p class="same_line"> Temperatura</p>
            <v-row class="same_line">
                <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseTemp">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <p>{{ temp }}°</p>
                <v-btn :icon="true"  variant="flat" color="transparent" @click="increaseTemp">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-row>
        </v-col>
        <v-divider ></v-divider>
        <v-select
            hide-details
            v-model="speed"
            :items="speedOptions"
            label="Velocidad Ventilador"
        />
        <v-select
            hide-details
            v-model="vert"
            :items="vertOptions"
            item-title="value"
            item-value="value"
            label="Desplazamiento Vertical"
        />
        <v-select
            hide-details
            v-model="hor"
            :items="horOptions"
            item-title="value"
            item-value="value"
            label="Desplazamiento Horizontal"
        />
    </v-card>
</template>

<style>

.horizontal_v_list_card{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  width: 250px;
  display: flex;
  flex-direction: column;
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