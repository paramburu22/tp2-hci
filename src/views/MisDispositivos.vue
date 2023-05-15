<script setup>
  import NavBar from '../components/NavBarComponent.vue';
  import AlarmComponent from '../components/AlarmComponent.vue';

  import { useRouter } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';
  import { useRoomStore } from '@/stores/roomStore';
  import { useHomeStore } from '@/stores/homeStore';
  import { Room } from '@/api/room'

  const roomStore = useRoomStore();
  const homeStore = useHomeStore();

  const router = useRouter();

  const open = ref(false);
  const roomName = ref(null);
  const snackbar = ref(false);
  const toastText = ref(null);
  const controller = ref(null);
  const loading = ref(null);
  const toastColor = ref(null);

  const homeId = router.currentRoute.value.path.split('/')[2];

  const currentRooms = computed(() => roomStore.rooms.filter((room) => (room.home && room.home.id) === homeId));

  function toggleOpen() {
    open.value = !open.value;
  }

  function setToast(text, color) {
    toastColor.value = color;
    toastText.value = text;
  }

  function setSnackBarTrue() {
    snackbar.value = true;
  } 

  async function createRoom() {
    const capitalizedRoom = roomName.value.charAt(0).toUpperCase() + roomName.value.slice(1)
    const room = new Room(null, capitalizedRoom);

    try {
      room.value = await roomStore.add(room);
      await roomStore.addRoomToHome(homeId, room.value.id);
      setToast(`Habitación creada "${capitalizedRoom}" con éxito`, "blue");
    } catch (e) {
      setToast(`Ha ocurrido un error al crear la habitación "${capitalizedRoom}": ${e && e.description}`, "red");
    } finally {
      toggleOpen();
      setSnackBarTrue();
      roomName.value = null;
    }
  }

  async function getAllRooms() {
    try {
      loading.value = true;
      controller.value = new AbortController()
      const rooms = await roomStore.getAll(controller.value)
      controller.value = null
    } catch (e) {
      setToast(`Ha ocurrido un error al obtener habitaciones: ${e && e.description}`, "red");
    } finally {
      loading.value = false;
    }
  }

  async function getHome() {
    try {
      loading.value = true;
      controller.value = new AbortController();
      await homeStore.getHome(homeId, controller.value);
      controller.value = null;
    } catch (e) {
      setToast(`Ha ocurrido un error al obtener el hogar: ${e && e.description}`, "red");
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await getAllRooms();
    await getHome();
  })

  function navigate(roomId) {
    return router.push(`/room/${roomId}`);
  }

  async function deleteRoom(id) {
    try {
      await roomStore.remove(id);
      setToast(`Habitacion eliminada con éxito`, "blue");
    } catch (e) {
      setToast(`Ha ocurrido un error al eliminar la habitación: ${e && e.description}`, "red");
    } finally {
      setSnackBarTrue();
    }
  }

  async function deleteHome() {
    try {
      const ids = currentRooms.value.map(device => device.id);
      loading.value = true;
      for(let i = 0 ; i < ids.length ; i++) {
        await deleteRoom(ids[i]);
      }
      controller.value = new AbortController();
      await homeStore.remove(homeId, controller.value);
      setToast(`Hogar eliminado con éxito`, "blue");
      router.push('/home');
    } catch (e) {
      setToast(`Ha ocurrido un error al eliminar el hogar: ${e && e.description}`, "red");
    } finally {
      setSnackBarTrue();
      loading.value = false;
    }
  }

</script>

<template>
  <v-layout>
    <NavBar/>
    <v-main class="bg">
      <v-container class="content_container">
        <v-btn size="large" prepend-icon="mdi-delete" class="delete_btn" @click="deleteHome">Eliminar Hogar</v-btn>
      </v-container>
      <p class="rooms_title">Habitaciones de {{ (homeStore.currentHome && homeStore.currentHome.name) }}</p>
      <v-spacer></v-spacer>
      <v-container class="px-5">
        <img v-if="loading" src="@/assets/loading.gif" alt="loading" class="center" />
        <h2 v-else-if="roomStore.rooms.length == 0" class="no_rooms_text">No hay habitaciones creadas</h2>
        <v-row v-else class="rooms_container" cols="2">
          <v-card v-for="(room) in currentRooms"
            class="card_container" 
            @click="navigate(room.id)"
          >
            <p class="card_content" width="50%">{{room.name}}</p>
          </v-card>
        </v-row>
      </v-container>
      <v-container>
        <v-icon class="add_icon" color="white" @click="toggleOpen">mdi-plus-circle-outline</v-icon>
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

  <v-snackbar
    v-model="snackbar"
    timeout=2000
    :color="toastColor"
    width="auto"
  >
    {{ toastText }}
  </v-snackbar>
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
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  padding-left: 20px;
}
.card_content {
  font-family: 'Varela Round', sans-serif;
  font-size: 25px;
  font-weight: 100;
  width: 60%;
  overflow: hidden;
white-space: nowrap;
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

.rooms_container {
  gap: 25px;
  margin: 0;
  justify-content: flex-start;
}

.no_rooms_text {
  color: #265187;
  font-family: 'Varela Round', sans-serif;
  font-size: 32px;
  text-align: center;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
}

.delete_btn {
  color: #265187;
  font-family: 'Varela Round', sans-serif;
  font-size: 16px;
  
}

.rooms_title {
  text-align: center;  
  font-family: 'Varela Round', sans-serif;
  font-size: 30px;
  color: #265187;
}

</style>