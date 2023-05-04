<script setup>
  import Logo from '@/components/LogoComponent.vue'
</script>

<template>
  <v-container class="bg" fluid>
    <v-row class="mt-5 responsive_header">
      <Logo />
    </v-row>
    <v-row justify-sm="center" class="justify-space-between middle_container mt-10 align-center">
      <v-col md="7" sm="12">
        <h2 class="slogan_text resposive_text">LISTOS PARA HACER TU VIDA MEJOR</h2>
      </v-col>
      <v-col md="5" sm="12">
        <v-card class="d-flex flex-column py-10 px-12 card_container align-center justify-space-between">
          <v-card-title class="card_forms card_title">INICIAR SESION</v-card-title>
          <v-text-field label="Email" placeholder="johndoe@gmail.com" clearable :rules="[required]" class="input_text"/>
          <v-text-field  label="Contraseña" :rules="[required]" class="input_text"/>
          <v-btn density="default" class="submit_button card_forms">Ingresar</v-btn>
          <a class="anchortag card_forms" href="https://www.w3schools.com">Olvidé mi contraseña</a>
          <a class="anchortag" href="https://www.w3schools.com">¿No tienes una cuenta?</a>
          <RouterLink to="/asdasd">Go to Home</RouterLink>
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

@media (max-width: 950px) {
  .resposive_text {
    text-align: center;
  }

  .responsive_header {
    justify-content: center;
  }
}

</style>
