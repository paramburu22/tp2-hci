<script setup>
  import LogoComponent from '@/components/LogoComponent.vue';
  import NavBarComponent from '@/components/NavBarComponent.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()
    function navigate() {
      return router.push('/user');
  }
  const items1 = [
    { title: 'Casa'},
    { title: 'Oficina' },
  ]
  const items2 = [
    { title: 'Hab. 1', place:'Casa' },
    { title: 'Hab. 3', place:'Oficina' },
  ]
  const items3 = [
    { title: 'Alarma 1', place: 'Casa', mode:'Modo Regular'},
    { title: 'Alarma', place: 'Oficina', mode:'Modo Regular' },
  ]
  const recents = [
    { title: 'Alarma 1', place: 'Casa', icon:'mdi-alarm-light-outline'},
    { title: 'Aire Acondicionado', place: 'Casa', room:'Habitacion1', icon:'mdi-air-conditioner'},
    { title: 'Luz 2', place: 'Casa', room:'Habitacion1',icon:'mdi-lightbulb' },
    { title: 'Alarma 1', place: 'Casa', icon:'mdi-alarm-light-outline'},
    { title: 'Aire Acondicionado', place: 'Casa', room:'Habitacion1', icon:'mdi-air-conditioner'},
    { title: 'Luz 2', place: 'Casa', room:'Habitacion1',icon:'mdi-lightbulb' },
    { title: 'Alarma 1', place: 'Casa', icon:'mdi-alarm-light-outline'},
  ]
</script>


<template>
  <v-layout>
    <NavBarComponent />
      <v-main class="bg">
        <v-container class="layout">
          <v-row>
            <v-col cols="8">
              <h2 class="layout_title">FAVORITOS</h2>
              <v-card class="card_container card_c1">
                <v-container class="favourites_content">
                  <v-container>
                    <v-list class="favourites_row">
                      <v-list-item class="favourites_card"
                        v-for="(item, index) in items1"
                        :key="index"
                        :value="index"
                      >
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                        <template v-slot:append>
                          <v-icon color="#146C94" class="v-list-item-icon">mdi-heart</v-icon>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-container>
                  <v-container>
                    <v-list class="favourites_row">
                      <v-list-item class="pt-2 pb-2 favourites_card"
                        v-for="(item,index) in items2"
                        :key="index"
                        :value="index"
                      >
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                          <template v-slot:append>
                            <v-icon class="mb-7 v-list-item-icon" color="#146C94">mdi-heart</v-icon>
                          </template>
                        <v-list-item-subtitle class="mt-1" v-text="item.place"></v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-container>
                  <v-container>
                    <v-list class="favourites_row">
                        <v-list-item class="pt-2 pb-2 favourites_card"
                          v-for="(item,index) in items3"
                          :key="index"
                          :value="index"
                        >
                          <v-list-item-title v-text="item.title"></v-list-item-title> 
                          <template v-slot:prepend>
                            <v-icon class="mb-16 v-list-item-icon">mdi-alarm-light-outline</v-icon>
                          </template>
                          <template v-slot:append>
                            <v-icon class="mb-16 v-list-item-icon" color="#146C94">mdi-heart</v-icon>
                          </template>
                          <v-list-item-subtitle class="mt-3" v-text="item.place"></v-list-item-subtitle>
                          <v-list-item-subtitle class="mt-1" v-text="item.mode"></v-list-item-subtitle>
                        </v-list-item>
                      </v-list>
                  </v-container>
                </v-container>
              </v-card>
            </v-col>
            <v-col>
              <h2 class="layout_title">RECIENTES</h2>
              <v-card class="card_container d-flex flex-column align-center">
                <v-list class="recents_list ">
                  <v-list-item width="250" class="mb-2 mt-2 recents_column"
                    v-for="(item,index) in recents"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title  v-text="item.title"></v-list-item-title> 
                    <template v-slot:prepend>
                      <v-icon class="mr-3 v-list-item-icon">{{item.icon}}</v-icon>
                    </template>
                    <v-list-item-subtitle v-text="item.place"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="item.room"></v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
      </v-container>
    </v-main>
  </v-layout>
    <!--<div class="upper_bar">
      <v-toolbar>
          <v-spacer></v-spacer>
          <v-btn icon  class="mt-5">
            <v-icon color="#146C94"  @click="navigate">mdi-account</v-icon>
          </v-btn>
      </v-toolbar>
    </div> -->
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
.layout {
  padding-left: 5%;
  padding-top: 30px;
  padding-right: 5%;
  padding-bottom: 30px;
  height: 100%;
}
.layout_title {
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  font-size: 32px;
}

.favourites_content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}
.favourites_row {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.favourites_card {
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  margin-right: 5px;
  margin-left: 5px;
}
.recents_list {
  background-color: transparent;
  margin-right: 10px;
  margin-left: 10px;
}
.recents_column {
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
}

.card_container {
  border-radius: 20px;
  background-color: #d5dbe0;
}
</style>
