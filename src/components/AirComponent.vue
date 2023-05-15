<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { ref, defineProps,toRefs } from 'vue';

import { useDeviceStore } from '@/stores/deviceStore';

const { item } = toRefs(props);
const deviceStore = useDeviceStore();
const props = defineProps({
  item: Object,
});

const controller = ref(null);
const toastOpen = ref(false);
const toastText = ref('');

const speedOptions = ref([{
    value: 'auto',
    label: 'Auto'
},
{
    value: '25',
    label: '25%' 
},
{
    value: '50',
    label: '50%' 
},
{
    value: '75',
    label: '75%' 
},
{
    value: '100',
    label: '100%' 
}]);

const modeOptions = ref([{
  value: 'heat',
  label: 'Calor'
},
{
  value: 'cool',
  label: 'Frio'
},
{
  value: 'fan',
  label: 'Ventilador'
}
]);

const horOptions = ref([{
    label: 'auto',
    value: 'auto'
},
{
    value: '23',
    label: '23°'
},
{
    value: '45',
    label: '45°'
},
{
    value: '67',
    label: '67°'
},
{
    value: '90',
    label: '90°'
}
]);

const vertOptions = ref([{
    label: 'Auto',
    value: 'auto'
},
{
    value: '-90',
    label: '-90°'
},
{
    value: '-45',
    label: '-45°'
},
{
    value: '0',
    label: '0°'
},
{
    value: '45',
    label: '45°'
},
{
    value: '90',
    label: '90°'
}
]);


const increaseTemp = (item) => {
  if (item.state.temperature < 38) {
    item.state.temperature++;
    if(item.state.temperature > 18)
    makeAction('setTemperature', item.state.temperature);
  }
};

const decreaseTemp = (item) => {
  if (item.state.temperature > 18) {
    item.state.temperature--;
    if(item.state.temperature < 38)
        makeAction('setTemperature', item.state.temperature);
  }
};

async function makeAction(action, value) {
    try {
        controller.value = new AbortController();
      await deviceStore.makeAction(item.value.id, action, value, controller.value);
    } catch (e) {
        toastText.value = `Ha ocurrido un error realizando la acción: ${e && e.description}`;
        toastOpen.value = true;
    }
  }

</script>


<template>
    <v-card active="false" class="horizontal_v_list_card">
        <v-row class="same_line">
            <v-icon class="mr-3" color="#146C94">mdi-air-conditioner</v-icon>
            <h4>{{item.name}}</h4>
        </v-row> 
        <v-divider></v-divider>
        <v-row class=" mt-1 ml-2" >
            <v-switch color="#146C94" class="mt-2 ml-4" v-model="item.state.status" true-value='on' false-value='off' @update:modelValue="(value) => value === 'on' ? makeAction('turnOn') : makeAction('turnOff')" :label="`${item.state.status === 'on' ? 'Prendido' : 'Apagado' }`"/>
        </v-row>
        <v-select
            hide-details
            v-model="item.state.mode"
            :items="modeOptions"
            item-title="label"
            item-value="value"
            label="Seleccione un modo"
            @update:modelValue="(value) => makeAction('setMode', value)"
        />
        <v-col align-center >
            <p>Temperatura</p>
            <v-row class="same_line">
                <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseTemp(item)">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <p>{{ item.state.temperature}}°</p>
                <v-btn :icon="true"  variant="flat" color="transparent" @click="increaseTemp(item)">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-row>
        </v-col>
        <v-divider ></v-divider>
        <v-select
            hide-details
            v-model="item.state.fanSpeed"
            :items="speedOptions"
            label="Velocidad Ventilador"
            item-title="label"
            item-value="value"
            @update:modelValue="(value) => makeAction('setFanSpeed', value)"
        />
        <v-select
            hide-details
            v-model="item.state.verticalSwing"
            :items="vertOptions"
            item-title="label"
            item-value="value"
            label="Desplazamiento Vertical"
            @update:modelValue="(value) => makeAction('setVerticalSwing', value)"
        />
        <v-select
            hide-details
            v-model="item.state.horizontalSwing"
            :items="horOptions"
            item-title="label"
            item-value="value"
            label="Desplazamiento Horizontal"
            @update:modelValue="(value) => makeAction('setHorizontalSwing', value)"
        />
    </v-card>

    <v-snackbar
        v-model="toastOpen"
        timeout=2000
        color="red"
        width="auto"
    >
        {{ toastText }}
    </v-snackbar>
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
    justify-content: center;
    margin: 0;
    align-items: center;
    flex-wrap: nowrap;
    padding: 15px;
}

.is_on{
    justify-content: space-around;
    margin: 0;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>