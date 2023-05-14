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

async function makeAction(action, value) {
    try {
      await deviceStore.makeAction(item.value.id, action, value);
    } catch (e) {
      // Handlear errores
    }
  }
</script>

<template> 
    <v-card class="light_container">
        <v-row class="mt-1 mb-6" cols="3">
            <v-icon class="mt-3 ml-3" color="#146C94">mdi-door</v-icon>
            <p class="heading mt-3 ml-3">{{item.name}}</p> <!-- el titulo pasado como param-->
            <v-spacer></v-spacer>
            <v-btn :icon="true" variant="flat" color="transparent" @click="toggleFaved(item)">
                <v-icon color="#146C94">{{ item.faved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-row>
        <v-divider></v-divider>
        <v-row class="mt-6 ml-4 mb-2" >
            <v-switch color="#146C94"  v-model="item.state.lock" true-value='locked' false-value='unlocked' @update:modelValue="(value) => value === 'unlocked' ? makeAction('unlocked') : makeAction('lock')" :label="`${item.state.lock === 'unlocked' ? 'Desbloqueada' : 'Bloqueada' }`"/>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-6  mb-4">
            <v-container v-if="item.state.lock=='unlocked'">
                <v-switch   color="#146C94" class=" ml-4" v-model="item.state.status" true-value='open' false-value='closed' @update:modelValue="(value) => value === 'open' ? makeAction('open') : makeAction('close')" :label="`${item.state.status === 'open' ? 'Abierta' : 'Cerrada' }`"/>
            </v-container>
            <v-container v-else>
                <p class="d-flex align-center title">Puerta Bloqueada</p>
                <p class="text">Desbloquear para abrir o cerrar</p>
            </v-container>
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
  flex-direction: column;
  gap: 15px;
}
.title{
    font-family: 'Varela Round', sans-serif;
    font-size: 20px;
    color:  #146C94;
}
.text{
    font-family: 'Varela Round', sans-serif;
    font-size: 12px;
    color:  #76797c;
}
</style>