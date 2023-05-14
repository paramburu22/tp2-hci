<!-- Light Features: Encender, Apagar, Intensidad, Color -->
<!-- icon:'mdi-lightbulb'-->
<script setup>
import { ref } from 'vue';

const colorDialog = ref(false);
const status = ref({ value: "on", active: true });
const color = ref({ value: "#FFFFFF", active: true });
const intensity = ref({ value: "100", active: true });
</script>

<template> 
  <div>
    <v-row align="center" no-gutters>
      <v-col align="center">
        <h2>Acción</h2>
      </v-col>
      <v-col align="center">
        <h2>Activar</h2>
      </v-col>
    </v-row>
    <v-row align="center" no-gutters>
      <v-col align="flex-start" cols="10">
        <v-switch color="#146C94" v-model="status.value" true-value='on' false-value='off' :label="`${status.value === 'on' ? 'Prendido' : 'Apagado' }`"/>
      </v-col>
      <v-col align="flex-end">
        <v-switch v-model="status.active" />
      </v-col>
    </v-row>
    <v-row align="center" justify="space-between" no-gutters>
      <v-col cols="10">
        <v-menu  v-model="colorDialog" :close-on-content-click="false" location="start" >
          <template v-slot:activator="{ props }" v-slot:prepend>
            <v-btn v-bind="props" width="50%" class="mb-2">Elegir color</v-btn>
          </template>
          <div>
            <v-card>
              <v-color-picker mode="hexa" v-model="color.value"/>
            </v-card>
          </div>
        </v-menu>
        <p class="text ml-2">Hexa: {{ color.value }}</p>
        </v-col>
        <v-col>
          <v-switch hide-details width="auto" v-model="color.active"/>
        </v-col>
    </v-row>
    <v-row align="center" justify="space-between" no-gutters>
      <v-col cols="10">
        <v-row align="center">
          <p class="text ml-3">Intensidad: {{intensity.value}}</p> 
          <div class="div_width">
            <v-slider color="#146C94" :max="100" :step="1" hide-details v-model="intensity.value"/>
          </div>
        </v-row>
      </v-col>
      <v-switch hide-details v-model="intensity.active"/>
    </v-row>
  </div>
</template>



<style scoped>
.div_width {
  width: 40%;
  margin-left: 15px;
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
</style>