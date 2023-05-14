<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
import { useRoutineStore } from '@/stores/routineStore';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();
const routineStore = useRoutineStore();
const router = useRouter();

const loading = ref(null);
const save = ref(false);
const currentName = ref();

const updateContent = (e)  => {
  save.value = true;
  const inputText = e.target.innerText;
  currentName.value = inputText;
}

async function deleteRoutine() {
    try {
      loading.value = true;
      await routineStore.remove(routineId);
      setToast(`Dispositivo eliminado con éxito`, "blue");
      router.push('/misdispositivos');
    } catch (e) {
      setToast(`Error al eliminar el dispositivo`, "#FF6666");
    } finally {
      setSnackBarTrue();
      loading.value = false;
    }
  }

async function editRoutines() {
  try {
    await routineStore.modify(routineId, currentName.value.trim());
    setToast(`Habitación editada con éxito`, "blue");
  } catch (e) {
    setToast(`Error al editar la habitación`, "#FF6666");
  } finally {
    setSnackBarTrue();
    save.value = false;
  }
}

const goBack = computed(() => (() => {
  loading.value = true;
  router.push('/misdispositivos');
}));

const goToRoutineCreation = computed(() => () => router.push('/routinecreation'));
</script>

<template>
  <v-layout>
      <NavBarComponent />
      <v-main class="bg"> 
          <v-container>
             <img v-if="loading" src="@/assets/loading.gif" alt="loading" class="center" />
              <h2 v-else-if="routineStore.routines.length == 0" class="no_rooms_text">No hay rutinas creadas</h2>
              <v-row v-else class="rooms_container" cols="2">
                <v-card v-for="(routine) in routineStore.routines.reverse()"
                  class="card_container" 
                  @click="navigate(routine.id)"
                >
                </v-card>
              </v-row>
          </v-container> 
          <v-icon class="add_icon" @click="goToRoutineCreation">mdi-plus-circle-outline</v-icon>
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

.edit_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card_container{
  border-radius: 20px;
  background-color: #d5dbe0;
  margin-top: 35px;
  min-height: 400px;
  min-width: 400px;
  max-width: 90%;
  padding-bottom: 30px;
  font-family: 'Varela Round', sans-serif, bold;
  color: rgb(20, 108, 148);
}

.card_title {
  margin-bottom: 15px;
}
.cards_render {
  padding-left: 20px;
  padding-right: 20px;
  gap: 25px;
  justify-content: space-between;
}

.cards_columns {
  justify-content: space-around;
  display: flex;
}
.dialog_title {
  font-family: 'Varela Round', sans-serif;
  font-size: 26px;
  color: #265187;
}
.card_item{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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


</style>