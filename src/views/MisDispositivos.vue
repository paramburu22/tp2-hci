<script setup>
  import NavBar from '../components/NavBarComponent.vue';
  import AlarmComponent from '../components/AlarmComponent.vue';

  import { useRouter } from 'vue-router';
  import { ref, computed } from 'vue';

  const router = useRouter();

  function navigate() {
    return router.push('/room');
  }
</script>

<template>
  <v-layout>
    <NavBar/>
    <v-main class="bg">
      <v-container class="content_container">
        <AlarmComponent/>
      </v-container>
      <v-spacer></v-spacer>
      <v-container>
        <v-card class="card_container" @click="navigate">
          <v-card-title class="card_content">Habitación 1</v-card-title>
          <v-icon size="30" color="#146C94">mdi-heart</v-icon>
        </v-card>
      </v-container>
      <v-container>
        <v-icon class="add_icon">mdi-plus-circle</v-icon>
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

.card_container {
  color: #265187;
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  height: 75px; 
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
}
.card_content {
  font-family: 'Varela Round', sans-serif;
  font-size: 25px;
  font-weight: 100;
}
.add_container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.add_icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #4e5051;
  font-size: 32px;
  margin-right: 15px;
}
</style>