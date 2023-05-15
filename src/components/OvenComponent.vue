<script setup>
import { ref, defineProps, toRefs } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const { item } = toRefs(props);
const deviceStore = useDeviceStore();
const props = defineProps({
  item: Object,
});

const toastOpen = ref(false);
const toastText = ref('');

const srcOptions = ref([
    {
        label:'Convencional',
        value: 'conventional'
    },
    {
        label:'Arriba',
        value: 'top'
    },
    {
        label:'Abajo',
        value: 'bottom'
    },]);

const grillOptions = ref([
    {
        label:'Apagado',
        value: 'off'
    },
    {
        label:'Economico',
        value: 'eco'
    },
    {
        label:'Completo',
        value: 'large'
    },]);
const convOptions = ref([
    {
        label:'Apagado',
        value: 'off'
    },
    {
        label:'Economico',
        value: 'eco'
    },
    {
        label:'Convencional',
        value: 'conventional'
    },]);


const increaseTemp = (item) => {
  if (item.state.temperature < 230) {
    item.state.temperature++;
    if(item.state.temperature > 80)
    makeAction('setTemperature', item.state.temperature);
  }
};

const decreaseTemp = (item) => {
  if (item.state.temperature > 80) {
    item.state.temperature--;
    if(item.state.temperature < 230)
        makeAction('setTemperature', item.state.temperature);
    else makeAction('setTemperature', 230);
  }
};

async function makeAction(action, value) {
    try {
      await deviceStore.makeAction(item.value.id, action, value);
    } catch (e) {
      toastText.value = `Ha ocurrido un error realizando la acción: ${e && e.description}`;
      toastOpen.value = true;
    }
  }

</script>

<template>
    <v-card active="false" class="horizontal_v_list_card">
        <v-row class="same_line" >
            <v-icon class="mr-3" color="#146C94">mdi-stove</v-icon>
            <h4>{{item.name}}</h4>
        </v-row> 
        <v-divider></v-divider>
        <v-row class=" mt-1 ml-2" >
            <v-switch color="#146C94" class="mt-2 ml-4" v-model="item.state.status" true-value='on' false-value='off' @update:modelValue="(value) => value === 'on' ? makeAction('turnOn') : makeAction('turnOff')" :label="`${item.state.status === 'on' ? 'Prendido' : 'Apagado' }`"/>
        </v-row>
        <v-divider></v-divider>
        <v-col align-center>
            <p class="same_line">Temperatura</p>
            <v-row class="same_line">
                <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseTemp(item)">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-text-field
                    v-model="item.state.temperature"
                    :min="80"
                    :max="230"
                    type="number"
                    density="compact"
                    hide-details
                    variant="outlined"
                    class="col-12 col-sm-4"
                    :rules="[v => (Number(v) > 80 && Number(v) < 230) || 'La temperatura debe estar entre 80 y 230']"
                    @change="makeAction('setTemperature', item.state.temperature)"
                    >
                    <template #error="{ errors }">
                        <span class="text--error">{{ errors[0] }}</span>
                    </template>
                </v-text-field>
                <v-btn :icon="true"  variant="flat" color="transparent" @click="increaseTemp(item)">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-row>
            </v-col>
        <v-divider ></v-divider>
        <v-select
            item-title="label"
            item-value="value"
            hide-details
            :items="srcOptions"
            label="Fuente de Calor"
            v-model="item.state.heat" 
            @update:modelValue="(value) => makeAction('setHeat', value)"
        />
        <v-select
            item-title="label"
            hide-details
            v-model="item.state.grill"
            :items="grillOptions"
            item-value="value"
            label="Modo Grill"
            @update:modelValue="(value) => makeAction('setGrill', value)"
        />
        <v-select
            item-title="label"
            hide-details
            v-model="item.state.convection"
            :items="convOptions"
            item-value="value"
            label="Modo Conveccion"
            @update:modelValue="(value) => makeAction('setConvection', value)"
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
    justify-content: center;
    padding: 15px;
    flex-wrap: nowrap;
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