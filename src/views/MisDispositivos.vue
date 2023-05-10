<script setup>
  import NavBar from '../components/NavBarComponent.vue';
  import AlarmComponent from '../components/AlarmComponent.vue';

  import { useRouter } from 'vue-router';
  import { ref, computed } from 'vue';
  import { useRoomStore } from '@/stores/roomStore';
  import { Room } from '@/api/room'

  const roomStore = useRoomStore();

  const router = useRouter();

  const open = ref(false);
  const result = ref(null);
  const roomName = ref(null);

  function toggleOpen() {
    open.value = !open.value;
  }

  function setResult(r) {
    result.value = JSON.stringify(r, null, 2);
  }

  async function createRoom() {
    const room = new Room(null, roomName.value);

    try {
      room.value = await roomStore.add(room);
      setResult(room.value);
      toggleOpen();
    } catch (e) {
      setResult(e);
    }
  }

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
        <v-icon class="add_icon" @click="toggleOpen">mdi-plus-circle</v-icon>
      </v-container>
    </v-main>
  </v-layout>
  <v-dialog
    v-model="open"
    width="auto"
  >
    <v-card class="pa-5" width="600">
      <h2 class="dialog_title mb-5">Creando Habitación</h2>
      <v-text-field type="input" v-model="roomName" placeholder="Ejemplo: Cocina" clearable :rules="[required]"/>
      <v-row class="buttons_container" no-gutters>
        <v-btn @click="toggleOpen" plain>Cerrar</v-btn>
        <v-btn tonal color="blue" @click="createRoom()">Crear</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
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

.dialog_title {
  font-family: 'Varela Round', sans-serif;
  font-size: 26px;
  color: #265187;
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
}

.add_icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #4e5051;
  font-size: 32px;
  margin-right: 15px;
}
.buttons_container {
  display: flex;
  justify-content: space-between;
}

</style>