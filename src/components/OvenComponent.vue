<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['item']);
const title = ref('Horno');
const temp = ref(100);
const status = ref('Apagado');
const src = ref('Convencional');
const conv = ref('Apagado');
const grill = ref('Apagado');
const faved = ref(true);

const grillOptions = ref(['Apagado', 'Economico', 'Completo']);
const convOptions = ref(['Apagado', 'Economico','Convencional']);
const srcOptions = ref(['Convencional', 'Arriba','Abajo']);


const toggleFaved = () => faved.value = !faved.value;

const increaseTemp = () => temp.value++;

const decreaseTemp = () => temp.value=temp.value-1;

</script>

<template>
    <v-card active="false" class="horizontal_v_list_card">
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
    </v-card>
</template>

<style scoped>
.horizontal_v_list_card{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  width: 250px;
  justify-content: center;
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