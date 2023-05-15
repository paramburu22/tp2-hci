<!-- Light Features: Encender, Apagar, Intensidad, Color -->
<!-- icon:'mdi-lightbulb'-->
<script setup>
import { useDeviceStore } from '@/stores/deviceStore';
import { defineProps, toRefs, ref } from 'vue';

const colorDialog = ref(false);
const deviceStore = useDeviceStore();
const props = defineProps({
  item: Object,
});

const { item } = toRefs(props);

const toggleFaved = (item) => {
    item.faved = !item.faved;
}

const toastOpen = ref(false);
const toastText = ref('');

const setBrightness = () => makeAction('setBrightness', item.state.brightness);

async function makeAction(action, value) {
    try {
      await deviceStore.makeAction(item.value.id, action, value);
    } catch (e) {
      toastText.value = e.description;
      toastOpen.value = true;
    }
  }
</script>

<template> 
    <v-card class="light_container">
        <v-row class="same_line">
            <v-icon class="mr-3" color="#146C94">mdi-lightbulb</v-icon>
            <h4>{{item.name}}</h4>
          </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center">
            <v-switch color="#146C94" class=" ml-4" v-model="item.state.status" true-value='on' false-value='off' @update:modelValue="(value) => value === 'on' ? makeAction('turnOn') : makeAction('turnOff')" :label="`${item.state.status === 'on' ? 'Prendido' : 'Apagado' }`"/>
        </v-row>
        <v-divider></v-divider>
        <div class="color_buttons">
          <v-menu v-model="colorDialog" :persistent="true" :close-on-content-click="false"  location="end" >
              <template v-slot:activator="{ props }" v-slot:prepend>
                <v-btn v-bind="props" width="100%">Elegir color</v-btn>
              </template>
              <div>
                <v-card>
                  <v-color-picker show-swatches v-model="item.state.color" mode="hexa"/>
                  <v-btn @click="makeAction('setColor', item.state.color.substring(1)) ; colorDialog = false" width="100%" variant="flat">Actualizar</v-btn>
                </v-card>
              </div>
          </v-menu>
          <v-container v-if= "colorDialog===false">
            <p class="text">Hexa: {{item.state.color.charAt(0) === '#' ? item.state.color : '#' + item.state.color}}</p>
          </v-container>
      </div>
        <v-divider></v-divider>
        <v-row class="mt-2">
            <p class="text ml-3">Intensidad: {{item.state.brightness}}%</p> 
            <v-slider color="#146C94" class="ml-5 mr-5" width="30px" v-model="item.state.brightness" :max="100" :step="1" @click="setBrightness"></v-slider>
        </v-row>
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
.light_container {
  font-family: 'Varela Round', sans-serif;
  background-color: transparent;
  border-radius: 20px;
  opacity: 1 !important;
  padding-left: 10px;
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

.color_buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.same_line{
  justify-content: center;
    margin: 0;
    align-items: center;
    flex-wrap: nowrap;
    padding: 15px;
    max-height: 54px;
}
</style>