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
      <v-col class="center_col">
        <h2 class="slogan_text">LISTOS PARA HACER TU VIDA MEJOR</h2>
        <v-btn density="default" class="submit_button card_forms" @click="navigate">Ingresar</v-btn>
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
  text-align: center;
}

.middle_container {
  padding-left: 20px;
  padding-right: 20px;
}


.card_forms {
  margin-top: 75px;
}
.submit_button {
  color: rgb(242, 242, 242);
  background-color: #2b8ed5;
  font-family: 'Varela Round', sans-serif;
  font-size: 25px;
  width: 30%;
}

.center_col {
  justify-content: center;
justify-items: center;
display: grid;
}

</style>
