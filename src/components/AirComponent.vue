<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { ref, computed } from 'vue';

const open = ref(false);
const title = ref('Aire Acondicionado');
const temp = ref(24);
const model = ref('Apagada');
const speed = ref(50);
const hor = ref(45);
const vert = ref(0);
const mode = ref('Frio');
const faved = ref(true);

const modeOptions = ref([{
    name: 'Calor'
},
{
    name: 'Frio'
},
{
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
    faved = !faved;
};

const increaseTemp = () => {
    if(temp<38)
    temp++;
}

const decreaseTemp = () => {
    if(temp>18)
        temp--;
}


</script>


<template>
                        <v-list-item active="false" class="horizontal_v_list_card mt-2 flex-column text-left"
                            v-for="(item, index) in devices"
                            :key="index"
                            :value="index"
                        >
                            <v-list-item class="mb-2">
                                <v-list-item-title flexibility="space-between"  v-text="item.title"></v-list-item-title> 
                                <template v-slot:prepend>
                                        <v-icon color="#146C94">mdi-air-conditioner</v-icon>
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
                    <v-select
                                    v-model="item.modemode"
                                    :items="modeOptions"
                                    item-title="name"
                                    item-value="name"
                                    label="Seleccione un modo"
                                />
                        <v-list-item class="mt-1 mb-1">
                            <template v-slot:prepend >
                                        <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseTemp()">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                            </template>
                            <p>{{ item.temp }}</p>
                            <template v-slot:append>
                                        <v-btn :icon="true"  variant="flat" color="transparent" @click="increaseTemp()">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                            </template>
                        </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="mt-1 mb-1">
                        <v-list-subtitle>Velocidad Ventilador </v-list-subtitle>
                        <v-list-subtitle class="text_intensity ml-1 mb-2">{{ item.speed }}%</v-list-subtitle>
                        <v-slider class="ml-5 mr-5" width="30px" v-model="item.speed" :min="0" :max="100" :step="25"></v-slider>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-select
                                    v-model="vert"
                                    :items="vertOptions"
                                    item-title="value"
                                    item-value="value"
                                    label="Desplazamiento Vertical"
                                />
                    <v-divider></v-divider>
                    <v-select
                                    v-model="hor"
                                    :items="horOptions"
                                    item-title="value"
                                    item-value="value"
                                    label="Desplazamiento Horizontal"
                                />
                </v-list-item>
</template>