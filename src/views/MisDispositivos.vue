<script setup>
  import LogoComponent from '../components/LogoComponent.vue';

const items = [
    { title: 'CASA' },
    { title: 'OFICINA' },
  ]
</script>

<template>
  <v-container class="bg" fluid>
    <v-navigation-drawer  color="#146c94" >
      <v-list-item>
        <LogoComponent />
      </v-list-item>
      <v-col mb-15 class="text-left" justify="space-between">
  <v-row mb-5>
    <v-btn width="210" prepend-icon="mdi-home" variant="text" class="card_container2 text-left ml-5 mt-10 mb-5" style="justify-content: flex-start">Inicio</v-btn>
    <v-btn width="210" prepend-icon="mdi-devices" variant="text" class="card_container text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Dispositivos</v-btn>
    <v-btn width="210" prepend-icon="mdi-clipboard-check-multiple" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Rutinas</v-btn>
    <v-btn width="210" prepend-icon="mdi-help-circle-outline" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Ayuda</v-btn>
    <v-btn width="210" prepend-icon="mdi-close" variant="text" class="card_container3 text-left ml-5 mt-15 mb-5" style="justify-content: flex-start">Cerrar</v-btn>
  </v-row>
</v-col>
    </v-navigation-drawer>
    <div class="upper_bar">
      <v-row justify="space-between center" class="mt-1 mr-1">
        <v-col>
        </v-col>
        <v-col>
          
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn size="large" class="dropdown" v-bind="props">
                      HOGARES       
                      <svg viewBox="0 0 1030 638" width="10">
                      <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
                    </svg>
                    </v-btn>
                    
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :value="index" class="dropdown"
                    >
                    <v-list-item-content>
                      <v-list-item-title variant="text">{{ item.title }}</v-list-item-title> 
                    </v-list-item-content>
                  </v-list-item>
                  <v-btn :prepend-icon="'mdi-plus'" variant="text" class= "dropdown" border-radius="0px" block>AGREGAR</v-btn>  
                </v-list>
            </v-menu>
      </v-col>
      <v-col cols="auto">
        <v-btn icon="mdi-account" variant="text" size="large"/>
        </v-col>
      </v-row>
    </div>
    <div class="alarm">

    </div>
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("@/assets/homeBackground.jpeg");
  background-size: cover;
  overflow-y: scroll;
}

.card_container {
  color: rgb(20, 108, 148);
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  background-color: #29ABE2;
  padding-left: 5;
  align-items: align-left;
  font-weight: bold;
}
.card_container2 {
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  align-items: align-left
}
.card_container3 {
  color: #29ABE2;
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  align-items: align-left
}

.dropdown {
  background-color: #96a0a4;
  font-family: 'Varela Round', sans-serif;
  font-size: medium;
  color:#222d32;
  border-radius: 0px;
}

@media (max-width: 950px) {
  .resposive_text {
    text-align: center;
  }

  .responsive_header {
    justify-content: center;
  }
}

.upper_bar {
    position: absolute;
    color: rgb(20, 108, 148);
    font-family: 'Varela Round', sans-serif;
    background-color: #EDF1F4;
    width: 100%;
    height: 11%;
    top: 0;
    left: 0;
} 

.alarm {
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  border-radius: 5px;
  align-items: align-left;
  margin-left: 1000px;
}

</style>