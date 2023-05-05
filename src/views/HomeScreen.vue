<script setup>
  import LogoComponent from '@/components/LogoComponent.vue';
</script>


<template>
  <v-container class="bg" fluid>
    <v-navigation-drawer  color="#146c94" >
      <v-list-item>
        <LogoComponent />
      </v-list-item>
      <v-col mb-15 class="text-left" justify="space-between">
        <v-row mb-5>
          <v-btn width="210" prepend-icon="mdi-home" variant="text" class="card_container text-left ml-5 mt-10 mb-5" style="justify-content: flex-start">Inicio</v-btn>
          <v-btn width="210" prepend-icon="mdi-devices" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Dispositivos</v-btn>
          <v-btn width="210" prepend-icon="mdi-clipboard-check-multiple" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Rutinas</v-btn>
          <v-btn width="210" prepend-icon="mdi-help-circle-outline" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Ayuda</v-btn>
          <v-btn width="210" prepend-icon="mdi-close" variant="text" class="card_container3 text-left ml-5 mt-15 mb-5" style="justify-content: flex-start">Cerrar</v-btn>
        </v-row>
      </v-col>
    </v-navigation-drawer>

    <div class="upper_bar">
      <v-row justify="space-between center" class="mt-1 mr-1">
        <v-col></v-col>
        <v-col cols="auto">
          <v-btn icon="mdi-account" variant="text" size="large"/>
        </v-col>
      </v-row>
    </div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props">Activator slot
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.bg {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-image: url("@/assets/homeBackground.jpeg");
  background-size: cover;
  overflow-y: scroll;
}
.navigation {
  background-color: #146c94;
}
.middle_container {
  padding-left: 20px;
  padding-right: 20px;
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
.anchortag {
  font-size: 20px;
}
.input_text {
  font-size: 20px;
  width: 100%;
}
.card_title {
  font-weight: lighter;
  font-size: 36px;
}
.card_forms {
  margin-bottom: 20px
}
.submit_button {
  color: rgb(242, 242, 242);
  background-color: #88c9f9;
  width: 100%;
}
@media (max-width: 950px) {
  .resposive_text {
    text-align: center;
  }f
  .responsive_header {
    justify-content: center;
  }
}
</style>