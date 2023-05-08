<script setup>
  import NavBar from '../components/NavBarComponent.vue';
  import AlarmComponent from '../components/AlarmComponent.vue';
const items = [
    { title: 'CASA' },
    { title: 'OFICINA' },
  ]
</script>

<template>
  <v-layout>
    <NavBar/>
    <v-main class="bg">
      <v-container class="content_container">
        <AlarmComponent/>
      </v-container>
    </v-main>
  </v-layout>
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

.content_container {
  padding-top: 30px;
}

</style>