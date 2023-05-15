
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
    <v-card class="door_container">
        <v-row class="same_line">
            <v-icon class="mr-3" color="#146C94">mdi-door</v-icon>
            <h4>{{item.name}}</h4>
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
.door_container {
  font-family: 'Varela Round', sans-serif;
  background-color: transparent;
  border-radius: 20px;
  opacity: 1 !important;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
}
.same_line{
  justify-content: center;
  padding: 15px;
  flex-wrap: nowrap;
  margin: 0;
  align-items: center;
    max-height: 54px;
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