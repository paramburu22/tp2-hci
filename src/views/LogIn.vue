<script setup>
  import Logo from '@/components/Logo.vue'
</script>

<template>
  <main>
  <v-container>
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
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </main>
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
