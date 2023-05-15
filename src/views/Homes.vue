<script setup>
  import NavBar from '../components/NavBarComponent.vue';

  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useHomeStore } from '@/stores/homeStore';
  import { Home } from '@/api/home'

  const homeStore = useHomeStore();

  const router = useRouter();

  const open = ref(false);
  const homeName = ref(null);
  const snackbar = ref(false);
  const toastText = ref(null);
  const controller = ref(null);
  const loading = ref(null);
  const toastColor = ref(null);

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

  async function createHome() {
    const capitalizedHome = homeName.value.charAt(0).toUpperCase() + homeName.value.slice(1)
    const home = new Home(null, capitalizedHome);

    try {
      controller.value = new AbortController()
      home.value = await homeStore.add(home, controller.value);
      setToast(`Hogar creado "${capitalizedHome}" con éxito`, "blue");
    } catch (e) {
      setToast(`Ha ocurrido un error al crear el hogar "${capitalizedHome}": ${e && e.description}`, "red");
    } finally {
      toggleOpen();
      setSnackBarTrue();
      homeName.value = null;
    }
  }

  async function getAllHomes() {
    try {
      loading.value = true;
      controller.value = new AbortController()
      const homes = await homeStore.getAll(controller.value)
      controller.value = null;
    } catch (e) {
      setToast(`Ha ocurrido un error al obtener hogares: ${e && e.description}`, "red");
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await getAllHomes();
  })

  function navigate(homeId) {
    return router.push(`/mydevices/${homeId}`);
  }
</script>

<template>
  <v-layout>
    <NavBar/>
    <v-main class="bg">
      <v-container class="px-5">
        <img v-if="loading" src="@/assets/loading.gif" alt="loading" class="center" />
        <h2 v-else-if="homeStore.homes.length == 0" class="no_homes_text">No hay hogares creados</h2>
        <v-container v-else>
            <p class="select_title">Seleccione un hogar</p>
            <v-spacer></v-spacer>
            <v-row class="homes_container" cols="2">
            <v-card v-for="(home) in homeStore.homes"
                class="card_container" 
                @click="navigate(home.id)"
            >
                <v-icon>mdi-home-city-outline</v-icon>
                <p class="card_content" width="50%">{{ home.name}}</p>
            </v-card>
            </v-row>
        </v-container>

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
      <h2 class="dialog_title mb-5">Creando Hogar</h2>
      <v-text-field type="input" v-model="homeName" placeholder="Ejemplo: Oficina" clearable :rules="[required]"/>
      <v-row class="buttons_container" no-gutters>
        <v-btn @click="toggleOpen" plain>Cerrar</v-btn>
        <v-btn tonal color="blue" @click="createHome">Crear</v-btn>
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
.select_title{
  text-align: center;  
  font-family: 'Varela Round', sans-serif;
  font-size: 40px;
  color: #265187;
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

.homes_container {
    padding-top: 50px;
  gap: 25px;
  margin: 0;
  justify-content: space-around;
}

.no_homes_text {
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

</style>