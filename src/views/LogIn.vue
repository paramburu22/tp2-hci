<script setup>
  import LogoComponent from '@/components/LogoComponent.vue'
  import { useRouter } from 'vue-router';

</script>

<template>
  <v-container class="bg" fluid>
    <v-row class="mt-5">
      <LogoComponent />
    </v-row>
    <v-row class="justify-space-between middle_container mt-10 align-center">
      <v-col cols="7" class="title_container">
        <h2 class="slogan_text">LISTOS PARA HACER TU VIDA MEJOR</h2>
      </v-col>
      <v-col cols="5">
        <v-card class="d-flex flex-column py-10 px-12 card_container align-center justify-space-between">
          <v-card-title class="card_forms card_title">INICIAR SESION</v-card-title>
          <v-text-field label="Email" placeholder="alfrepincha07@gmail.com" clearable :rules="[required]" class="input_text"/>
          <v-text-field  label="Contraseña" :rules="[required]" class="input_text"/>
          <v-btn density="default" class="submit_button card_forms" @click="navigate">Ingresar</v-btn>
          <a class="anchortag card_forms" href="https://www.w3schools.com">Olvidé mi contraseña</a>
          <a class="anchortag" href="https://www.w3schools.com">¿No tienes una cuenta?</a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("@/assets/background.png") no-repeat center center;
  background-size: cover;
}
</style>
