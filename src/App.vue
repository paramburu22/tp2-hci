<template>
  <v-app>
    <v-main class="bg">
      <v-container>
        <v-row class="mt-5">
          <Logo />
        </v-row>
        <v-row class="justify-space-between middle_container mt-10 flex-nowrap align-center">
          <h2 class="slogan_text">LISTOS PARA HACER TU VIDA MEJOR</h2>
          <v-card class="d-flex flex-column py-10 px-12 card_container align-center justify-space-between">
            <h4 class="card_title">INICIAR SESION</h4>
            <input v-model="text" placeholder="Email" class="input_text"/>
            <input v-model="text" placeholder="Contraseña" class="input_text"/>
            <v-btn density="default" class="submit_button">Ingresar</v-btn>
            <a class="anchortag" href="https://www.w3schools.com">Olvidé mi contraseña</a>
            <a class="anchortag" href="https://www.w3schools.com">¿No tienes una cuenta?</a>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import Logo from '@/components/Logo.vue'
</script>


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
}
.slogan_text {
  color: rgb(242, 242, 242);
  font-family: 'Varela Round', sans-serif;
  font-size: 70px;
  width: 700px;
}

.middle_container {
  margin-left: 20px;
}

.card_container {
  color: rgb(20, 108, 148);
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  background-color: #EDF1F4;
  height: 500px;
}
.anchortag {
  font-size: 20px;
}

.input_text {
  font-size: 20px;
  width: 100%;
  border-bottom: 1px solid grey;
}

.card_title {
  font-weight: lighter;
  font-size: 40px;
}

.submit_button {
  color: rgb(242, 242, 242);
  background-color: #88c9f9;
  width: 100%;
}
</style>
