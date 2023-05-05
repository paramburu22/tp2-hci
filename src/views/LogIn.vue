<script setup>
  import Logo from '@/components/LogoComponent.vue'
  import { useRouter } from 'vue-router';

  const router = useRouter()
    function navigate() {
      return router.push('/home');
  }
</script>

<template>
  <v-container class="bg" fluid>
    <v-row class="mt-5">
      <Logo />
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
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("@/assets/background.png");
  background-size: cover;
  overflow-y: scroll;
  padding-left: 60px;
  padding-right: 60px;
}
.slogan_text {
  color: rgb(242, 242, 242);
  font-family: 'Varela Round', sans-serif;
  font-size: 70px;
}

.middle_container {
  padding-left: 20px;
  padding-right: 20px;
}

.card_container {
  color: rgb(20, 108, 148);
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  background-color: #EDF1F4;
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

</style>
