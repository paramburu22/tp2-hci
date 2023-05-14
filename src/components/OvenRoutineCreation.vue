<!-- Light Features: Encender, Apagar, Intensidad, Color -->
<!-- icon:'mdi-lightbulb'-->
<script setup>
import { ref } from 'vue';

const colorDialog = ref(false);
const status = ref({ value: "on", active: true });
const temperature = ref({ value: "90", active: true });
const heat = ref({ value: "conventional", active: true });
const grill = ref({ value: "off", active: true });
const convection = ref({ value: "off", active: true });

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
  }
  ]);

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
  }
]);

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
  }
]);

const increaseTemp = (item) => {
  if (temperature.value < 230) {
    temperature.value++;
  }
};

const decreaseTemp = (item) => {
  if (temperature.value > 80) {
    temperature.value--;
  }
};

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
        <v-row>
            <v-btn :icon="true" variant="flat" color="transparent" @click="decreaseTemp(item)">
                <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field
              v-model="temperature.value"
              :min="80"
              :max="230"
              type="number"
              density="compact"
              hide-details
              variant="outlined"
              class="col-12 col-sm-4"
              :rules="[v => (Number(v) > 80 && Number(v) < 230) || 'La temperatura debe estar entre 80 y 230']"
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
      <v-col>
        <v-switch hide-details width="auto" v-model="temperature.active"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-row align="center">
          <v-select
          item-title="label"
          item-value="value"
          hide-details
          :items="srcOptions"
          label="Fuente de Calor"
          v-model="heat.value" 
        />
        </v-row>
      </v-col>
      <v-switch hide-details v-model="heat.active"/>
    </v-row>
    <v-row>
      <v-col cols="10">
          <v-row align="center">
            <v-select
            item-title="label"
            item-value="value"
            hide-details
            :items="srcOptions"
            label="Fuente de Calor"
            v-model="heat.value" 
          />
          </v-row>
        </v-col>
        <v-switch hide-details v-model="intensity.active"/>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-row align="center">
          <v-select
          item-title="label"
          hide-details
          :items="grillOptions"
          item-value="value"
          label="Modo Grill"
          v-model="grill.value" 
        />
        </v-row>
      </v-col>
      <v-switch hide-details v-model="grill.active"/>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-row align="center">
          <v-select
          item-title="label"
            hide-details
          :items="convOptions"
          item-value="value"
          label="Modo Conveccion"
          v-model="convection.value" 
        />
        </v-row>
      </v-col>
      <v-switch hide-details v-model="convection.active"/>
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